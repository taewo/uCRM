import React, { Component, PropTypes } from 'react';

const propTypes = {
};

const defaultProps = {
};

class LatestActivity extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const latestActivityList = this.props.latestActivity ?
        this.props.latestActivity.map((data, i) =>
          <div key={i}>{data.user}는 {data.type}을 {data.date}했다</div>
        )
      : [];
    // const {user, type, date} = this.props.latestActivity;
    // const userName = user ? user.map(user => user.user) : [];
    return (
      <div>
        LatestActivity:
        <ul>
          {latestActivityList}
        </ul>
      </div>
    );
  }
}
LatestActivity.propTypes = propTypes;
LatestActivity.defaultProps = defaultProps;

export default LatestActivity;

// <LatestActivity latestActivity={this.props.latestActivityOnChange} />

// {this.props.latestActivity.map((data, i) => {
//   return (<Form user={data.user} action={data.type} date={data.date} key={i}/>)
// })}
