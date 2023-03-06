import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Alert from 'sweetalert2';

///images
import user9 from '../../../../images/users/9.jpg';
import user10 from '../../../../images/users/10.jpg';
import user11 from '../../../../images/users/11.jpg';

class EventCalendar1 extends Component {
  state = {
    calendarEvents: [
      {
        title: 'Atlanta Monster',
        start: new Date('2019-04-04 00:00'),
        id: '99999998',
      },
      {
        title: 'My Favorite Murder',
        start: new Date('2019-04-05 00:00'),
        id: '99999999',
      },
    ],
    events: [
      { title: 'Event 1', id: '1' },
      { title: 'Event 2', id: '2' },
      { title: 'Event 3', id: '3' },
      { title: 'Event 4', id: '4' },
      { title: 'Event 5', id: '5' },
    ],
  };

  /**
   * adding dragable properties to external events through javascript
   */
  /* componentDidMount() {
      let draggableEl = document.getElementById("external-events");
      new Draggable(draggableEl, {
         itemSelector: ".fc-event",
         eventData: function (eventEl) {
            let title = eventEl.getAttribute("title");
            let id = eventEl.getAttribute("data");
            return {
               title: title,
               id: id,
            };
         },
      });
   } */

  /**
   * when we click on event we are displaying event details
   */
  eventClick = (eventClick) => {
    Alert.fire({
      title: eventClick.event.title,
      html:
        `<div className="table-responsive">
      <table className="table">
      <tbody>
      <tr >
      <td>Title</td>
      <td><strong>` +
        eventClick.event.title +
        `</strong></td>
      </tr>
      <tr >
      <td>Start Time</td>
      <td><strong>
      ` +
        eventClick.event.start +
        `
      </strong></td>
      </tr>
      </tbody>
      </table>
      </div>`,

      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Remove Event',
      cancelButtonText: 'Close',
    }).then((result) => {
      if (result.value) {
        eventClick.event.remove(); // It will remove event from the calendar
        Alert.fire('Deleted!', 'Your Event has been deleted.', 'success');
      }
    });
  };

