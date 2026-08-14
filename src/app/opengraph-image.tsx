import { ImageResponse } from "next/og";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

export const alt = "Filippo Piggici, Frontend and Design Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#f1efe7",
          color: "#11110f",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          padding: 28,
          width: "100%",
        }}
      >
        <div
          style={{
            border: "2px solid rgba(17,17,15,.35)",
            borderRadius: 28,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "46px 52px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Filippo Piggici · Frontend &amp; Design Engineer
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 82,
              fontWeight: 500,
              letterSpacing: -5,
              lineHeight: 0.93,
            }}
          >
            <span>I build product interfaces</span>
            <span>and the systems behind them.</span>
          </div>

          <div
            style={{
              alignItems: "center",
              borderTop: "2px solid #11110f",
              display: "flex",
              fontSize: 21,
              justifyContent: "space-between",
              paddingTop: 20,
            }}
          >
            <span>Outverse · Streaming Calculator · Treatwell</span>
            <span
              style={{
                alignItems: "center",
                color: "#5260e6",
                display: "flex",
                fontWeight: 700,
                gap: 5,
              }}
            >
              Portfolio
              <ArrowTopRightIcon height={20} width={20} />
            </span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
