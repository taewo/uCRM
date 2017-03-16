import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';

class Members extends Component {

  constructor(props) {
    super(props);

    this.showMembers = this.showMembers.bind(this);
  }

  componentDidMount() {
    this.showMembers();
  }

  showMembers() {
    const instance = {
      headers: {
        token: localStorage.getItem('userToken'),
      },
    };
    const API_URL = 'http://localhost:4000/api';
    return axios({
      method: 'get',
      url: `${API_URL}/member`,
      params: { space_id: localStorage.getItem('userSpaceListId') },
      headers: instance.headers,
    })
    .then((res) => {
      const memberJson = JSON.parse(res.data);
      console.log(memberJson);
      const memberData = [];
      memberData.push(memberJson);
      // const memberList = memberData[0].map((data, i) => {
      //   return (<div key={i} id={data.id}>{data}</div> )
      // });
      return ;;
    });
  }

  render() {

    return (
      <div>
        <Link to={'/admin/manage/members/add'}>
          Add Member
        </Link>
        <br />
        <div>
          memberList
          {this.showMembers}
        </div>
      </div>
    );
  }
}

export default (Members);
