import React from "react";

const InstallModal = ({ content, onClose, projectURL }) => {
    const goToProject = () => {
        // Open the project URL in a new window/tab
        window.open(projectURL, '_blank');
      };

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <span style={styles.close} onClick={onClose}>
          &times;
        </span>
        <div>{content}</div>

       
        <button style={styles.button} onClick={goToProject}>
          Go to project
        </button>
      </div>
    </div>
  );
};

const styles = {
  modal: {
    display: "block",
    position: "fixed",
    zIndex: 1,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContent: {
    backgroundColor: "#fefefe",
    margin: "15% auto",
    padding: "20px",
    border: "1px solid #888",
    width: "80%",
  },
  close: {
    color: "#aaa",
    float: "right",
    fontSize: "28px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default InstallModal;

