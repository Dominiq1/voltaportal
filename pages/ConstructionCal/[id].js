import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useQuery } from '@apollo/client';
import { GET_CONSTRUCTION_JOBS } from '@/gql/queries/serviceQueries';
import { useRouter } from 'next/router';
import { Modal, Box, Typography, Button, Link, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Import the location icon
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import logo from "../../public/images/voltaicLogo.png"
import Image from 'next/image';




const localizer = momentLocalizer(moment);


const createConstructionMeetingEvent = (date) => {
  const startTime = moment(date).set({hour: 6, minute: 30});
  const endTime = moment(date).set({hour: 7, minute: 0});

  return {
    task: 'Construction Meeting',
    start: startTime.toDate(),
    end: endTime.toDate(),
    title: 'Morning Check-in', // Example task
    notes: 'Brief discussion on construction operations.', // Example note
    address: 'Downey Office', // Example address
  };
};


const renderCrewMember = ( name, role, color) => {
  // Trim the quotes from the name if present
  const cleanedName = name;
  // Check if the cleanedName is not an empty string



  if (cleanedName && cleanedName !== 'No Title' && cleanedName.trim().length > 0) {
    const displayName = cleanedName.replace(/^"|"$/g, ''); // Remove surrounding quotes
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Box component="span" sx={{ display: 'inline-block', width: 24, height: 24, bgcolor: color, borderRadius: '50%' }}></Box>
        <Typography variant="body2">{role}: {displayName}</Typography>
      </Box>
    );
  }




  return null;
};




const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate('prev');
  };

  const goToNext = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate('next');
  };

  const goToToday = () => {
    const now = new Date();
    toolbar.date.setMonth(now.getMonth());
    toolbar.date.setYear(now.getFullYear());
    toolbar.onNavigate('current');
  };

  const label = () => {
    const date = moment(toolbar.date);
    return <span><b>{date.format('MMMM YYYY')}</b></span>;
  };

  return (
    <div className="rbc-toolbar" style={{ backgroundColor: '#008080', color: '#ffffff' }}>
      <span className="rbc-btn-group">
        <button type="button" onClick={goToToday}>Today</button>
        <button type="button" onClick={goToBack}>Back</button>
        <button type="button" onClick={goToNext}>Next</button>
      </span>
      <span className="rbc-toolbar-label">{label()}</span>
      <span className="rbc-btn-group">{toolbar.children}</span>
    </div>
  );
};




const CustomAgendaEvent = ({ event }) => {
    return (
      <div>
        <p>{event.title}</p>
        <p>{event.task}</p>
        <p>{event.notes}</p>
        {/* Render any other details you want to include in the agenda */}
      </div>
    );
  };

  const getEventStyle = (event) => {
    let backgroundColor = '#3174ad'; // Default color
    if (event.task.includes('MPU Install')) {
        backgroundColor = '#f56b00'; // Orange for MPU Install
    } else if (event.task.includes('Solar Install')) {
        backgroundColor = '#5100ff'; // Yellow for Solar Install
    } else if (event.task.includes('Battery Install')) {
        backgroundColor = '#0f9d58'; // Green for Battery Install
    } else if (event.task.includes('Return Trip')) {
        backgroundColor = '#d32f2f'; // Red for Return Trip
    } else if (event.task.includes('Site Survey')) {
        backgroundColor = '#1976d2'; // Blue for Site Survey
    } else if (event.task.includes('Service')) {
        backgroundColor = '#9c27b0'; // Purple for Service
    } else if (event.task.includes('Roof Install')) {
        backgroundColor = '#ffc107'; // Amber for Roof Install
    } else if (event.task.includes('Quiet Cool')) {
        backgroundColor = '#607d8b'; // Blue Grey for Quiet Cool
    } else if (event.task.includes('Pre Inspection')) {
        backgroundColor = '#960076'; // Teal for Pre Inspection
    } else if (event.task.includes('Insulation')) {
        backgroundColor = '#8bc34a'; // Light Green for Insulation
    } else if (event.task.includes('HVAC Sale')) {
        backgroundColor = '#3f51b5'; // Indigo for HVAC Sale
    } else if (event.task.includes('Final Inspection')) {
        backgroundColor = '#e91e63'; // Pink for Final Inspection
    } else if (event.task.includes('Final Inspection (Service)')) {
        backgroundColor = '#ff5722'; // Deep Orange for Final Inspection (Service)
    } else if (event.task.includes('Construction Meeting')) {
      backgroundColor = '#eb9834'; // Deep Orange for Final Inspection (Service)
  }
    // Add more conditions as needed
  
    return {
        style: {
            backgroundColor,
        },
    };
};

  
  

