import React, { Component } from 'react';

class RoomReservation extends Component {
  render() {
    const roomReservationList = this.props.roomReservation ?
    this.props.roomReservation.map((data, i) => {
      return (
        <div key={i}>
          날짜:     {data.date}<br />
          시간:     {data.time}<br />
          결제여부:  {data.ispaid.toString()}<br />
        </div>
      )
    })
    : 'default';

    return (
      <div>
        RoomReservation
        <ul>
          {roomReservationList}
        </ul>
      </div>
    );
  }
}

export default RoomReservation;
