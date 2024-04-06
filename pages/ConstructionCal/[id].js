import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useQuery } from '@apollo/client';
import { GET_CONSTRUCTION_JOBS } from '@/gql/queries/serviceQueries';
import { useRouter } from 'next/router';
import { Modal, Box, Typography, Button, Link, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Import the location icon

const localizer = momentLocalizer(moment);

const ConstructionCalendar = () => {
  const router = useRouter();
  const { id } = router.query;
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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
        const endTime = startTime.clone().add(2, 'hours');
        return {
          id: index,
          title: job.homeownerName || 'No Title',
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
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                <IconButton
                  color="primary"
                  aria-label="location"
                  component="span"
                  onClick={() => window.open(googleMapsLink, '_blank')} // Open the link in a new tab
                >
                  <LocationOnIcon />
                </IconButton>
                <Link href={googleMapsLink} target="_blank" rel="noopener" underline="none">
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

export default ConstructionCalendar;
