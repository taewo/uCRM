import React, { Component, PropTypes } from 'react';

const propTypes = {
  signUpCompanyname: PropTypes.string,
};

const defaultProps = {
  signUpCompanyname: null,
};

class Companyname extends Component {

  render() {
    return (
      <div>
        <input
          type="text" placeholder="companyname" onChange={e => this.props.signUpCompanyname(e.target.value)}
        />
      </div>
    );
  }
}
Companyname.propTypes = propTypes;
Companyname.defaultProps = defaultProps;

export default Companyname;
