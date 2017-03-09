import React, { Component, PropTypes } from 'react';
import styles from '../../../public/style.css';

const propTypes = {
};

const defaultProps = {
};

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Home">현규</div>
    );
  }
}
Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
