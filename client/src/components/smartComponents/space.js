import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as spaceActions from '../../actions/spaceActions';

class Space extends Component {
  componentWillMount() {
    console.log('will mount');
    this.props.spaceShow();
    console.log(this.props.spaceData);
  }

  componentDidMount() {
    console.log(this.props.spaceData);
  }

  render() {
    console.log(this.props.spaceData);
    const spaceList = this.props.spaceData ?
    this.props.spaceData.map((spaceData, i) => {
      console.log('spaceData', spaceData.address);
      return (
        <div key={i}>
          장소 : {spaceData.address} <br />
          공간 : {spaceData.name} <br />
        최대인원 : {spaceData.max_desks} <br /><br />
        </div>
      );
    })
    : 'default';
    return (
      <div>
        Space
        <br />
        <Link to={'/admin/setting/space/add'}>
          Add Space
        </Link>
        <br />
        {spaceList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spaceData: state.spaceReducer.data,
});

const mapDispatchToProps = dispatch => ({
  spaceShow: () => { dispatch(spaceActions.spaceShow()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Space);
