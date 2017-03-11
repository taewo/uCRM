import React, { Component, PropTypes } from 'react';

const propTypes = {
};

const defaultProps = {
};

class RoomReservation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const roomReservationList = this.props.roomReservation ?
    this.props.roomReservation.map((data, i) =>
      <div key={i}>
        날짜:     {data.date}<br/>
        시간:     {data.time}<br/>
        결제여부:  {data.ispaid.toString()}<br/>
      </div>
    )
    : [];

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
RoomReservation.propTypes = propTypes;
RoomReservation.defaultProps = defaultProps;

export default RoomReservation;
