import React from "react";

const Loading = ({ size = "40px", color = "#3b82f6", text = "Loading..." }) => {
  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.spinner,
          width: size,
          height: size,
          borderColor: `${color}33`,
          borderTopColor: color,
        }}
      />
      {text && <p style={styles.text}>{text}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    padding: "16px",
  },
  spinner: {
    borderWidth: "4px",
    borderStyle: "solid",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  text: {
    fontSize: "14px",
    opacity: 0.7,
  },
};

// Animasi CSS global
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`,
  styleSheet.cssRules.length
);

export default Loading;
