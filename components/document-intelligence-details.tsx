import Link from "next/link";
import MermaidDiagram from "./mermaid-diagram";

const pipeline = `flowchart TD
  accTitle: Document upload and extraction lifecycle
  accDescr: Upload a PDF through FastAPI, store the original and queue extraction. A worker runs PyMuPDF and Azure DI, normalizes their outputs, and persists cells with provenance. The review interface retrieves the results through the API.
  U["Upload PDF through FastAPI"] --> S["Store original PDF"]
  S --> Q["Queue extraction job"]
  Q --> W["Background worker"]
  W --> P["PyMuPDF: text and geometry"]
  W --> A["Azure DI: tables and OCR"]
  P --> N["Normalize coordinates and match cells"]
  A --> N
  N --> D["Persist results and source provenance"]
  D --> V["API and PDF review interface"]
  classDef input fill:#123d65,stroke:#56b8ff,color:#e0f2fe,stroke-width:2px
  classDef service fill:#57360d,stroke:#fbbf24,color:#fff3c4,stroke-width:2px
  classDef process fill:#392065,stroke:#b794f6,color:#f3e8ff,stroke-width:2px
  classDef result fill:#0c493b,stroke:#34d399,color:#d1fae5,stroke-width:2px
  classDef view fill:#53213e,stroke:#f472b6,color:#fce7f3,stroke-width:2px
  class U,S,P input
  class A service
  class Q,W,N process
  class D result
  class V view
  linkStyle 0,3,5 stroke:#56b8ff,stroke-width:2px
  linkStyle 1,2 stroke:#b794f6,stroke-width:2px
  linkStyle 4,6 stroke:#fbbf24,stroke-width:2px
  linkStyle 7 stroke:#34d399,stroke-width:2px
  linkStyle 8 stroke:#f472b6,stroke-width:2px
`;

const decisions = [
  ["Exact", "The normalized readings agree.", "Select PyMuPDF text."],
  ["Spatial", "The readings differ, but the candidate meets the containment threshold.", "Select PyMuPDF text and retain both readings."],
  ["Weak", "PDF words qualify for the cell, but the candidate meets neither rule above.", "Retain Azure text and record the PDF candidate."],
  ["None", "No PDF words qualify for the cell.", "Retain Azure text without text-layer confirmation."],
];

const references = [
  ["Extraction design", "docs/extraction.md"],
  ["Cell matcher", "src/extraction/matcher.py"],
  ["Matching tests", "tests/test_matcher.py"],
  ["Pipeline implementation", "src/extraction/pipeline.py"],
];