  render() {
    return (
      <div className='animated fadeIn  demo-app'>
        <div className='row'>
          <div className='col-xl-9 col-xxl-8'>
            <div className='row'>
              <div className='col-xl-12'>
                <div className='card'>
                  <div className='card-body'>
                    <FullCalendar
                      defaultView='dayGridMonth'
                      header={{
                        left: 'prev,next today',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                        center: 'title',
                      }}
                      rerenderDelay={10}
                      eventDurationEditable={false}
                      editable={true}
                      droppable={true}
                      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                      ref={this.calendarComponentRef}
                      weekends={this.state.calendarWeekends}
                      events={this.state.calendarEvents}
                      eventDrop={this.drop}
                      // drop={this.drop}
                      eventReceive={this.eventReceive}
                      eventClick={this.eventClick}
                      // selectable={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-xl-3 col-xxl-4" >
                 <div className="card">
						<div className="card-header">
							<h4 classnName="card-title">Events</h4>
						</div>
						<div className="card-body">
							<div id="external-events">
								{this.state.events.map((event) => (
									<div
									   className="fc-event btn-block btn btn-primary"
									   title={event.title}
									   data={event.id}
									   key={event.id}
									>
									   {event.title}
									</div>
								))}
							</div>
						</div>
					</div>
				</div> */}
          <div className='col-xl-3 col-xxl-4'>
            <div className='row'>
              <div className='col-xl-12'>
                <div className='card bg-primary'>
                  <div className='card-body'>
                    <div className='date-bx d-flex align-items-center'>
                      <h2 className='mb-0 mr-3'>26</h2>
                      <div>
                        <p className='mb-0 text-white op7'>Today</p>
                        <span className='fs-24 text-white font-w600'>Sunday</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-12'>
                <div className='card'>
                  <div className='card-header border-0 shadow-sm'>
                    <h4 className='fs-20 text-black font-w600'>Project Today</h4>
                  </div>
                  <div className='card-body'>
                    <div className='media pb-3 mb-3 border-bottom'>
                      <span className='p-3 mr-3 border border-primary rounded-circle'>
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M22.9479 9.32202C22.8893 9.14733 22.7836 8.99223 22.6424 8.87382C22.5013 8.75541 22.3301 8.67831 22.1479 8.65102L15.7659 7.67602L12.9019 1.57602C12.8211 1.40423 12.6931 1.25896 12.5329 1.15722C12.3726 1.05547 12.1867 1.00143 11.9969 1.00143C11.8071 1.00143 11.6212 1.05547 11.4609 1.15722C11.3006 1.25896 11.1726 1.40423 11.0919 1.57602L8.22789 7.67602L1.84589 8.65102C1.66411 8.67873 1.49349 8.75602 1.35279 8.8744C1.21209 8.99278 1.10675 9.14767 1.04835 9.32203C0.989954 9.49639 0.980764 9.68347 1.02179 9.86272C1.06282 10.042 1.15247 10.2064 1.28089 10.338L5.93189 15.1L4.83189 21.838C4.80187 22.0229 4.8244 22.2126 4.89691 22.3853C4.96942 22.558 5.08899 22.7069 5.242 22.815C5.39502 22.9231 5.57531 22.986 5.76235 22.9967C5.94939 23.0073 6.13564 22.9651 6.29989 22.875L11.9999 19.727L17.6999 22.875C17.8641 22.9659 18.0506 23.0087 18.2381 22.9985C18.4255 22.9883 18.6063 22.9256 18.7597 22.8176C18.9132 22.7095 19.0331 22.5604 19.1059 22.3873C19.1786 22.2143 19.2011 22.0243 19.1709 21.839L18.0709 15.101L22.7189 10.338C22.8467 10.2061 22.9357 10.0414 22.9761 9.86219C23.0165 9.68296 23.0067 9.49607 22.9479 9.32202Z'
                            fill='#2953E8'
                          />
                        </svg>
                      </span>
                      <div className='media-body'>
                        <p className='fs-14 mb-2'>09:30 AM - 11:00 AM</p>
                        <h6 className='fs-16 font-w600'>
                          <Link to={'/projects'} className='text-black'>
                            Convert Apps to mobile version
                          </Link>
                        </h6>
                        <ul className='users'>
                          <li>
                            <img src={user9} alt='' />
                          </li>
                          <li>
                            <img src={user10} alt='' />
                          </li>
                          <li>
                            <img src={user11} alt='' />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='media pb-3 mb-3 border-bottom'>
                      <span className='p-3 mr-3 border border-success rounded-circle'>
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M22.9479 9.32202C22.8893 9.14733 22.7836 8.99223 22.6424 8.87382C22.5013 8.75541 22.3301 8.67831 22.1479 8.65102L15.7659 7.67602L12.9019 1.57602C12.8211 1.40423 12.6931 1.25896 12.5329 1.15722C12.3726 1.05547 12.1867 1.00143 11.9969 1.00143C11.8071 1.00143 11.6212 1.05547 11.4609 1.15722C11.3006 1.25896 11.1726 1.40423 11.0919 1.57602L8.22789 7.67602L1.84589 8.65102C1.66411 8.67873 1.49349 8.75602 1.35279 8.8744C1.21209 8.99278 1.10675 9.14767 1.04835 9.32203C0.989954 9.49639 0.980764 9.68347 1.02179 9.86272C1.06282 10.042 1.15247 10.2064 1.28089 10.338L5.93189 15.1L4.83189 21.838C4.80187 22.0229 4.8244 22.2126 4.89691 22.3853C4.96942 22.558 5.08899 22.7069 5.242 22.815C5.39502 22.9231 5.57531 22.986 5.76235 22.9967C5.94939 23.0073 6.13564 22.9651 6.29989 22.875L11.9999 19.727L17.6999 22.875C17.8641 22.9659 18.0506 23.0087 18.2381 22.9985C18.4255 22.9883 18.6063 22.9256 18.7597 22.8176C18.9132 22.7095 19.0331 22.5604 19.1059 22.3873C19.1786 22.2143 19.2011 22.0243 19.1709 21.839L18.0709 15.101L22.7189 10.338C22.8467 10.2061 22.9357 10.0414 22.9761 9.86219C23.0165 9.68296 23.0067 9.49607 22.9479 9.32202Z'
                            fill='#39D952'
                          />
                        </svg>
                      </span>
                      <div className='media-body'>
                        <p className='fs-14 mb-2'>09:30 AM - 11:00 AM</p>
                        <h6 className='fs-16 font-w600'>
                          <Link to={'/projects'} className='text-black'>
                            Weekly Meetings for Vora App
                          </Link>
                        </h6>
                        <ul className='users'>
                          <li>
                            <img src={user9} alt='' />
                          </li>
                          <li>
                            <img src={user10} alt='' />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='media'>
                      <span className='p-3 mr-3 border border-warning rounded-circle'>
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M22.9479 9.32202C22.8893 9.14733 22.7836 8.99223 22.6424 8.87382C22.5013 8.75541 22.3301 8.67831 22.1479 8.65102L15.7659 7.67602L12.9019 1.57602C12.8211 1.40423 12.6931 1.25896 12.5329 1.15722C12.3726 1.05547 12.1867 1.00143 11.9969 1.00143C11.8071 1.00143 11.6212 1.05547 11.4609 1.15722C11.3006 1.25896 11.1726 1.40423 11.0919 1.57602L8.22789 7.67602L1.84589 8.65102C1.66411 8.67873 1.49349 8.75602 1.35279 8.8744C1.21209 8.99278 1.10675 9.14767 1.04835 9.32203C0.989954 9.49639 0.980764 9.68347 1.02179 9.86272C1.06282 10.042 1.15247 10.2064 1.28089 10.338L5.93189 15.1L4.83189 21.838C4.80187 22.0229 4.8244 22.2126 4.89691 22.3853C4.96942 22.558 5.08899 22.7069 5.242 22.815C5.39502 22.9231 5.57531 22.986 5.76235 22.9967C5.94939 23.0073 6.13564 22.9651 6.29989 22.875L11.9999 19.727L17.6999 22.875C17.8641 22.9659 18.0506 23.0087 18.2381 22.9985C18.4255 22.9883 18.6063 22.9256 18.7597 22.8176C18.9132 22.7095 19.0331 22.5604 19.1059 22.3873C19.1786 22.2143 19.2011 22.0243 19.1709 21.839L18.0709 15.101L22.7189 10.338C22.8467 10.2061 22.9357 10.0414 22.9761 9.86219C23.0165 9.68296 23.0067 9.49607 22.9479 9.32202Z'
                            fill='#FF6F1E'
                          />
                        </svg>
                      </span>
                      <div className='media-body'>
                        <p className='fs-14 mb-2'>09:30 AM - 11:00 AM</p>
                        <h6 className='fs-16 font-w600'>
                          <Link to={'/projects'} className='text-black'>
                            Annual Meeting for Backand Vora App
                          </Link>
                        </h6>
                        <ul className='users'>
                          <li>
                            <img src={user11} alt='' />
                          </li>
                          <li>
                            <img src={user9} alt='' />
                          </li>
                          <li>
                            <img src={user10} alt='' />
                          </li>
                          <li>
                            <img src={user11} alt='' />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventCalendar1;
