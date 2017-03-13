import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import css from 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment),
);

class AddRoom extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedDate: 1
    }
  }

  render() {
    console.log(this.state.selectedDate);
    return (
      <div>
        <h3 className="callout">
          Click an event to see more info, or
          drag the mouse over the calendar to select a date/time range.
        </h3>
        <BigCalendar

          selectable
          popup
          events={
          [
            { 'title': 'All Day Event',
              'start': new Date(),
              'end': new Date() }
          ]
        }
          date={this.state.selectedDay}
          onNavigate={(date) => {
            this.setState({
              selectedDate: date
            });
          }}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2017, 3, 12)}
          onSelectEvent={event => console.log(event.title)}
          onSelectSlot={(slotInfo) => console.log(
            `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
            `\nend: ${slotInfo.end.toLocaleString()}`
          )}
        />
      </div>
    )
  }
}


export default AddRoom;
