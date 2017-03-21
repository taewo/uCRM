import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import RevenueReport from './revenuereport';
import RevenueTable from './revenuetable';


class RevenuePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comparisonData: [],
      yearData: [],
      monthData: [],
      flowChartData: [],
      type_mapper: {
        0: '이번달이익요약분석',
        1: '이번달이익세부분석',
        2: '이익흐름분석',
        3: '요금제별연간이익분석',
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
    const API_URL = 'http://ec2-13-124-49-233.ap-northeast-2.compute.amazonaws.com:8000/api';
    let targeturl = `${API_URL}/revenue/flow/month/?format=json`;
    if (type === 1) {
      targeturl = `${API_URL}/revenue/billing/month/?format=json`;
    }
    if (type === 2) {
      targeturl = `${API_URL}/revenue/flow/year/?format=json`;
    }
    if (type === 3) {
      targeturl = `${API_URL}/revenue/billing/year/?format=json`;
    }
    const instance = {
      headers: {
        token: sessionStorage.getItem('userToken'),
      },
    };
    return axios({
      method: 'get',
      url: targeturl,
      params: { space_id: sessionStorage.getItem('userSpaceListId') },
      headers: instance.headers,
    })
    .then((res) => {
      if (type === 0) {
        this.setState({
          comparisonData: res.data,
        });
      } else if (type === 1) {
        this.setState({
          monthData: res.data,
        });
      } else if (type === 2) {
        this.setState({
          flowChartData: res.data,
        });
      } else if (type === 3) {
        this.setState({
          yearData: res.data,
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
      <div className="RevenueTabs">
        <Tabs onSelect={this.handleTabClick}>
          <TabList>
            <Tab>요약</Tab>
            <Tab>이번달 세부 분석</Tab>
            <Tab>연간 이익 흐름 분석</Tab>
            <Tab>요금제별 연간이익 분석</Tab>
          </TabList>
          <TabPanel>
            <RevenueReport className="RevenueReport" data={this.state.comparisonData} type={this.state.type_mapper[this.state.type]} />
            <RevenueTable className="RevenueTable" data={this.state.comparisonData} type={this.state.type_mapper[this.state.type]} />
          </TabPanel>
          <TabPanel>
            <RevenueReport className="RevenueReport" data={this.state.monthData} type={this.state.type_mapper[this.state.type]} />
            <RevenueTable className="RevenueTable" data={this.state.monthData} type={this.state.type_mapper[this.state.type]} />
          </TabPanel>
          <TabPanel>
            <RevenueReport className="RevenueReport" data={this.state.flowChartData} type={this.state.type_mapper[this.state.type]} />
            <RevenueTable className="RevenueTable" data={this.state.flowChartData} type={this.state.type_mapper[this.state.type]} />
          </TabPanel>
          <TabPanel>
            <RevenueReport className="RevenueReport" data={this.state.yearData} type={this.state.type_mapper[this.state.type]} />
            <RevenueTable className="RevenueTable" data={this.state.yearData} type={this.state.type_mapper[this.state.type]} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default RevenuePage;
