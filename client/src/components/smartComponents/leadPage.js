import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import LeadReport from './leadReport';
import LeadTable from './leadTable';


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
      `${API_URL}/lead/details/?format=json`,
      `${API_URL}/lead/year/?format=json`,
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
        detailData,
        flowChartData,
      ] = results;
      this.setState({
        detailData,
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
      detailData,
      flowChartData,
      isLoading,
    } = this.state;
    const dataList = [
      detailData,
      detailData,
      flowChartData,
    ];
    console.log(dataList);
    const tabPanels =
    !isLoading
    ? dataList.map(data => (
      <TabPanel>
        <LeadReport
          className="LeadReport"
          data={data}
          type={this.state.type_mapper[this.state.type]}
        />
        <LeadTable
          className="LeadTable"
          data={data}
          type={this.state.type_mapper[this.state.type]}
        />
      </TabPanel>
    ))
    : false;
    return (
      <div className="LeadTabs">
        <Tabs onSelect={this.handleTabClick}>
          <TabList>
            <Tab>요약</Tab>
            <Tab>채널별비교</Tab>
            <Tab>잠재고객흐름분석</Tab>
          </TabList>
          {tabPanels}
        </Tabs>
      </div>
    );
  }
}

export default LeadPage;
