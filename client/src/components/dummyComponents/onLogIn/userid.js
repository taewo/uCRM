import React, { Component, PropTypes } from 'react';

const propTypes = {
  signUpUserid: PropTypes.string,
};

const defaultProps = {
  signUpUserid: null,
};

class Userid extends Component {

  render() {
    return (
      <div>
        <input
          type="text" placeholder="Userid" onChange={e => this.props.logInUserId(e.target.value)}
        />
      </div>
    );
  }
}
Userid.propTypes = propTypes;
Userid.defaultProps = defaultProps;

export default Userid;
