import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          color: "#f5f5f5",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 88% 12%, rgba(197,255,61,0.20), transparent 45%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 18,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#9a9a9a",
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#C5FF3D",
              display: "flex",
            }}
          />
          <span style={{ display: "flex" }}>portfolio · 2026</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 168,
            fontWeight: 600,
            lineHeight: 0.92,
            letterSpacing: -6,
          }}
        >
          <span style={{ display: "flex" }}>SHARAN</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ display: "flex" }}>KUMAR REDDY</span>
            <span
              style={{
                width: 24,
                height: 24,
                background: "#C5FF3D",
                borderRadius: 999,
                marginLeft: 22,
                marginBottom: 14,
                display: "flex",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#f5f5f5",
              maxWidth: 760,
              lineHeight: 1.25,
            }}
          >
            <span style={{ display: "flex", flexWrap: "wrap" }}>
              {profile.role} at&nbsp;
              <span style={{ display: "flex", color: "#C5FF3D" }}>
                {profile.company}
              </span>
              &nbsp;— shipping web, AI and infra.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 16,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#9a9a9a",
            }}
          >
            sharan.dev
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