export default function DocumentIntelligenceDetails() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
        <aside>
          <p className="section-kicker">Implementation details</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground">From upload to source review</h2>
          <nav aria-label="Technical details" className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
            <a className="hover:text-primary" href="#extraction-architecture">Architecture</a>
            <a className="hover:text-primary" href="#source-selection">Source selection</a>
            <a className="hover:text-primary" href="#review-workflow">Review workflow</a>
            <a className="hover:text-primary" href="#failure-recovery">Failure recovery</a>
            <a className="hover:text-primary" href="#evaluation">Evaluation and limits</a>
          </nav>
        </aside>

        <div className="min-w-0 text-lg leading-8 text-muted-foreground">
          <section id="extraction-architecture" aria-labelledby="architecture-heading" className="scroll-mt-28 border-b border-border pb-10">
            <h3 id="architecture-heading" className="text-2xl font-medium tracking-tight text-foreground">Extraction architecture</h3>
            <p className="mt-4">The FastAPI upload endpoint stores the PDF and queues extraction, returning an accepted response before processing completes. A background worker produces the canonical document and persists the results in PostgreSQL. The original PDF remains available for rendering and re-extraction.</p>
            <MermaidDiagram chart={pipeline} caption="Data dependencies in the extraction lifecycle. The worker runs PyMuPDF before Azure DI; the branches represent complementary outputs, not concurrent execution." />
            <ul className="mt-5 flex list-disc flex-col gap-3 pl-5">
              <li><strong className="text-foreground">Storage:</strong> Cloudflare R2 stores original PDFs through a storage abstraction.</li>
              <li><strong className="text-foreground">Background jobs:</strong> BullMQ uses PostgreSQL for the document queue, avoiding a separate Redis service.</li>
              <li><strong className="text-foreground">Persistence:</strong> SQLAlchemy models and Alembic migrations organize documents, pages, tables, and cells.</li>
              <li><strong className="text-foreground">Frontend:</strong> React and TypeScript provide the viewer, with TanStack Query for API data retrieval.</li>
            </ul>
            <p className="mt-4">Listing endpoints return metadata rather than full page content or table cells. The viewer requests those larger payloads when a page or table is opened.</p>
          </section>

          <section id="source-selection" aria-labelledby="selection-heading" className="scroll-mt-28 border-b border-border py-10">
            <h3 id="selection-heading" className="text-2xl font-medium tracking-tight text-foreground">Coordinate normalization and source selection</h3>
            <p className="mt-4">The normalizer converts both outputs into PDF points with a top-left origin and page rotation applied. Azure polygons are scaled using the ratio of the page dimensions reported by the two extractors.</p>
            <p className="mt-4">A PDF word belongs to a cell when at least 55% of its bounding-box area falls inside that cell. For non-overlapping cell boxes, this threshold prevents a word from qualifying for two cells. The matcher joins qualifying words in PDF reading order and applies the following rules.</p>
            <div className="mt-6 overflow-x-auto rounded-lg border border-border" role="region" aria-label="Cell matching rules" tabIndex={0}>
              <table className="w-full min-w-[560px] border-collapse text-left text-sm leading-6">
                <caption className="sr-only">Matching methods, conditions, and selected text source</caption>
                <thead className="bg-card text-foreground">
                  <tr>{["Method", "Condition", "Result"].map((label) => <th key={label} scope="col" className="px-4 py-3 font-semibold">{label}</th>)}</tr>
                </thead>
                <tbody>{decisions.map(([method, condition, result]) => (
                  <tr key={method} className="border-t border-border">
                    <th scope="row" className="px-4 py-4 align-top font-medium text-foreground">{method}</th>
                    <td className="px-4 py-4 align-top">{condition}</td>
                    <td className="px-4 py-4 align-top">{result}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <p className="mt-4">In the illustrative <code>99,999</code> versus <code>99.999</code> case, punctuation remains significant. The pipeline selects the PDF reading only if the spatial rule supports it. It does not infer the intended number format or replace separators globally.</p>
            <p className="mt-4">Containment also avoids an IoU failure mode: a short dash inside a wide cell has little area relative to the cell and can receive a low IoU despite correct placement. IoU remains diagnostic metadata rather than a source-selection criterion.</p>
          </section>

          <section id="review-workflow" aria-labelledby="review-heading" className="scroll-mt-28 border-b border-border py-10">
            <h3 id="review-heading" className="text-2xl font-medium tracking-tight text-foreground">Review extracted values</h3>
            <p className="mt-4">Each cell retains the displayed value, both source readings, and the matching method. Containment, word count, and source bounds explain the decision. A reviewer can inspect the evidence without searching the original document manually.</p>
            <ol className="mt-5 flex list-decimal flex-col gap-3 pl-5">
              <li>Select a table cell to highlight its region and associated PDF words.</li>
              <li>Compare Azure’s reading with the PDF text in the cell inspector.</li>
              <li>Inspect the selected source and matching metadata.</li>
              <li>Use the review toolbar to navigate unconfirmed values and low-confidence readings.</li>
            </ol>
            <p className="mt-4">The PDF pane zooms to the selected region while keeping adjacent content visible. Fixed rendering scales reuse page images between nearby selections. The table view also supports search and copying tabular data.</p>
          </section>

          <section id="failure-recovery" aria-labelledby="recovery-heading" className="scroll-mt-28 border-b border-border py-10">
            <h3 id="recovery-heading" className="text-2xl font-medium tracking-tight text-foreground">Failure recovery</h3>
            <p className="mt-4">If Azure DI fails after PyMuPDF succeeds, the document is saved with a partial status. Text, coordinates, page geometry, metadata, and error details remain available. Re-extraction runs against the stored PDF after the service recovers.</p>
            <p className="mt-4">A PyMuPDF failure stops the pipeline because normalization requires its page representation. Azure retry handling distinguishes transient failures from permanent errors and respects the service’s retry delay.</p>
          </section>

          <section id="evaluation" aria-labelledby="evaluation-heading" className="scroll-mt-28 py-10">
            <h3 id="evaluation-heading" className="text-2xl font-medium tracking-tight text-foreground">Evaluation and limitations</h3>
            <p className="mt-4">The extraction notes report 570 of 570 populated cells matched to PDF text at a containment threshold of 0.55. The fixture includes merged headers, nil-marker dashes across column boundaries, and selection-marker artifacts.</p>
            <p className="mt-4">The PDF and simulated Azure response are generated from the same geometry. This provides reproducible regression coverage, but it does not establish accuracy on independently sourced documents.</p>
            <ul className="mt-5 flex list-disc flex-col gap-3 pl-5">
              <li>Scanned pages without usable embedded text depend on Azure OCR and remain unconfirmed.</li>
              <li>Confirmation against a PDF text layer does not establish that the layer matches the visible page.</li>
              <li>Incorrect or overlapping cell boxes can affect word assignment.</li>
              <li>Broader evaluation requires independently annotated documents and measurements of value accuracy, latency, and reviewer effort.</li>
            </ul>
            <div className="mt-8 border-t border-border pt-6">
              <Link className="link-arrow" href="/blog/building-traceable-pdf-table-extraction">Read the technical article →</Link>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                {references.map(([label, path]) => <li key={path}><a className="text-primary underline underline-offset-4" href={`https://github.com/PremPrakashCodes/document-intelligence/blob/main/${path}`}>{label}</a></li>)}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