const ConstructionCalendar = () => {
  const router = useRouter();
  const { id } = router.query;
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEventGoogleMapsLink, setSelectedEventGoogleMapsLink] = useState('');
  const [selectedEventCompanyCamLink, setSelectedEventCompanyCamLink] = useState('');


  const { loading, error, data } = useQuery(GET_CONSTRUCTION_JOBS, {
    variables: { repID: id },
    skip: !id,
  });

    // Example hardcoded link
    const googleMapsLink = "https://www.google.com/maps";

  useEffect(() => {


    if (data && data.GetConstructionJobs) {
      const formattedEvents = data.GetConstructionJobs.map((job, index) => {
        const startTime = job.serviceTime ? moment(job.serviceTime, "HH:mm:ss") : moment().startOf('day').add(9, 'hours');
        const endTime = job.serviceEndTime ? moment(job.serviceEndTime, "HH:mm:ss") : moment().startOf('day').add(9, 'hours');
        return {
          id: index,
          title: job.homeownerName || 'No Title',
          foreman1: job.foreman1 || 'No Title',
          foreman2: job.foreman2 || 'No Title',
          foreman3: job.foreman3 || 'No Title',
          foreman4: job.foreman4 || 'No Title',
          journeyman1: job.journeyman1 || 'No Title',
          journeyman2: job.journeyman2 || 'No Title',
          journeyman3: job.journeyman3 || 'No Title',
          journeyman4: job.journeyman4 || 'No Title',
          apprentice11: job.apprentice11 || 'No Title',
          apprentice12: job.apprentice12 || 'No Title',
          apprentice13: job.apprentice13 || 'No Title',
          apprentice14: job.apprentice14 || 'No Title',
          apprentice21: job.apprentice21 || 'No Title',
          apprentice22: job.apprentice22 || 'No Title',
          apprentice23: job.apprentice23 || 'No Title',
          apprentice24: job.apprentice24 || 'No Title',
          apprentice31: job.apprentice31 || 'No Title',
          apprentice32: job.apprentice32 || 'No Title',
          apprentice33: job.apprentice33 || 'No Title',
          apprentice34: job.apprentice34 || 'No Title',
          companyCam: job.companyCam || 'No Cam Link',
          task:   job.task || null,
          notes:    job.notes || null,
          address: job.address || 'No Address',
          start: moment(job.serviceDate).set({
            hour: startTime.get('hour'),
            minute: startTime.get('minute'),
            second: startTime.get('second'),
          }).toDate(),
          end: moment(job.serviceDate).set({
            hour: endTime.get('hour'),
            minute: endTime.get('minute'),
            second: endTime.get('second'),
          }).toDate(),
        };
      });





 // Example logic assuming you might combine API events with static ones
 const recurringEvents = [];
 const today = moment();
 const daysUntilFriday = 5 - today.day() >= 0 ? 5 - today.day() : 7 - (today.day() - 5);
 const firstFriday = today.add(daysUntilFriday, 'days');

 for (let i = 0; i < 4; i++) { // Next 4 Fridays as an example
   const friday = firstFriday.clone().add(7 * i, 'days');
   recurringEvents.push(createConstructionMeetingEvent(friday));
 }

 // Assuming 'formattedEvents' is your array of events from the API:
 const allEvents = [...formattedEvents, ...recurringEvents];
 setEvents(allEvents);
  //   setEvents(formattedEvents);
    }










  }, [data]);

  const onSelectEvent = (event) => {

 // Encode the address to ensure it's in the correct format for a URL
 const encodedAddress = encodeURIComponent(event.address);


 const companyCamLink = event.companyCam;
 // Construct the Google Maps link with the encoded address
 const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;


 
 // Set the Google Maps link as part of the selected event object for easy access
 setSelectedEventGoogleMapsLink(googleMapsLink);
 setSelectedEventCompanyCamLink(companyCamLink);

    setSelectedEvent(event);
    setOpenModal(true);
  };


  // When opening the company cam link, ensure it's an absolute URL
