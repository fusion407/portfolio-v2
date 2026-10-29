import { ImageResponse } from "next/og";
import type { PortfolioPage } from "@/content/pages";
import { site } from "@/content/site";
export function socialImage(page: PortfolioPage) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#080b14",
        color: "#f1f5ff",
        padding: "64px 72px",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #273047",
          paddingBottom: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: -4,
          }}
        >
          bd<span style={{ color: "#38bdf8" }}>.</span>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#9dabcf" }}>
          {site.name}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 48,
          color: "#38bdf8",
          fontSize: 19,
          letterSpacing: 2,
          textTransform: "uppercase",
          maxWidth: 950,
        }}
      >
        {page.label}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: page.socialTitle.length > 26 ? 72 : 96,
          fontWeight: 700,
          letterSpacing: -4,
          lineHeight: 1.05,
          maxWidth: 970,
          marginTop: 26,
        }}
      >
        {page.socialTitle}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "auto",
          fontSize: 22,
          color: "#9dabcf",
        }}
      >
        Ideas. Systems. Working software.
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 9,
          display: "flex",
          background: "linear-gradient(90deg, #7357f5, #38bdf8)",
        }}
      />
    </div>,
    { width: 1200, height: 630 },
  );
}
