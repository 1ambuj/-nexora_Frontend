import { ImageResponse } from "next/og";
import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — Modern Fashion`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const siteHost = new URL(getSiteUrl()).host;

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
          background:
            "radial-gradient(circle at top left, #2a2a2a 0%, #0a0a0a 45%, #000000 100%)",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "#ffffff",
              color: "#0a0a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            N
          </div>
          <div
            style={{
              fontSize: "34px",
              fontWeight: 700,
              letterSpacing: "0.28em",
            }}
          >
            {SITE_NAME.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: "900px",
            }}
          >
            Style that feels intentional.
          </div>
          <div
            style={{
              fontSize: "28px",
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.72)",
              maxWidth: "820px",
            }}
          >
            {SITE_DESCRIPTION}
          </div>
        </div>

        <div
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.08em",
          }}
        >
          {siteHost}
        </div>
      </div>
    ),
    { ...size }
  );
}
