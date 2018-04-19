import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import {
  Card,
  Tabs,
} from 'antd';

import PageHeader from 'components/PageHeader';
import ScoreLine from 'components/ScoreLine';
import ScoreChart from 'components/ScoreChart';
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
    // 分为线模拟数据处理
    const data = [{
      departmentId: '0',
      departmentName: '人力资源中心-员工关怀部',
      accessScore: '0.9',
      decimalLine: '70',
    }, {
      departmentId: '1',
      departmentName: 'AI',
      accessScore: '0.8',
      decimalLine: '60',
    }, {
      departmentId: '2',
      departmentName: 'A',
      accessScore: '0.8',
      decimalLine: '70',
    }, {
      departmentId: '3',
      departmentName: '人力资源中心',
      accessScore: '0.7',
      decimalLine: '30',
    }, {
      departmentId: '4',
      departmentName: 'B',
      accessScore: '0.8',
      decimalLine: '70',
    }, {
      departmentId: '5',
      departmentName: 'C',
      accessScore: '0.8',
      decimalLine: '40',
    }, {
      departmentId: '6',
      departmentName: '特斯拉实验室',
      accessScore: '0.6',
      decimalLine: '70',
    }, {
      departmentId: '7',
      departmentName: 'D',
      accessScore: '0.8',
      decimalLine: '80',
    }, {
      departmentId: '8',
      departmentName: 'E',
      accessScore: '0.8',
      decimalLine: '10',
    }];
    const actives = ['0', '3', '6'];
    const mockData = [{
      date: '2015年上半年',
      data,
      actives,
    }, {
      date: '2015年下半年',
      data,
      actives,
    }, {
      date: '2015年下半年',
      data,
      actives,
    }, {
      date: '2015年下半年',
      data,
      actives,
    }, {
      date: '2015年下半年',
      data,
      actives,
    }, {
      date: '2015年下半年',
      data,
      actives,
    }];
    const scoreLineTh = [];
    const scoreLineTd = [];
    for (let i = 0; i < mockData.length; i += 1) {
      scoreLineTh.push(<th key={i} style={{ width: `${100 / mockData.length}%` }}>{mockData[i].date}</th>);
      scoreLineTd.push(
        <td key={i}>
          <ScoreLine
            className={styles.scoreLineInTd}
            scores={mockData[i].data}
            activeItems={mockData[i].actives}
          />
        </td>
      );
    }

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
            <TabPane tab="Total" key="Total">
              <div className={styles.tabContent}>
                <table className={styles.tableWrap}>
                  <thead>
                    <tr>
                      {scoreLineTh}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {scoreLineTd}
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabPane>
            <TabPane tab="Decompose" key="Decompose">
              <div className={styles.tabContent} id="scoreChart">
                {amoebasCultureData.length ? <ScoreChart totalData={amoebasCultureData} /> : ''}
              </div>
            </TabPane>
          </Tabs>
        </div>

        <Card className={styles.ruleCard} bordered={false}>
          <p className={styles.ruleTitle}>当前组织考核模式</p>
          <div className={styles.ruleBlock}>
            <p className={styles.ruleBlockTitle}>(一) 组织类型</p>
            <p className={styles.ruleDesc}>所有业务单位从两个维度分为两大类。</p>
            <p className={styles.ruleDesc}>1、从阿米巴的角度，分为阿米巴、成本中心；2、从性质来看，分为作战部门、支持部门。</p>
            <table className={styles.ruleTable} border={1} bordercolor="#fa6161">
              <thead>
                <tr>
                  <th>组织类型</th>
                  <th>作战部门</th>
                  <th>支持部门</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>非阿米巴组织</td>
                  <td>无</td>
                  <td><span className={styles.ruleRedMark}>A：</span>IT部、财务中心、人力资源中心薪酬绩效部、行政中心等</td>
                </tr>
                <tr>
                  <td>阿米巴组织</td>
                  <td><span className={styles.ruleRedMark}>B：</span>项目组、发行中心、研发美术工作室</td>
                  <td><span className={styles.ruleRedMark}>C：</span>客服部、运维部、平台部、质量部等</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.ruleBlock}>
            <p className={styles.ruleBlockTitle}>(二) 考核方式</p>
            <p className={styles.ruleList}>1、整体比例</p>
            <p className={styles.ruleListChild}>
              <span className={styles.ruleRedMark}>A：</span>100% people love考核
            </p>
            <p className={styles.ruleListChild}>
              <span className={styles.ruleRedMark}>B：</span>50%的阿米巴业绩、50%的people love考核
            </p>
            <p className={styles.ruleListChild}>
              <span className={styles.ruleRedMark}>C：</span>40%的阿米巴业绩、60%的people love考核
            </p>
            <p className={styles.ruleList}>2、细节处理</p>
            <p className={styles.ruleListChild}>
              入绝对值及增幅、利润绝对值及增幅;对作战部门与支持部门的考核，分类处理：
            </p>
            <table className={styles.ruleTable} border={1} bordercolor="#fa6161">
              <thead>
                <tr>
                  <th>差异点</th>
                  <th>作战部门</th>
                  <th>支持部门</th>
                  <th className={styles.longTh}>考虑点</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>系数比例</td>
                  <td>
                    <p>收入系数30%</p>
                    <p>利润系数70%</p>
                  </td>
                  <td>
                    <p>收入系数50%</p>
                    <p>利润系数50%</p>
                  </td>
                  <td className={styles.alignLefttTd}>
                    <p>1.作战部门对公司实际利润负责，利润重要性高于收入；</p>
                    <p>2.支持部门内部结算，且量级都不高，利润极易受到公司整体成本影响，收入利润五五开</p>
                  </td>
                </tr>
                <tr>
                  <td>增幅</td>
                  <td>总量增幅：总收入、总利润增幅</td>
                  <td>人均增幅：人均收入、人均利润增幅</td>
                  <td className={styles.alignLefttTd}>
                    <p>1.作战部门不控制人数，对公司的贡献来源于总量的增加；</p>
                    <p>2.支持部门大多使用计件、一口价的方式内部结算，受人数影响收入，不能只看收入总量的增长。</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </Fragment>
    );
  }
}
