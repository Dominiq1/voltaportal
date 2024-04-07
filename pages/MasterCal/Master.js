import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useQuery } from '@apollo/client';
import { GET_CONSTRUCTION_JOBS_MASTER } from '@/gql/queries/serviceQueries';
import { useRouter } from 'next/router';
import { Modal, Box, Typography, Button, Link, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Import the location icon

const localizer = momentLocalizer(moment);


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
      backgroundColor = '#f56b00'; // Orange for installations
    } else if (event.task.includes('Solar Install')) {
      backgroundColor = '#ffea00'; // Yellow for maintenance
    } else if (event.task.includes('Battery Install')) {
      backgroundColor = '#0f9d58'; // Green for inspections
    }
    // Add more conditions as needed
  
    return {
      style: {
        backgroundColor,
      },
    };
  };
  
  

const MasterCalendar = () => {
 
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEventGoogleMapsLink, setSelectedEventGoogleMapsLink] = useState('');


  const { loading, error, data } = useQuery(GET_CONSTRUCTION_JOBS_MASTER, {
    variables: { repID: "0000" }
  });

    // Example hardcoded link
    const googleMapsLink = "https://www.google.com/maps";

  useEffect(() => {
    if (data && data.GetConstructionJobsMaster) {
      const formattedEvents = data.GetConstructionJobsMaster.map((job, index) => {
        const startTime = job.serviceTime ? moment(job.serviceTime, "HH:mm:ss") : moment().startOf('day').add(9, 'hours');
        const endTime = startTime.clone().add(2, 'hours');
        return {
          id: index,
          title: job.homeownerName || 'No Title',
          task:  "Task - " + job.task || null,
          notes:  "Notes - " + job.notes || null,
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

      setEvents(formattedEvents);
    }
  }, [data]);

  const onSelectEvent = (event) => {

 // Encode the address to ensure it's in the correct format for a URL
 const encodedAddress = encodeURIComponent(event.address);
 // Construct the Google Maps link with the encoded address
 const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
 
 // Set the Google Maps link as part of the selected event object for easy access
 setSelectedEventGoogleMapsLink(googleMapsLink);

    setSelectedEvent(event);
    setOpenModal(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
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
            },
          }}
      />
       <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Event Details
          </Typography>
          {selectedEvent && (
            <Box id="modal-description" sx={{ mt: 2 }}>
              <Typography>Name: {selectedEvent.title}</Typography>
              <Typography>Date: {moment(selectedEvent.start).format('LLLL')}</Typography>
              <Typography>Address: {selectedEvent.address}</Typography>
              <Typography>Task: {selectedEvent.task}</Typography>
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
            </Box>
          )}
          <Button onClick={() => setOpenModal(false)} sx={{ mt: 2 }}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default MasterCalendar;
