import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ImagePreviewModalProps = {
  isOpen: boolean;
  src: string;
  alt?: string;
  onClose: () => void;
  isDarkMode?: boolean;
};

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  isOpen,
  src,
  alt = "image preview",
  onClose,
  isDarkMode = false,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mountNode = typeof document !== "undefined" ? document.body : null;
  const modal = (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 ${
          isDarkMode ? "bg-black/80" : "bg-black/70"
        }`}
        onClick={onClose}
      />

      {/* Content */}
      <div
        ref={dialogRef}
        className={`relative mx-2 sm:mx-6 w-full h-full rounded-2xl shadow-2xl overflow-hidden ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className={`absolute top-3 right-3 rounded-full px-3 py-1 text-sm font-semibold transition
            ${
              isDarkMode
                ? "bg-gray-800 text-gray-100"
                : "bg-white text-gray-900"
            }
            ring-1 ${
              isDarkMode
                ? "ring-gray-700 hover:bg-gray-700"
                : "ring-gray-300 hover:bg-gray-100"
            }`}
        >
          ✕
        </button>

        {/* Image */}
        <div className="w-full h-full flex items-center justify-center p-2 sm:p-4">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain select-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );

  return mountNode ? createPortal(modal, mountNode) : modal;
};

export default ImagePreviewModal;
