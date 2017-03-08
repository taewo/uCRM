import React, { Component, PropTypes } from 'react';

const propTypes = {
  signUpUserId: PropTypes.string,
};

const defaultProps = {
  signUpUserId: null,
};

class UserId extends Component {

  render() {
    return (
      <div>
        <input
          type="text" placeholder="UserId" onChange={e => this.props.signUpUserid(e.target.value)}
        />
      </div>
    );
  }
}
UserId.propTypes = propTypes;
UserId.defaultProps = defaultProps;

export default UserId;
