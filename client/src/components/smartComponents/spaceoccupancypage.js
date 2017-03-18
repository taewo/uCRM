import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import SpaceOccupancyReport from './spaceoccupancyreport';
import SpaceOccupancyTable from './spaceoccupancytable';


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
    };
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentDidMount() {
    this.getData(0);
    this.getData(1);
    this.getData(2);
  }

  getData(type) {
    const API_URL = 'http://localhost:8000/api';
    let targeturl = `${API_URL}/space/year/?format=json`;
    if (type === 0) {
      targeturl = `${API_URL}/space/year/?format=json`;
    }
    if (type === 1) {
      targeturl = `${API_URL}/space/billing-this/?format=json`;
    }
    if (type === 2) {
      targeturl = `${API_URL}/space/week/?format=json`;
    }
    const instance = {
      headers: {
        token: localStorage.getItem('userToken'),
      },
    };
    return axios({
      method: 'get',
      url: targeturl,
      params: { space_id: localStorage.getItem('userSpaceListId') },
      headers: instance.headers,
    })
    .then((res) => {
      if (type === 0) {
        this.setState({
          flowChartData: res.data,
        });
      } else if (type === 1) {
        this.setState({
          billingData: res.data,
        });
      } else if (type === 2) {
        this.setState({
          recentData: res.data,
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
      <div className="SpaceOccupancyTabs">
        <Tabs onSelect={this.handleTabClick}>
          <TabList>
            <Tab>이용률흐름분석</Tab>
            <Tab>요금제별분석</Tab>
            <Tab>최근이용률</Tab>
          </TabList>
          <TabPanel>
            <SpaceOccupancyReport className="SpaceOccupancyReport" data={this.state.flowChartData} type={this.state.type_mapper[this.state.type]} />
            <SpaceOccupancyTable className="SpaceOccupancyTable" data={this.state.flowChartData} type={this.state.type_mapper[this.state.type]} />
          </TabPanel>
          <TabPanel>
            <SpaceOccupancyReport className="SpaceOccupancyReport" data={this.state.billingData} type={this.state.type_mapper[this.state.type]} />
            <SpaceOccupancyTable className="SpaceOccupancyTable" data={this.state.billingData} type={this.state.type_mapper[this.state.type]} />
          </TabPanel>
          <TabPanel>
            <SpaceOccupancyReport className="SpaceOccupancyReport" data={this.state.recentData} type={this.state.type_mapper[this.state.type]} />
            <SpaceOccupancyTable className="SpaceOccupancyTable" data={this.state.recentData} type={this.state.type_mapper[this.state.type]} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default SpaceOccupancyPage;
