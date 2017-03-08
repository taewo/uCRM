import React, { Component, PropTypes } from 'react';

const propTypes = {
  signUpName: PropTypes.string,
};

const defaultProps = {
  signUpName: null,
};

class Name extends Component {

  render() {
    return (
      <div>
        <input
          type="text" placeholder="Name" onChange={e => this.props.signUpName(e.target.value)}
        />
      </div>
    );
  }
}
Name.propTypes = propTypes;
Name.defaultProps = defaultProps;

export default Name;
