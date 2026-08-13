import {
  FaCertificate,
  FaGithub,
  FaLinkedin,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { MdMail } from "react-icons/md";

export const experienceData = [
  {
    title: "Software Developer",
    company: "BigCircle",
    description: [
      "Designed and developed type-safe backend services using FastAPI, Node.js, TypeScript, and tRPC, improving API reliability and reducing frontend-backend integration issues.",
      "Built and integrated LLM-powered workflows with LiteLLM and Langfuse, implementing routing, logging, tracing, and observability to accelerate production debugging and improve AI system reliability.",
      "Containerized applications using Docker and deployed production workloads on AWS, establishing repeatable deployment pipelines and improving release consistency through CI/CD practices.",
      "Collaborated closely with frontend engineers and product stakeholders to deliver scalable, production-ready features across AI and enterprise applications.",
    ],
    date: "Oct 2024 - Present",
  },
  {
    title: "Web Developer",
    company: "Freelance",
    location: "Remote",
    description: [
      "Built responsive full-stack web applications using React, JavaScript, HTML, CSS, and REST APIs for multiple business clients.",
      "Designed and integrated third-party APIs and backend services to extend platform functionality while maintaining system stability.",
      "Worked directly with clients to gather requirements, translate business needs into technical solutions, and deliver projects within aggressive timelines.",
      "Optimized application performance and user experience through responsive design and reusable frontend components.",
    ],
    date: "Aug 2023 - Oct 2024",
  },
] as const;

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/PremPrakashCodes",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/premprakashsharma/",
    icon: FaLinkedin,
  },
  {
    label: "Email",
    href: "mailto:premprakashsharma.dev@gmail.com",
    icon: MdMail,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/premprakashdev",
    icon: FaTwitter,
  },
] as const;

export const projects = [
  {
    slug: "ubik",
    title: "Ubik",
    eyebrow: "Multi-agent desktop assistant",
    outcome: "Automated executive workflows across email, meetings, and scheduling.",
    description:
      "Built a multi-agent AI desktop assistant to automate executive workflows including scheduling, meetings, and email management. Designed multi-agent AI architecture (Planner, Executor, Awareness) for task orchestration. Integrated Google Workspace APIs and webhook-based automation for Gmail, enabling intelligent email labeling, summarization, and prioritization.",
    role: "Backend and AI systems development",
    challenge:
      "Executive workflows span multiple tools, require context, and need predictable orchestration rather than a single prompt-response loop.",
    approach:
      "Designed Planner, Executor, and Awareness agents around FastAPI services, persisted state in PostgreSQL, and added LiteLLM and Langfuse for model routing, tracing, and operational visibility.",
    highlights: [
      "Integrated Google Workspace APIs and Gmail webhooks",
      "Built observable multi-agent task orchestration",
      "Containerized and deployed the platform on AWS",
    ],
    tags: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "PostgreSQL",
      "Electron",
      "LiteLLM",
      "Langfuse",
      "Docker",
      "AWS",
      "Google Workspace API",
    ],
    github: "",
    demo: "",
    image: "/images/projects/ubik-ai-orchestration.webp",
    imageAlt: "Abstract visualization of three AI agents coordinating through a central orchestration system",
    category: "AI",
  },
  {
    slug: "document-classification",
    title: "AI-Powered Document Classification",
    eyebrow: "Event-driven document intelligence",
    outcome: "Processed incoming business documents asynchronously without blocking the product experience.",
    description:
      "Developed an event-driven document processing platform where Outlook webhooks automatically validated, queued, and processed incoming documents. Implemented scalable background processing using Redis and Dramatiq to maintain responsiveness under heavy workloads. Built OCR pipelines supporting PDF, DOCX, and XLSX with OpenAI Vision fallback models to improve extraction accuracy on complex documents.",
    role: "Backend architecture and AI pipeline development",
    challenge:
      "Documents arrived in different formats and volumes, while OCR quality varied enough that a single extraction path could not be trusted.",
    approach:
      "Separated webhook ingestion from processing with Redis and Dramatiq, then built format-aware extraction pipelines with an OpenAI Vision fallback for complex documents.",
    highlights: [
      "Handled PDF, DOCX, and XLSX inputs",
      "Kept request paths responsive with background processing",
      "Added model fallback for difficult extraction cases",
    ],
    tags: [
      "Python",
      "Next.js",
      "Redis",
      "Dramatiq",
      "PostgreSQL",
      "Docker",
      "OCR",
      "OpenAI",
      "AWS EC2",
    ],
    github: "",
    demo: "",
    image: "/images/projects/document-classification-pipeline.webp",
    imageAlt: "Abstract visualization of documents flowing through an intelligent classification pipeline",
    category: "AI",
  },
  {
    slug: "brandiligence",
    title: "Brandiligence",
    eyebrow: "Subscription payments",
    outcome: "Migrated the payment system from Stripe to PayPal while preserving customer access.",
    description:
      "Implemented subscription-based payment system adapting to regional constraints. Initially integrated Stripe for recurring payments, then migrated entire payment flow to PayPal due to regional limitations. Owned end-to-end payment gateway integration with minimal disruption.",
    role: "Full-stack payment integration owner",
    challenge:
      "Regional payment restrictions made the existing Stripe subscription flow unsuitable after product development was already underway.",
    approach:
      "Reworked the payment lifecycle around PayPal while preserving the Next.js, tRPC, Drizzle, and PostgreSQL application model and minimizing product disruption.",
    highlights: [
      "Owned the complete payment integration lifecycle",
      "Adapted subscription state to a new provider",
      "Maintained uninterrupted customer access",
    ],
    tags: [
      "Next.js",
      "tRPC",
      "Drizzle ORM",
      "Stripe API",
      "PayPal API",
      "TypeScript",
    ],
    github: "",
    demo: "https://brandiligence.ai",
    image: "/images/projects/brandiligence-payment-routing.webp",
    imageAlt: "Abstract visualization of a resilient subscription payment routing system",
    category: "Web",
  },
  {
    slug: "developer-portfolio",
    title: "Developer Portfolio",
    eyebrow: "Personal product and writing platform",
    outcome: "Created a fast, searchable home for engineering work, open source, and technical writing.",
    description:
      "Designed and built a modern developer portfolio with Three.js 3D hero, GSAP scroll animations, MDX-powered blog, and server-side contact form. Features dynamic GitHub contribution fetching, SEO optimization with structured data, and a glassmorphism dark theme.",
    role: "Design and full-stack development",
    challenge:
      "Present a varied engineering profile in a format that remains easy for recruiters to scan and simple to maintain over time.",
    approach:
      "Built a statically generated Next.js site with structured content, MDX writing, route-level metadata, and progressively enhanced interactions.",
    highlights: [
      "Static-first rendering and route-level SEO",
      "MDX publishing workflow",
      "Dynamic GitHub contribution integration",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Three.js",
      "GSAP",
      "Tailwind CSS",
      "MDX",
      "Framer Motion",
    ],
    github: "https://github.com/PremPrakashCodes/portfolio",
    demo: "https://premprakash.dev",
    image: "/images/projects/developer-portfolio-platform.webp",
    imageAlt: "Abstract visualization of a connected developer portfolio, publishing, and analytics platform",
    category: "Web",
  },
] as const;

