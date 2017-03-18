import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import LeadReport from './leadreport';
import LeadTable from './leadtable';


class LeadPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      detailData: [],
      flowChartData: [],
      type_mapper: {
        0: '요약',
        1: '채널별비교',
        2: '잠재고객흐름분석',
      },
      type: 0,
    };
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentDidMount() {
    this.getData(0);
    this.getData(2);
  }

  getData(type) {
    const API_URL = 'http://localhost:8000/api';
    let targeturl = `${API_URL}/lead/details/?format=json`;
    if (type === 0) {
      targeturl = `${API_URL}/lead/details/?format=json`;
    }
    if (type === 2) {
      targeturl = `${API_URL}/lead/year/?format=json`;
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
          detailData: res.data,
        });
      } else if (type === 2) {
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
      <div className="LeadTabs">
        <Tabs onSelect={this.handleTabClick}>
          <TabList>
            <Tab>요약</Tab>
            <Tab>채널별비교</Tab>
            <Tab>잠재고객흐름분석</Tab>
          </TabList>
          <TabPanel>
            <LeadReport className="LeadReport" data={this.state.detailData} type={this.state.type_mapper[this.state.type]} />
            <LeadTable className="LeadTable" data={this.state.detailData} type={this.state.type_mapper[this.state.type]} />
          </TabPanel>
          <TabPanel>
            <LeadReport className="LeadReport" data={this.state.detailData} type={this.state.type_mapper[this.state.type]} />
            <LeadTable className="LeadTable" data={this.state.detailData} type={this.state.type_mapper[this.state.type]} />
          </TabPanel>
          <TabPanel>
            <LeadReport className="LeadReport" data={this.state.flowChartData} type={this.state.type_mapper[this.state.type]} />
            <LeadTable className="LeadTable" data={this.state.flowChartData} type={this.state.type_mapper[this.state.type]} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default LeadPage;
