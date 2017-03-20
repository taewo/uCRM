import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as leadActions from '../../actions/leadActions';

class Lead extends Component {
  componentWillMount() {
    console.log('will mount');
    this.props.leadShow();
  }

  componentDidMount() {
    console.log('did mount');
  }
  render() {
    const leadDataList = this.props.leadData ?
    this.props.leadData.map((listData, i) => {
      const subStringDate = listData.date.substring(5, 10);
      const modifyDate = subStringDate.replace('-', '월') + '일';
      return (
        <div key={i}>
          {modifyDate}, {listData.name}님께서 {listData.type}로 연락 및 방문 하셨습니다.
        </div>
      )
    })
    : 'default';
    return (
      <div>
        Lead page<br />
        <Link to={`/admin/manage/lead/add`}>
          addLead
        </Link>
        <br />
        <br />
        {leadDataList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  leadData: state.leadReducer.data,
});

const mapDispatchToProps = dispatch => ({
  leadShow: () => { dispatch(leadActions.leadShow()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Lead);
