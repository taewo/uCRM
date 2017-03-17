import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ChurnReport from './churnreport';
import ChurnTable from './churntable';


class ChurnPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      thisMonthData: {},
      lastMonthData: {},
      comparisonData: {},
      flowChartData: {},
      type_mapper: {
        0: '비교분석',
        1: '이번달',
        2: '지난달',
        3: '이탈흐름분석',
      },
      type: 0,
    };
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentDidMount() {
    this.getData(0);
    this.getData(1);
    this.getData(2);
    this.getData(3);
  }

  getData(type) {
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
      if (type === 0) {
        this.setState({
          comparisonData: res.data,
        });
      } else if (type === 1) {
        this.setState({
          thisMonthData: res.data,
        });
      } else if (type === 2) {
        this.setState({
          lastMonthData: res.data,
        });
      } else if (type === 3) {
        this.setState({
          flowChartData: res.data,
        });
      }
    });
  }

  handleTabClick(value) {
    this.setState({
      type: value,
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
            <ChurnReport className="ChurnReport" data={this.state.comparisonData} type={this.state.type_mapper[this.state.type]} />
            <ChurnTable className="ChurnTable" data={this.state.comparisonData} type={this.state.type_mapper[this.state.type]} />
          </TabPanel>
          <TabPanel>
            <ChurnReport className="ChurnReport" data={this.state.thisMonthData} type={this.state.type_mapper[this.state.type]} />
            <ChurnTable className="ChurnTable" data={this.state.thisMonthData} type={this.state.type_mapper[this.state.type]} />
          </TabPanel>
          <TabPanel>
            <ChurnReport className="ChurnReport" data={this.state.lastMonthData} type={this.state.type_mapper[this.state.type]} />
            <ChurnTable className="ChurnTable" data={this.state.lastMonthData} type={this.state.type_mapper[this.state.type]} />
          </TabPanel>
          <TabPanel>
            <ChurnReport className="ChurnReport" data={this.state.flowChartData} type={this.state.type_mapper[this.state.type]} />
            <ChurnTable className="ChurnTable" data={this.state.flowChartData} type={this.state.type_mapper[this.state.type]} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default ChurnPage;
