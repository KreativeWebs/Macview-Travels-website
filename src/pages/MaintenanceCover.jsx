import React from "react";

export default function MaintenanceCover() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>We'll Be Back Soon</h1>
        <p style={styles.message}>
          Our website is currently undergoing scheduled maintenance.
          <br />
          We’re working hard to improve your experience.
        </p>

        <div style={styles.iconWrapper}>
          <svg
            height="100"
            viewBox="0 0 512 512"
            width="100"
            xmlns="http://www.w3.org/2000/svg"
            fill="#f1741e"
          >
            <path d="M256 48C141.16 48 48 141.16 48 256s93.16 208 208 208 208-93.16 208-208S370.84 48 256 48Zm93.19 287.58-22.62 22.62L256 278.63l-70.56 79.56-22.62-22.62L233.37 256l-70.56-79.56 22.62-22.62L256 233.37l70.56-79.56 22.62 22.62L278.63 256l70.56 79.58Z" />
          </svg>
        </div>

        <p style={styles.subtext}>
          Please check back in a few minutes.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f6f8fa",
    padding: "20px",
    textAlign: "center"
  },
  card: {
    maxWidth: "480px",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
  },
  title: {
    fontSize: "2.4rem",
    fontWeight: "700",
    color: "#175aa1",
    marginBottom: "15px"
  },
  message: {
    fontSize: "1.1rem",
    color: "#333",
    marginBottom: "20px"
  },
  iconWrapper: {
    margin: "20px 0"
  },
  subtext: {
    fontSize: "0.9rem",
    color: "#555"
  }
};
