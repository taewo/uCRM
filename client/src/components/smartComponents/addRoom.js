import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import css from 'react-big-calendar/lib/css/react-big-calendar.css';
import event from './event'

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment),
);

class AddRoom extends Component {ls
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(2017, 3, 12),
      startDate: 1,
      endDate: 2,
      slots: 3,
    };
    this.showState = this.showState.bind(this);
    this.check = this.check.bind(this);
  }

  showState() {
    console.log('this state ', this.state);
  }

  check(){
    console.log('check')
  }

  render() {
    console.log(111,this.state);
    const style1 = {
      height: '800',
    };
    return (
      <div>
        <button onClick={this.showState}>showState</button>
        <h3 className="callout">
          Click an event to see more info, or
          drag the mouse over the calendar to select a date/time range.
        </h3>
        <BigCalendar
          style={style1}
          elementProps
          defaultView="week"
          popup
          popupOffset={{x:30, y:20}}
          selectable={true}
          culture={'ko'}
          events = {event}
          messages
          date={this.state.selectedDay}
          onNavigate={(date) => {
            console.log(12312312)
            this.setState({
              selectedDate: date,
            });
          }}
          onSelecting= {this.check}
          scrollToTime={new Date()}
          defaultDate = {this.state.selectedDate}
          onSelectEvent={event => event.push('onSelectEvent',event.title)}
          onSelectSlot={(slotInfo) => {
            window.prompt('enter');
            console.log('slotInfo',slotInfo);
          }}


        />
      </div>
    )
  }
}


export default AddRoom;
