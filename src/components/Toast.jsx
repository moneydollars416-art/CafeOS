import React, { useEffect, useRef } from "react";
import { CheckCircle2, X } from "lucide-react";

export default function Toast({ toast, onClose }) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => closeRef.current(), 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast-icon"><CheckCircle2 size={22} /></span>
      <div className="toast-text">
        <strong>{toast.title}</strong>
        {toast.detail && <span>{toast.detail}</span>}
      </div>
      <button type="button" className="toast-close" onClick={onClose} aria-label="Close">
        <X size={16} />
      </button>
    </div>
  );
}