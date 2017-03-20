import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as basicActions from '../../actions/basicActions';

class Basic extends Component {
  componentWillMount() {
    this.props.basicShow();
  }
  render() {
    const basicList = this.props.basicData ?
    this.props.basicData.map((data, i) => {
      return (
        <div key={i}>
          address: {data.address} <br />
          company_id: {data.company_id} <br />
          max_desks: {data.max_desks} <br />
          name : {data.name} <br /><br /><br />
        </div>
      )
    })
    : 'default';
    return (
      <div>
        Basic
        <br />
        {basicList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  basicData: state.basicReducer.data,
});

const mapDispatchToProps = dispatch => ({
  basicShow: () => { dispatch(basicActions.basicShow()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Basic);
