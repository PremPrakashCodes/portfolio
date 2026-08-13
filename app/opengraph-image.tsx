import { ImageResponse } from "next/og";

export const alt = "Prem Prakash Sharma - Software Developer building production AI systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#f5f7ff",
          background: "#050914",
          backgroundImage: "radial-gradient(circle at 85% 15%, rgba(91, 124, 250, 0.32), transparent 34%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#8da2fb", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Prem Prakash Sharma · Software Developer
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", maxWidth: 980, fontSize: 72, lineHeight: 1.05, fontWeight: 700, letterSpacing: "-0.04em" }}>
            Building production AI systems that hold up in the real world.
          </div>
          <div style={{ display: "flex", fontSize: 25, color: "#a9b1c3" }}>
            Python · TypeScript · FastAPI · Node.js · AWS
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#a9b1c3" }}>premprakash.dev</div>
      </div>
    ),
    size,
  );
}
