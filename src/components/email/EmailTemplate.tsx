interface EmailTemplateProps {
  email: string;
  message: string;
}

export function EmailTemplate({ email, message }: EmailTemplateProps) {
  return (
    <div
      style={{
        backgroundColor: "#faf9f5",
        color: "#11110f",
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
        padding: "32px",
      }}
    >
      <p style={{ color: "#68675f", fontSize: "13px", margin: "0 0 8px" }}>
        New message from your portfolio
      </p>
      <a
        href={`mailto:${email}`}
        style={{ color: "#11110f", fontSize: "16px", fontWeight: 700 }}
      >
        {email}
      </a>
      <p
        style={{
          borderTop: "1px solid rgba(17, 17, 15, 0.14)",
          fontSize: "16px",
          margin: "24px 0 0",
          paddingTop: "24px",
          whiteSpace: "pre-wrap",
        }}
      >
        {message}
      </p>
    </div>
  );
}

export function ReceiptEmailTemplate({
  message,
}: Pick<EmailTemplateProps, "message">) {
  return (
    <div
      style={{
        backgroundColor: "#faf9f5",
        color: "#11110f",
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
        padding: "32px",
      }}
    >
      <p style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 8px" }}>
        I received your message.
      </p>
      <p style={{ color: "#68675f", fontSize: "14px", margin: 0 }}>
        Thanks for reaching out. I usually reply within a day.
      </p>
      <p
        style={{
          borderTop: "1px solid rgba(17, 17, 15, 0.14)",
          fontSize: "14px",
          margin: "24px 0 0",
          paddingTop: "24px",
          whiteSpace: "pre-wrap",
        }}
      >
        {message}
      </p>
    </div>
  );
}
