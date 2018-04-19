import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
// import ScoreLine from 'components/ScoreLine';
import PeriodSelector from 'components/PeriodSelector';

import styles from './index.less';

@connect(({ score, loading }) => ({
  score,
  loading: loading.effects['chart/fetch'],
}))
export default class Index extends Component {
  state = {};

  componentDidMount() {
    this.props.dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  /**
   * 选中周期后的回调
   * @param ids 选择的周期段id 类型：Array
   */
  onSelect = (ids) => {
    console.log(ids);
  }

  render() {
    // const mockData = [{
    //   departmentId: '0',
    //   departmentName: '研发美术工作室',
    //   accessScore: '0.9',
    // }, {
    //   departmentId: '1',
    //   departmentName: 'AI',
    //   accessScore: '0.8',
    // }, {
    //   departmentId: '2',
    //   departmentName: 'A',
    //   accessScore: '0.8',
    // }, {
    //   departmentId: '3',
    //   departmentName: '人力资源中心',
    //   accessScore: '0.7',
    // }, {
    //   departmentId: '4',
    //   departmentName: 'B',
    //   accessScore: '0.8',
    // }, {
    //   departmentId: '5',
    //   departmentName: 'C',
    //   accessScore: '0.8',
    // }, {
    //   departmentId: '6',
    //   departmentName: '特斯拉实验室',
    //   accessScore: '0.6',
    // }, {
    //   departmentId: '7',
    //   departmentName: 'D',
    //   accessScore: '0.8',
    // }, {
    //   departmentId: '8',
    //   departmentName: 'E',
    //   accessScore: '0.8',
    // }];
    // const actives = ['0', '3', '6'];
    const period = [
      {
        id: 6,
        startDate: '2014-01-01',
        endDate: '2014-06-30',
        lock: true,
        createdAt: '2018-03-01T03:06:33.000Z',
        updatedAt: '2018-03-15T08:06:04.000Z',
      },
      {
        id: 7,
        startDate: '2014-07-01',
        endDate: '2014-12-31',
        lock: true,
        createdAt: '2018-03-01T03:06:33.000Z',
        updatedAt: '2018-03-15T08:06:04.000Z',
      },
      {
        id: 9,
        startDate: '2015-07-01',
        endDate: '2015-12-31',
        lock: true,
        createdAt: '2018-03-01T03:06:33.000Z',
        updatedAt: '2018-03-15T08:06:04.000Z',
      },
      {
        id: 10,
        startDate: '2015-01-01',
        endDate: '2015-06-30',
        lock: true,
        createdAt: '2018-03-01T03:06:33.000Z',
        updatedAt: '2018-03-15T08:06:04.000Z',
      },
      {
        id: 8,
        startDate: '2016-01-01',
        endDate: '2016-06-30',
        lock: true,
        createdAt: '2018-03-01T03:06:33.000Z',
        updatedAt: '2018-03-15T08:06:04.000Z',
      },
      {
        id: 11,
        startDate: '2016-07-01',
        endDate: '2016-12-31',
        lock: true,
        createdAt: '2018-03-01T03:06:33.000Z',
        updatedAt: '2018-03-15T08:06:04.000Z',
      },
      {
        id: 12,
        startDate: '2017-01-01',
        endDate: '2017-06-30',
        lock: true,
        createdAt: '2018-03-01T03:06:33.000Z',
        updatedAt: '2018-03-15T08:06:04.000Z',
      },
      {
        id: 1,
        startDate: '2017-07-01',
        endDate: '2017-12-31',
        lock: true,
        createdAt: '2018-03-01T03:06:33.000Z',
        updatedAt: '2018-03-15T08:06:04.000Z',
      },
      {
        id: 14,
        startDate: '2018-01-01',
        endDate: '2018-06-30',
        lock: true,
        createdAt: '2018-03-02T02:51:39.000Z',
        updatedAt: '2018-03-15T08:08:54.000Z',
      },
      {
        id: 13,
        startDate: '2018-07-01',
        endDate: '2018-12-31',
        lock: true,
        createdAt: '2018-03-02T02:51:39.000Z',
        updatedAt: '2018-03-15T08:08:54.000Z',
      },
    ];

    return (
      <Fragment>
        <div className={styles.test}>
          <div className={styles.layout}>
            <PeriodSelector data={period} onSelect={this.onSelect} />
          </div>
        </div>
      </Fragment>
    );
  }
}
