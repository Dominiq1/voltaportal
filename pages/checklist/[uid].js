import React, { useState, useRef, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa'; // Ensure react-icons is installed
import Modal from 'react-modal';
import { useRouter } from 'next/router';

const styles = {


  modal: {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    content: {
      position: 'absolute',
      top: '40px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px',
    },
  },
  modalButton: {
    // (add your modal button styles here)
  },

  modal: {
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '90vw', // 90% of the viewport width
      height: '500px', // 500px tall
      backgroundColor: 'whitesmoke', // A nice shade of white
      borderRadius: '10px', // Border radius
      border: '1px solid #ccc',
      padding: '20px',
      boxSizing: 'border-box',
      overflow: 'hidden',
    },
  },
  modalTitle: {
    color: 'blue', // Bold blue font
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  modalButton: {
    // ... your existing button styles ...
    fontWeight: 'bold', // Bold font
    color: 'blue', // Text color blue
  },
  container: {
    fontFamily: 'Arial, sans-serif',
    width: '100%',
    minHeight: '100vh', // Full viewport height
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
  },
  title: {
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'left', // Align the title text to the left
  },
  subTitle: {
    fontSize: '18px',
    fontWeight: 'normal',
    textAlign: 'left', // Align the sub-items text to the left
  },
  divider: {
    width: '100%',
    height: '2px',
    backgroundColor: '#000',
    margin: '10px 0 20px 0',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  itemRadio: {
    marginRight: '10px',
    height: '20px',
    width: '20px',
  },
  itemLabel: {
    flexGrow: 1,
    marginRight: '10px',
  },
  itemFileInput: {
    display: 'none',
  },
  cameraIcon: {
    cursor: 'pointer',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  addButton: {
    display: 'block',
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  hideCompletedCheckbox: {
    marginBottom: '20px',
  },
  itemCompleted: {
    textDecoration: 'line-through',
  },
};


const ServiceChecklist = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [serviceItems, setServiceItems] = useState([
    { id: 0, title: 'Check wiring', complete: true },
    { id: 1, title: 'Install circuit breaker', complete: false },
    // ... (more initial tasks)
  ]);
  const [newItem, setNewItem] = useState('');
  const [hideCompleted, setHideCompleted] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const fileInputRefs = useRef([]);



  useEffect(() => {
//Passing Uid here
    console.log(uid); 
    // alert(uid)
    Modal.setAppElement('#content');
  }, [uid]);
  const handleAddItem = (event) => {
    event.preventDefault();
    const nextId = serviceItems.length;
    const newItemObject = { id: nextId, title: newItem, complete: false };
    setServiceItems([...serviceItems, newItemObject]);
    setNewItem('');
  };

  const updateCompletion = (itemId) => {
    setServiceItems(serviceItems.map(item =>
      item.id === itemId ? { ...item, complete: !item.complete } : item
    ));
  };

  const confirmCompletion = (itemId) => {
    setSelectedItemId(itemId);
    setModalIsOpen(true);
  };

  const handleFileSelect = (index) => {
    fileInputRefs.current[index].click();
  };

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`File selected for item ${index}: ${file.name}`);
      // Handle the file upload here
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleConfirmCompletion = () => {
    updateCompletion(selectedItemId);
    closeModal();
  };

  return (
    <div id="content" style={styles.container}>
     <div style={styles.header}>
        <h1 style={styles.title}>Service</h1>
        <p style={styles.subTitle}>Address: 123 Main St</p>
        <p style={styles.subTitle}>Homeowner: John Doe</p>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Hide Completed
          <input
            type="checkbox"
            checked={hideCompleted}
            onChange={() => setHideCompleted(!hideCompleted)}
          />
        </label>
      </div>
      {serviceItems.filter(item => !hideCompleted || !item.complete).map((item, index) => (
        <div key={item.id} style={{ ...styles.item, ...(item.complete ? styles.itemCompleted : {}) }}>
          <input
            type="radio"
            checked={item.complete}
            onChange={() => confirmCompletion(item.id)}
            style={styles.itemRadio}
          />
          <label style={styles.itemLabel}>{item.title}</label>
          <FaCamera
            size={20}
            style={styles.cameraIcon}
            onClick={() => handleFileSelect(index)}
          />
          <input
            ref={(el) => fileInputRefs.current[index] = el}
            type="file"
            onChange={(event) => handleFileChange(event, index)}
            style={styles.itemFileInput}
          />
        </div>
      ))}
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter item name"
          style={styles.input}
          required
        />
        <button type="submit" style={styles.addButton}>Add Checklist Item</button>
      </form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={styles.modal}
        contentLabel="Confirm Task Completion"
      >
        <h2>Are you sure this task is complete?</h2>
        <button onClick={handleConfirmCompletion} style={styles.modalButton}>Yes</button>
        <button onClick={closeModal} style={styles.modalButton}>Cancel</button>
      </Modal>
    </div>
  );
};
export default ServiceChecklist;
