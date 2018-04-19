import React, { Component } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  Card,
} from 'antd';

import TileDropdown from 'components/TileDropdown';
import PeriodSelector from 'components/PeriodSelector';

import styles from './index.less';


@connect(({ score, loading }) => ({
  score,
  loading: loading.effects['chart/fetch'],
}))
export default class SearchBar extends Component {
  static defaultProps = {
    className: '',
  };

  static propTypes = {
    className: PropTypes.string,
    onDepartmentSelect: PropTypes.func.isRequired,
    onPeriodSelect: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'score/fetchDepartments',
    });
    this.props.dispatch({
      type: 'score/fetchAmoebas',
    });
    this.props.dispatch({
      type: 'score/fetchCulture',
    });
  }

  /**
   * 处理获取到部门列表信息为下来列表的格式
   * @param treeData
   * @param resData
   */
  formatDeparmentsData = (treeData) => {
    const resData = [];
    treeData.forEach((item) => {
      const res = {
        label: item.name,
        value: item.name,
        key: item.id,
        children: [],
      };
      if (item.children && item.children.length) {
        res.children = this.formatDeparmentsData(item.children);
      }
      resData.push(res);
    });
    return resData;
  }

  /**
   * 平铺数据
   */
  flatterData = (data, layer) => {
    let res = [];
    data.forEach((item) => {
      res.push({
        label: item.label,
        key: item.key,
        layer,
      });
      if (item.children && item.children.length) {
        res = res.concat(this.flatterData(item.children, layer + 1));
      }
    });
    return res;
  }

  render() {
    const { score, className } = this.props;

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

    // 部门下拉框的模拟数据处理
    const treeData = this.formatDeparmentsData(score.deparments);
    const tileData = this.flatterData(treeData, 0);

    return (
      <Card bordered={false} className={classNames(className, styles.filterCard)}>
        <TileDropdown
          data={tileData}
          className={styles.departmentFilter}
          placeholder="请选择部门"
          searchEnter={this.props.onDepartmentSelect}
        />
        <PeriodSelector
          className={styles.dateFilter}
          data={period}
          onSelect={this.props.onPeriodSelect}
        />
      </Card>
    );
  }
}
