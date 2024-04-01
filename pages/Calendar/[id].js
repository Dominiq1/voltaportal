import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_SERVICE_JOBS } from '@/gql/queries/serviceQueries';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const router = useRouter();
  const { id } = router.query;

  const [events, setEvents] = useState([]);

  const { loading, error, data } = useQuery(GET_SERVICE_JOBS, {
    variables: { repID: id },
    skip: !id,
  });

  useEffect(() => {
    if (data && data.GetServiceJobs) {
      const formattedEvents = data.GetServiceJobs.map((job, index) => {
        const startTime = job.serviceTime ? moment(job.serviceTime, "HH:mm:ss") : moment().startOf('day').add(9, 'hours');
        const endTime = startTime.clone().add(2, 'hours');
        
        return {
          id: index,
          title: job.homeownerName || 'No Title',
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
          desc: `${job.address}, Foreman1 ID: ${job.foreman1}`,
        };
      });

      setEvents(formattedEvents);
    }
  }, [data]);

  // Define onSelectEvent function here
  const onSelectEvent = (event) => {
    alert(`Event: ${event.title}\nStart: ${event.start}\nEnd: ${event.end}`);
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%', backgroundColor: 'white' }}><p>Loading...</p></div>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={{ month: false, week: false, day: true, agenda: true }}
        defaultDate={moment().toDate()}
        defaultView={Views.DAY}
        style={{ height: '100%' }}
        onSelectEvent={onSelectEvent}
      />
    </div>
  );
};

export default MyCalendar;
