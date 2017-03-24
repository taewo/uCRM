import { Component } from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class ReportTable extends Component {

  getDelta(thisData, lastData) {
    let delta = Math.round((thisData / lastData - 1) * 100);
    let change;
    if (!thisData || !lastData) {
      delta = 100;
    }
    if ((thisData - lastData) > 0) {
      change = '▲' + delta + '% 증가';
    } else if ((thisData - lastData) < 0) {
      change = '▼' + delta + '% 감소';
    } else {
      change = '-';
    }
    return change;
  }

  ToAccountingFormat(value) {
    value = value.toString();
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return '₩ ' + value;
  }

}

export default ReportTable;
