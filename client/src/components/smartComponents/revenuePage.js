import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import RevenueReport from './revenueReport';
import RevenueTable from './revenueTable';


class RevenuePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comparisonData: [],
      monthData: [],
      flowChartData: [],
      yearData: [],
      type_mapper: {
        0: '이번달이익요약분석',
        1: '이번달이익세부분석',
        2: '이익흐름분석',
        3: '요금제별연간이익분석',
      },
      type: 0,
      isLoading: true,
    };
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const API_URL = 'http://ec2-13-124-49-233.ap-northeast-2.compute.amazonaws.com:8000/api';
    const urls = [
      `${API_URL}/revenue/flow/month/?format=json`,
      `${API_URL}/revenue/billing/month/?format=json`,
      `${API_URL}/revenue/flow/year/?format=json`,
      `${API_URL}/revenue/billing/year/?format=json`,
    ]
    const instance = {
      headers: {
        token: sessionStorage.getItem('userToken'),
      },
    };
    const promises = urls.map(url => axios({
      method: 'get',
      url,
      params: { space_id: sessionStorage.getItem('userSpaceListId') },
      headers: instance.headers,
    }));
    return Promise.all(promises)
    .then(responses => responses.map(response => response.data))
    .then((results) => {
      const [
        comparisonData,
        monthData,
        flowChartData,
        yearData,
      ] = results;
      this.setState({
        comparisonData,
        monthData,
        flowChartData,
        yearData,
        isLoading: false,
      });
    })
    .catch((err) => {
      this.setState({
        isLoading: false,
      });
      throw err;
    });
  }

  handleTabClick(value) {
    this.setState({
      type: value,
    });
  }

  render() {
    const {
      comparisonData,
      monthData,
      flowChartData,
      yearData,
      isLoading,
    } = this.state;
    const dataList = [
      comparisonData,
      monthData,
      flowChartData,
      yearData,
    ];
    const tabPanels =
    !isLoading
    ? dataList.map(data => (
      <TabPanel>
        <RevenueReport
          className="RevenueReport"
          data={data}
          type={this.state.type_mapper[this.state.type]}
        />
        <RevenueTable
          className="RevenueTable"
          data={data}
          type={this.state.type_mapper[this.state.type]}
        />
      </TabPanel>
    ))
    : false;
    return (
      <div className="RevenueTabs">
        <Tabs onSelect={this.handleTabClick}>
          <TabList>
            <Tab>요약</Tab>
            <Tab>이번달 세부 분석</Tab>
            <Tab>연간 이익 흐름 분석</Tab>
            <Tab>요금제별 연간이익 분석</Tab>
          </TabList>
          {tabPanels}
        </Tabs>
      </div>
    );
  }
}

export default RevenuePage;
