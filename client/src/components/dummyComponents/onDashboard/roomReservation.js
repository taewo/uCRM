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
    return (
      <div>
        RoomReservation
        {this.props.roomReservation}
      </div>
    );
  }
}
RoomReservation.propTypes = propTypes;
RoomReservation.defaultProps = defaultProps;

export default RoomReservation;
