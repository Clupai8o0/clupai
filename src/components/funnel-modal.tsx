"use client";

import { useEffect, useCallback } from "react";
import Funnel from "@/app/start/funnel";

export default function FunnelModal({ onClose }: { onClose: () => void }) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [handleKey]);

  return (
    <>
      <style>{`
        .cp-funnel-modal .cp-card:hover {
          transform: none;
          border-color: var(--border);
        }
      `}</style>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9000,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "rgba(5,5,5,0.72)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          padding: "40px 20px 60px",
          overflowY: "auto",
          animation: "cp-fade-in 0.2s ease both",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="cp-funnel-modal"
          style={{
            width: "100%",
            maxWidth: 820,
            position: "relative",
            background: "var(--surface)",
            borderRadius: "var(--radius-lg)",
            animation: "cp-fade-up 0.35s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          {/* close button — inside the card top-right corner */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 1,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 18,
              lineHeight: 1,
              transition: "color 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
            }}
          >
            ×
          </button>
          <Funnel />
        </div>
      </div>
    </>
  );
}
