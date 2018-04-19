import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import {
  Tabs,
} from 'antd';

import PageHeader from 'components/PageHeader';
import SearchBar from './../components/SearchBar';

import styles from './index.less';

const { TabPane } = Tabs;

@connect(({ score, loading }) => ({
  score,
  loading: loading.effects['chart/fetch'],
}))
export default class Index extends Component {
  state = {};

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

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  /**
   * 部门选择回调事件
   */
  departmentSelect = (val) => {
    console.log(val);
  }

  /**
   * 时间周期选择回调事件
   * @param ids
   */
  periodSelect = (ids) => {
    console.log(ids);
  }

  render() {
    const { score } = this.props;

    // 综合阿米巴和文化数据
    const amoebasCultureData = [];

    if (score.amoebas.length) {
      for (let i = 0; i < score.amoebas.length; i += 1) {
        const temp = amoebasCultureData.filter((item) => {
          return score.amoebas[i].periodId === item.periodId;
        });
        if (temp.length === 0) {
          const tempAmoebas = score.amoebas.filter((item) => {
            return score.amoebas[i].periodId === item.periodId;
          });
          const tempCulture = score.culture.filter((item) => {
            return score.amoebas[i].periodId === item.periodId;
          });
          const tempData = [];
          if (tempCulture.length && tempAmoebas.length) {
            for (let j = 0; j < tempAmoebas.length && j < tempCulture.length; j += 1) {
              tempData.push({
                name: tempAmoebas[j].departmentName,
                amoeba_score: tempAmoebas[j].perIncomeRatio,
                amoeba_weight: 1,
                culture_weight: 1,
                departmentType: tempAmoebas[j].departmentType,
                culture: tempCulture[j].cultureScore,
                total: 0.44,
              });
            }
            amoebasCultureData.push({
              dateLabel: '2015上半年',
              data: tempData,
            });
          }
        }
      }
    }

    return (
      <Fragment>
        <PageHeader key="pageheader" linkElement={Link} bodyStyle={{ background: 'rgba(255, 255, 255, 0)', padding: 0 }} />

        <SearchBar onPeriodSelect={this.periodSelect} onDepartmentSelect={this.departmentSelect} />

        <div className={styles.tabCard}>
          <Tabs type="card">
            <TabPane tab="Total" key="income">
              <div className={styles.tabContent}>总收入</div>
            </TabPane>
            <TabPane tab="Decompose" key="profit">
              <div className={styles.tabContent}>总利润</div>
            </TabPane>
            <TabPane tab="Total" key="income_average">
              <div className={styles.tabContent}>人均收入</div>
            </TabPane>
            <TabPane tab="Decompose" key="profit_average">
              <div className={styles.tabContent}>人均利润</div>
            </TabPane>
            <TabPane tab="Total" key="cost">
              <div className={styles.tabContent}>总成本</div>
            </TabPane>
            <TabPane tab="Decompose" key="cost_average">
              <div className={styles.tabContent}>人均成本</div>
            </TabPane>
          </Tabs>
        </div>
      </Fragment>
    );
  }
}
