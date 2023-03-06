import React from 'react';
import EventCalendar1 from './EventCalendar1';

class Calendar extends React.Component {
  render() {
    return (
      <>
        <div className='h-80'>
          <EventCalendar1 />
        </div>
      </>
    );
  }
}
export default Calendar;
