import React, { Component, PropTypes } from 'react';

// const propTypes = {
//     submitEmail: PropsTypes.func,
// };

// const defaultProps = {
// };

class Submit extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button onClick={() => this.props.submitEmail}>Button</button>
    );
  }
}
// Submit.propTypes = propTypes;
// Submit.defaultProps = defaultProps;

export default Submit;
