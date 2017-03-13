import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

class MiddlebarRoom extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/manage/room'}>
          MiddlebarRoom
        </Link>
      </div>
    );
  }
}
MiddlebarRoom.propTypes = propTypes;
MiddlebarRoom.defaultProps = defaultProps;

export default MiddlebarRoom;
