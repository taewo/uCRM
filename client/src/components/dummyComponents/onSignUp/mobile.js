import React, { Component, PropTypes } from 'react';

const propTypes = {
  signUpMobile: PropTypes.string,
};

const defaultProps = {
  signUpMobile: null,
};

class Mobile extends Component {

  render() {
    return (
      <div>
        <input
          type="text" placeholder="Mobile" onChange={e => this.props.signUpMobile(e.target.value)}
        />
      </div>
    );
  }
}
Mobile.propTypes = propTypes;
Mobile.defaultProps = defaultProps;

export default Mobile;
