import React from "react";

function hexToRgba(hex, alpha = 1) {
  if (!hex) return `rgba(59,130,246,${alpha})`;
  const h = hex.replace("#", "");
  if (h.length === 3) {
    const r = parseInt(h[0] + h[0], 16);
    const g = parseInt(h[1] + h[1], 16);
    const b = parseInt(h[2] + h[2], 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  if (h.length === 6) {
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return hex;
}

const Loading = ({
  size = 40,
  color = "#3b82f6",
  text = "Loading...",
  overlay = false,
  className = "",
}) => {
  const sizeValue = typeof size === "number" ? `${size}px` : size;

  const spinnerStyle = {
    width: sizeValue,
    height: sizeValue,
    borderWidth: `${Math.max(
      3,
      Math.round(parseInt(String(sizeValue)) / 10)
    )}px`,
    borderStyle: "solid",
    borderRadius: "50%",
    borderColor: hexToRgba(color, 0.18),
    borderTopColor: color,
  };

  if (overlay) {
    return (
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center ${className}`}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative flex flex-col items-center gap-2 p-4 rounded">
          <div className="animate-spin" style={spinnerStyle} />
          {text && <p className="text-sm opacity-80 text-white">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-2 p-2 ${className}`}>
      <div className="animate-spin" style={spinnerStyle} />
      {text && <p className="text-sm opacity-80">{text}</p>}
    </div>
  );
};

export default Loading;
