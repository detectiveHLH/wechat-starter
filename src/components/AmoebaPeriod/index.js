import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as d3 from 'd3/d3';
import './index.less';

export default class AmoebaPeriod extends Component {
  static defaultProps = {
    className: '',
    totalData: [],
  };

  static propTypes = {
    className: PropTypes.string,
    totalData: PropTypes.array,
  };
  state = {};

  componentDidMount() {
    // 数据集合
    const data = [];
    // 部门名称集合
    const departmentNames = [];
    // 每个周期展示月份的数量
    let monthNum = 6;
    // 展示部门数量
    let departmentNum = 0;
    // 展示周期数
    const periodNum = this.props.totalData.length;

    this.props.totalData.map((v1) => {
      departmentNum = v1.data.length;
      v1.data.map((v2) => {
        departmentNames.push(v2.name);
        monthNum = v2.amoebaScores.length;
        v2.amoebaScores.map((v3) => {
          data.push(v3);
          return false;
        });
        return false;
      });
      return false;
    });

    // 画布大小
    const width = (((25 + (15 * monthNum)) * departmentNum) + 25) * periodNum;
    const height = 400;
    // 添加一个 SVG 画布
    const svg = d3.select('.scoreChart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    // 画布周边的空白
    const padding = { left: 30, right: 30, top: 20, bottom: 20 };

    // 定义一个数组
    const dataset = {
      x: departmentNames,
      y: data,
    };

    // x轴显示部门数
    const scoreNum = [];
    departmentNames.map((v, k) => {
      scoreNum.push(k);
      return false;
    });

    // x轴的比例尺
    // d3.scale.ordinal 构造一个序数的比例尺
    const xScale = d3.scale.ordinal()
    // ordinal.range 取得或设置比例尺的值域
      .domain(scoreNum)
      // 为离散的块划分连续的值域
      .rangeRoundBands([0, width]);

    // y轴的比例尺
    const yScale = d3.scale.linear()
    // linear.domain 取得或设置比例尺的定义域
      .domain([0, d3.max(dataset.y)])
      // linear.range 取得或设置比例尺的输出范围 因为y轴正是从上到下的 所以range是反的
      .range([height - padding.top - padding.bottom, 0]);

    // 定义x轴
    const xAxis = d3.svg.axis()
      .scale(xScale)
      .tickFormat((d, i) => {
        // 按索引值重新获取原始数据并赋给x轴
        return departmentNames[i];
      })
      .orient('bottom');

    // 添加矩形元素
    svg.selectAll('.MyRect')
      .data(dataset.y)
      .enter()
      .append('rect')
      .attr('class', 'MyRect')
      .attr('transform', `translate(${padding.left}, ${padding.top}`)
      .attr('x', (d, i) => {
        // 每个柱状条的左下角的x的坐标
        return 25 + (15 * i) + (25 * Math.floor(i / monthNum))
          + (25 * Math.floor(i / monthNum / departmentNum));
      })
      .attr('y', (d) => {
        return yScale(d);
      })
      .attr('fill', (d, i) => {
        if (Math.floor((i - (Math.floor(i / monthNum / departmentNum)
            * monthNum * departmentNum)) / monthNum) === 0) {
          return '#58bbd7';
        } else if (Math.floor((i - (Math.floor(i / monthNum / departmentNum)
            * monthNum * departmentNum)) / monthNum) === 1) {
          return '#6678c8';
        } else if (Math.floor((i - (Math.floor(i / monthNum / departmentNum)
            * monthNum * departmentNum)) / monthNum) === 2) {
          return '#8666c8';
        } else if (Math.floor((i - (Math.floor(i / monthNum / departmentNum)
            * monthNum * departmentNum)) / monthNum) === 3) {
          return '#b666c8';
        } else if (Math.floor((i - (Math.floor(i / monthNum / departmentNum)
            * monthNum * departmentNum)) / monthNum) === 4) {
          return '#de63a9';
        } else if (Math.floor((i - (Math.floor(i / monthNum / departmentNum)
            * monthNum * departmentNum)) / monthNum) === 5) {
          return '#e14a66';
        } else if (Math.floor((i - (Math.floor(i / monthNum / departmentNum)
            * monthNum * departmentNum)) / monthNum) === 6) {
          return '#df7452';
        } else if (Math.floor((i - (Math.floor(i / monthNum / departmentNum)
            * monthNum * departmentNum)) / monthNum) === 7) {
          return '#df9f52';
        } else if (Math.floor((i - (Math.floor(i / monthNum / departmentNum)
            * monthNum * departmentNum)) / monthNum) === 8) {
          return '#e5c94b';
        } else if (Math.floor((i - (Math.floor(i / monthNum / departmentNum)
            * monthNum * departmentNum)) / monthNum) === 9) {
          return '#58bbd7';
        }
      })
      // ordinal.rangeBand 为离散的块划分连续的值域
      .attr('width', 14.5)
      .attr('height', (d) => {
        return height - padding.top - padding.bottom - yScale(d);
      });

    // 添加文字元素
    svg.selectAll('.MyText')
      .data(dataset.y)
      .enter()
      .append('text')
      .attr('class', 'MyText')
      .attr('transform', `translate(${padding.left}, ${padding.top})`)
      .attr('x', (d, i) => {
        return 25 + (15 * i) + (25 * Math.floor(i / monthNum))
          + (25 * Math.floor(i / monthNum / departmentNum));
      })
      .attr('y', (d) => {
        return yScale(d);
      })
      .attr('dx', () => {
        return 0;
      })
      .attr('dy', () => {
        return -5;
      })
      // 取得或设置文本内容
      .text((d) => {
        return d;
      });

    // 添加x轴
    // selection 创建并追加一个新元素
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${padding.left}, ${(height - padding.bottom)})`)
      // 为当前选择调用一个函数
      .call(xAxis);

    // 添加y轴
    svg.append('g')
      .attr('class', 'axis y')
      .attr('transform', `translate(${padding.left}, ${padding.top})`);

    d3.selectAll('.tick')
      .attr('transform', (i) => {
        if (i < departmentNum * periodNum) {
          const xPosition = 25 + (((monthNum / 2) +
            (monthNum * i)) * 15) + (25 * i) + (25 * Math.floor(i / 3));
          return `translate(${xPosition}, 0)`;
        }
      });
  }

  render() {
    const { className } = this.props;

    return (
      <div className={classNames(className)} style={{ background: '#ffffff', position: 'relative' }}>
        <div className="scoreChart" />
      </div>
    );
  }
}
