import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ChurnReport from './churnreport';

class ChurnPage extends Component {

  constructor(props) {
    super(props);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.state = {
      data: {},
      type: 0,
      type_mapper: {
        0: '비교분석',
        1: '이번달',
        2: '지난달',
        3: '이탈흐름분석',
      },
    };
  }

  componentDidMount() {
    this.handleTabClick(0);
  }

  handleTabClick(type) {
    console.log('type', type);
    const API_URL = 'http://localhost:8000/api';
    let targeturl = `${API_URL}/churn/flow/?format=json`;
    if (type === 0) {
      targeturl = `${API_URL}/churn/compare/?format=json`;
    }
    if (type === 1) {
      targeturl = `${API_URL}/churn/this/?format=json`;
    }
    if (type === 2) {
      targeturl = `${API_URL}/churn/last/?format=json`;
    }
    if (type === 3) {
      targeturl = `${API_URL}/churn/flow/?format=json`;
    }
    const instance = {
      headers: {
        token: localStorage.getItem('userToken'),
      },
    };
    return axios({
      method: 'get',
      url: targeturl,
      params: { space_id: 3 },
      headers: instance.headers,
    })
    .then((res) => {
      this.setState({
        data: res.data,
        type,
      });
      console.log(this)
    });
  }


  render() {
    return (
      <div className="ChurnTabs">
        <Tabs onSelect={this.handleTabClick}>
          <TabList>
            <Tab>비교분석</Tab>
            <Tab>이번달</Tab>
            <Tab>지난달</Tab>
            <Tab>이탈흐름분석</Tab>
          </TabList>
          <TabPanel>
            <ChurnReport className="ChurnReport" data={this.state.data} type={this.state.type_mapper[this.state.type]} wait={500} />
          </TabPanel>
          <TabPanel>
            <ChurnReport className="ChurnReport" data={this.state.data} type={this.state.type_mapper[this.state.type]} wait={500} />
          </TabPanel>
          <TabPanel>
            <ChurnReport className="ChurnReport" data={this.state.data} type={this.state.type_mapper[this.state.type]} wait={500} />
          </TabPanel>
          <TabPanel>
            <ChurnReport className="ChurnReport" data={this.state.data} type={this.state.type_mapper[this.state.type]} wait={500} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default ChurnPage;
