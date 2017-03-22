import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ChurnReport from './churnReport';
import ChurnTable from './churnTable';


class ChurnPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      thisMonthData: [],
      lastMonthData: [],
      comparisonData: [],
      flowChartData: [],
      type_mapper: {
        0: '비교분석',
        1: '이번달',
        2: '지난달',
        3: '이탈흐름분석',
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
      `${API_URL}/churn/compare/?format=json`,
      `${API_URL}/churn/this/?format=json`,
      `${API_URL}/churn/last/?format=json`,
      `${API_URL}/churn/flow/?format=json`,
    ];
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
      console.log('hi');
      const [
        comparisonData,
        thisMonthData,
        lastMonthData,
        flowChartData,
      ] = results;
      this.setState({
        comparisonData,
        thisMonthData,
        lastMonthData,
        flowChartData,
        isLoading: false,
      });
    })
    .catch((err) => {
      console.log(err);
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
      thisMonthData,
      lastMonthData,
      flowChartData,
      isLoading,
    } = this.state;
    console.log(this.state);
    const dataList = [
      comparisonData,
      thisMonthData,
      lastMonthData,
      flowChartData,
    ];
    const tabPanels =
    !isLoading
    ? dataList.map(data => (
      <TabPanel>
        <ChurnReport
          className="ChurnReport"
          data={data}
          type={this.state.type_mapper[this.state.type]}
        />
        <ChurnTable
          className="ChurnTable"
          data={data}
          type={this.state.type_mapper[this.state.type]}
        />
      </TabPanel>
    ))
    : false;
    return (
      <div className="ChurnTabs">
        <Tabs onSelect={this.handleTabClick}>
          <TabList>
            <Tab>비교분석</Tab>
            <Tab>이번달</Tab>
            <Tab>지난달</Tab>
            <Tab>이탈흐름분석</Tab>
          </TabList>
          {tabPanels}
        </Tabs>
      </div>
    );
  }
}

export default ChurnPage;
