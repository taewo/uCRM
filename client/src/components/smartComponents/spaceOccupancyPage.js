import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import SpaceOccupancyReport from './spaceOccupancyReport';
import SpaceOccupancyTable from './spaceOccupancyTable';


class SpaceOccupancyPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      billingData: [],
      flowChartData: [],
      recentData: [],
      type_mapper: {
        0: '이용률흐름분석',
        1: '요금제별분석',
        2: '최근이용률',
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
      `${API_URL}/space/year/?format=json`,
      `${API_URL}/space/billing-this/?format=json`,
      `${API_URL}/space/week/?format=json`,
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
      const [
        flowChartData,
        billingData,
        recentData,
      ] = results;
      this.setState({
        flowChartData,
        billingData,
        recentData,
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
      flowChartData,
      billingData,
      recentData,
      isLoading,
    } = this.state;
    const dataList = [
      flowChartData,
      billingData,
      recentData,
    ];
    const tabPanels =
    !isLoading
    ? dataList.map(data => (
      <TabPanel>
        <SpaceOccupancyReport
          className="SpaceOccupancyReport"
          data={data}
          type={this.state.type_mapper[this.state.type]}
        />
        <SpaceOccupancyTable
          className="SpaceOccupancyTable"
          data={data}
          type={this.state.type_mapper[this.state.type]}
        />
      </TabPanel>
    ))
    : false;
    return (
      <div className="SpaceOccupancyTabs">
        <Tabs onSelect={this.handleTabClick}>
          <TabList>
            <Tab>이용률흐름분석</Tab>
            <Tab>요금제별분석</Tab>
            <Tab>최근이용률</Tab>
          </TabList>
          {tabPanels}
        </Tabs>
      </div>
    );
  }
}

export default SpaceOccupancyPage;
