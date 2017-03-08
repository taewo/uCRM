import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

class ButtonSignUp extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
      // e.preventDefault();

  }
  render() {
    return (
      <div>
      <button>
        button
        <Link to={'/signup'}> </Link>
      </button>
      <div>
        {this.props.childrend}
      </div>
      </div>
    );
  }
}
ButtonSignUp.propTypes = propTypes;
ButtonSignUp.defaultProps = defaultProps;

export default ButtonSignUp;