export const certificates = [
  {
    id: 1,
    title: "GitHub Foundations",
    institution: "GitHub",
    duration: "Issued: March 2025",
    description:
      "Demonstrated proficiency in Git and GitHub by completing foundational training.",
    link: "https://www.credly.com/badges/799557dd-ffee-4fdc-b489-21c8af85dba1/public_url",
    icon: FaGithub,
  },
  {
    id: 2,
    title: "Node.js Essential Training",
    institution: "LinkedIn Learning",
    duration: "Issued: October 2024",
    description:
      "Completed comprehensive training on Node.js, covering core concepts and advanced topics.",
    link: "https://www.linkedin.com/learning/certificates/997f1d774775099388365bae6887f2684a2a4380e27dc89ecad8a237dae70be4",
    icon: FaLinkedinIn,
  },
  {
    id: 3,
    title: "Node.js: Microservices",
    institution: "LinkedIn Learning",
    duration: "Issued: October 2024",
    description:
      "Completed advanced training on building microservices with Node.js and Express.",
    link: "https://www.linkedin.com/learning/certificates/9e8f2a3c4b5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1",
    icon: FaLinkedinIn,
  },
  {
    id: 4,
    title: "React.js Essential Training",
    institution: "LinkedIn Learning",
    duration: "Issued: October 2024",
    description:
      "Completed comprehensive training on React.js, covering core concepts and advanced topics.",
    link: "https://www.linkedin.com/learning/certificates/9135ec5ae78db93e17ce883e0abaa53369da8f54d155828452334a61774bc8c6",
    icon: FaLinkedinIn,
  },
  {
    id: 5,
    title: "Node.js: Security",
    institution: "LinkedIn Learning",
    duration: "Issued: September 2024",
    description:
      "Completed advanced training on securing Node.js applications and APIs.",
    link: "https://www.linkedin.com/learning/certificates/139d20ceb826c3f4aff0e02236c969438e075961ca091bf4f99740262effbd62?trk=share_certificate",
    icon: FaLinkedinIn,
  },
  {
    id: 6,
    title: "DSA WITH JAVA",
    institution: "Apna College",
    duration: "Issued: November 2023",
    description:
      "Completed comprehensive training on Data Structures and Algorithms using Java.",
    link: "https://drive.google.com/file/d/1r50yTGzWOnhFn_M34douFWo38H2a-btg/view",
    icon: FaCertificate,
  },
];

type EducationItem = {
  id: number;
  title: string;
  institution: string;
  duration: string;
  description: string;
};

export const educationData: EducationItem[] = [
  {
    id: 1,
    title: "Bachelor of Computer Applications (BCA)",
    institution: "Indira Gandhi National Open University (IGNOU)",
    duration: "Expected January 2028",
    description:
      "Relevant Coursework: Data Structures and Algorithms, Database Management Systems, Operating Systems, Computer Networks, Software Engineering, Web Development.",
  },
  {
    id: 2,
    title: "Higher Secondary School",
    institution: "Municipal College Rourkela",
    duration: "2020 - 2022",
    description:
      "Completed Science stream education with strong foundation in Physics, Chemistry, and Mathematics.",
  },
];
