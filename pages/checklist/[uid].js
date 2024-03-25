import React, { useState, useRef, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa'; // Ensure react-icons is installed
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { GET_SERVICE_CHECKLIST } from '@/gql/mutations/Service';
import { ADD_SERVICE_CHECKLIST } from '@/gql/mutations/Service';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
const styles = {


// Improved modal styles
modal: {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    height: 'auto', // Auto height to accommodate content
    backgroundColor: '#f7f7f7',
    borderRadius: '10px',
    border: '1px solid #ccc',
    padding: '30px',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
},
// Styling for titles and subtitles
title: {
  color: '#2c3e50',
  fontSize: '32px',
  fontWeight: '600',
  textAlign: 'left',
  margin: '0 0 15px 0',
},
subTitle: {
  fontSize: '18px',
  fontWeight: '400',
  color: '#34495e',
  textAlign: 'left',
  margin: '0 0 15px 0',
},
// Updated container styles
container: {
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  width: '100%',
  minHeight: '100vh',
  padding: '50px 20px',
  boxSizing: 'border-box',
  backgroundColor: '#ecf0f1',
},
// Checkbox style adjustments
hideCompletedCheckbox: {
  marginBottom: '30px',
  marginTop: '10px',
  fontSize: '18px',
  fontWeight: '400',
  color: '#34495e',
},
// Improved item and label styles
item: {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '15px',
  backgroundColor: '#fff',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '10px',
  boxSizing: 'border-box',
},
itemRadio: {
  marginRight: '10px',
  height: '24px',
  width: '24px',
  flexShrink: 0, // Prevent resizing
},
itemLabel: {
  flexGrow: 1,
  fontSize: '18px',
  fontWeight: '400',
  color: '#34495e',
  marginRight: '10px',
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


  divider: {
    width: '100%',
    height: '2px',
    backgroundColor: '#000',
    margin: '10px 0 20px 0',
  },
  
 
  itemFileInput: {
    display: 'none',
  },
// ... other styles remain unchanged

cameraIcon: {
  cursor: 'pointer',
  fontSize: '20px', // Set a fixed size for the icon
  width: '20px', // Set a fixed width for the icon
  height: '20px', // Set a fixed height for the icon
  flexShrink: 0, // Prevent the icon from shrinking
},

// ... rest of your styles and component code

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

  itemCompleted: {
    textDecoration: 'line-through',
  },
};
import { UPDATE_SERVICE_CHECKLIST } from '@/gql/mutations/Service';


const ServiceChecklist = () => {
  const router = useRouter();
  const { uid } = router.query;
  const { loading, error, data } = useQuery(GET_SERVICE_CHECKLIST, {
    variables: { serviceID: uid },
    skip: !uid, 
});
const handleAddItem = async (event) => {
  event.preventDefault();
  try {
    const response = await addServiceChecklist({
      variables: {
        serviceID: uid,
        task: newItem // Assuming 'newItem' is the state holding the text input from the user
      },
    });
    // Assuming the mutation returns the updated checklist, you can use the response to update the state
    console.log(response);
    // After mutation, refetch the checklist
    await refetch();

    // Reset the newItem input field to be empty after submission
    setNewItem('');

    // Optionally, refresh the checklist items displayed to the user
    // This could be a call to fetch the latest checklist items or you can manually update the state
    // Here's a simple way to manually update the state (you may need to adjust based on the actual response structure)
    if (response.data && response.data.AddServiceChecklist) {
      const addedTask = response.data.AddServiceChecklist.serviceTasks.slice(-1)[0]; // Assuming the new task is the last one
      setServiceItems([...serviceItems, {
        id: serviceItems.length, // This is a simplification, consider using unique identifiers
        title: addedTask.taskTitle,
        complete: addedTask.serviceStatus === "true",
      }]);
    }
  } catch (error) {
    console.error('Error adding service checklist item:', error);
  }
};



const [addServiceChecklist] = useMutation(ADD_SERVICE_CHECKLIST);

const [updateServiceChecklist] = useMutation(UPDATE_SERVICE_CHECKLIST);
  


  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  
  const [serviceItems, setServiceItems] = useState([
    //{ id: 0, title: 'Check wiring', complete: true },
   // { id: 1, title: 'Install circuit breaker', complete: false },
    // ... (more initial tasks)
  ]);

  const [homeowner, setHomeowner] = useState('');
  const [address, setAddress] = useState('');
  const [newItem, setNewItem] = useState('');
  const [hideCompleted, setHideCompleted] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const fileInputRefs = useRef([]);



  useEffect(() => {
//Passing Uid here
    console.log(uid); 
    console.log(data);
    // alert(uid)


    if (data && data.GetServiceChecklist && data.GetServiceChecklist.length > 0) {
      // Extract the first item from the GetServiceChecklist array
      const serviceData = data.GetServiceChecklist[0];
      
      // Map serviceTasks to match the format expected by the UI
      // Assuming the UI expects items with { id, title, complete } format
      const homeowner = serviceData.homeownerName.replace(/"/g, ''); // Removes all instances of quotes
      const addy = serviceData.address.replace(/"/g, ''); // Removes all instances of quotes
      
      setAddress(addy);
      setHomeowner(homeowner);
      
      
      const mappedServiceItems = serviceData.serviceTasks.map((task, index) => ({
        id: index, // Assuming the original data does not include a unique ID, we use the index
        title: task.taskTitle,
        complete: task.serviceStatus === "true", // Assuming serviceStatus is a string that could be "true" or "false"
      }));
  
      // Update the state with the mapped items
      setServiceItems(mappedServiceItems);
    }
    Modal.setAppElement('#content');
  }, [uid, data]);









  
  // const handleAddItem = (event) => {
  //   event.preventDefault();
  //   const nextId = serviceItems.length;
  //   const newItemObject = { id: nextId, title: newItem, complete: false };
  //   setServiceItems([...serviceItems, newItemObject]);
  //   setNewItem('');
  // };

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

  const handleConfirmCompletion = async() => {
    try {
      // Call the mutation with the serviceID and taskReason (assuming taskReason can be derived from selectedItemId)
      const taskReason = `${selectedItemId + 1}`; // Adjust based on how you identify tasks
      await updateServiceChecklist({
        variables: {
          serviceID: uid,
          taskReason,
        },
      });

      // If mutation is successful, update UI accordingly
      updateCompletion(selectedItemId);
    } catch (error) {
      console.error('Error updating service checklist:', error);
    }



    closeModal();





  };

  return (
    <div id="content" style={styles.container}>
     <div style={styles.header}>
     <h1 style={styles.title}>Service</h1>
        <p style={styles.subTitle}>Address: {address}</p>
        <p style={styles.subTitle}>Homeowner: {homeowner}</p>
      </div>
      <div style={{ marginBottom: '20px'}}>
        <label style={{ marginRight:' 50px' }}>
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
  size="20" // This sets the font size for the icon
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