const openLinkInNewTab = (url) => {
  if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
    window.open(url, '_blank');
  } else {
    console.error('Invalid URL:', url);
    // Handle the case where the URL is invalid or not provided
    // For example, you could show an error message to the user
  }
};


  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%', backgroundColor: 'white' }}>
      <div style={{ position: 'relative', width: '150px', height: '150px' }}>
        <Image src="/images/voltaicLogo.png" alt="Loading..." layout="fill" objectFit="contain" />
      </div>
    </div>
  );
  


  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{width: '100vw', backgroundColor: 'white'}}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={{ month: false, week: true, day: true, agenda: true }}
        defaultDate={moment().toDate()}
        defaultView={Views.DAY}
        style={{ height: '100vh', width: '100%' }}
        onSelectEvent={onSelectEvent}
        eventPropGetter={getEventStyle} 
        components={{
            agenda: {
              event: CustomAgendaEvent, // use your custom event component here
             // toolbar: CustomToolbar
            },
          }}
      />

       <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >











        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', color:'black', boxShadow: 24, p: 4 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Event Details
          </Typography>
          {selectedEvent && (
            <Box id="modal-description" sx={{ mt: 2 }}>
              <Typography>Name: {selectedEvent.title}</Typography>
              <Typography>Date: {moment(selectedEvent.start).format('LLLL')}</Typography>
              <Typography>Address: {selectedEvent.address}</Typography>
              
              <Typography>Task: {selectedEvent.task}</Typography>
              <Typography>Notes: {selectedEvent.notes}</Typography>
              <Typography>Address: {selectedEvent.address}</Typography>
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                <IconButton
                  color="primary"
                  aria-label="location"
                  component="span"
                  onClick={() => window.open(selectedEventGoogleMapsLink, '_blank')} // Open the link in a new tab
                >
                  <LocationOnIcon />
                </IconButton>
                <Link href={selectedEventGoogleMapsLink} target="_blank" rel="noopener" underline="none">
                  Open in Google Maps
                </Link>
                
              </Box>

  {/* Conditionally render the company cam link only if the task is not 'Construction Meeting' */}
  {selectedEvent.task !== 'Construction Meeting' && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="primary"
              aria-label="camera"
              component="span"
              onClick={() => openLinkInNewTab(selectedEventCompanyCamLink)} // Use the helper function to open the link
            >
              <CameraAltIcon />
            </IconButton>
            <Link href={selectedEventCompanyCamLink} target="_blank" rel="noopener" underline="none">
              Open Company Cam
            </Link>
          </Box>
        )}







            </Box>
          )}

<Typography sx={{ mt: 2 }}>Crew Members:</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {renderCrewMember( selectedEvent?.foreman1, 'Foreman 1', '#ff5722')}
        {renderCrewMember( selectedEvent?.foreman2, 'Foreman 2', '#ff5722')} {/* Foreman 2 - Orange */}
        {renderCrewMember( selectedEvent?.journeyman1, 'Journeyman 1', '#3f51b5')} {/* Journeyman 1 - Blue */}
        {renderCrewMember( selectedEvent?.journeyman2, 'Journeyman 2', '#3f51b5')} {/* Journeyman 2 - Blue */}
        {renderCrewMember( selectedEvent?.apprentice11, 'Apprentice I', '#9c27b0')} {/* Apprentice 11 - Purple */}
        {renderCrewMember( selectedEvent?.apprentice12, 'Apprentice I -2', '#9c27b0')} {/* Apprentice 11 - Purple */}
        {renderCrewMember( selectedEvent?.apprentice13, 'Apprentice I - 3', '#9c27b0')} {/* Apprentice 11 - Purple */}
        {renderCrewMember( selectedEvent?.apprentice14, 'Apprentice I -4', '#9c27b0')} {/* Apprentice 11 - Purple */}
        {renderCrewMember( selectedEvent?.apprentice21, 'Apprentice II', '#9c27b0')} {/* Apprentice 11 - Purple */}
        {renderCrewMember( selectedEvent?.apprentice22, 'Apprentice II - 2', '#9c27b0')} {/* Apprentice 11 - Purple */}
        {renderCrewMember( selectedEvent?.apprentice23, 'Apprentice II - 3', '#9c27b0')} {/* Apprentice 11 - Purple */}
        {renderCrewMember( selectedEvent?.apprentice24, 'Apprentice II - 4', '#9c27b0')} {/* Apprentice 11 - Purple */}
        {renderCrewMember( selectedEvent?.apprentice31, 'Apprentice III', '#9c27b0')} {/* Apprentice 11 - Purple */}
        {renderCrewMember( selectedEvent?.apprentice32, 'Apprentice III - 2', '#9c27b0')} {/* Apprentice 11 - Purple */}
        {renderCrewMember( selectedEvent?.apprentice33, 'Apprentice III - 3', '#9c27b0')} {/* Apprentice 11 - Purple */}
        {renderCrewMember( selectedEvent?.apprentice34, 'Apprentice III - 4', '#9c27b0')} {/* Apprentice 11 - Purple */}
        {/* Add similar calls for other apprentices with different colors if needed */}
      </Box>
          <Button onClick={() => setOpenModal(false)} sx={{ mt: 2 }}>Close</Button>
        </Box>









      </Modal>
    </div>
  );
};

export default ConstructionCalendar;
