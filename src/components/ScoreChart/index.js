import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as d3 from 'd3/d3';
import styles from './index.less';

export default class ScoreChartItem extends Component {
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
    // 部门名集合
    const departmentName = [];
    // 分数集合
    const scoreData = [];

    // 阿米巴总分集合
    const totalAmoebaScore = [];
    // 文化总分集合
    const totalwenhua = [];
    // 部门类型集合
    const totalbumenleixing = [];
    // 阿米巴权重集合
    const totalamibaquanzhong = [];
    // 文化权重集合
    const totalwenhuaquanzhong = [];
    // 总分集合
    const totalzongfen = [];

    this.props.totalData.map((v1) => {
      scoreData.push(v1.data);
      return false;
    });
    // 分数集合
    const scoreArray = [];

    scoreData.map((v1) => {
      v1.map((v2) => {
        scoreArray.push(v2.amoeba_score);
        scoreArray.push(v2.culture);
        departmentName.push(v2.name);
        totalAmoebaScore.push(v2.amoeba_score);
        totalwenhua.push(v2.culture);
        totalbumenleixing.push(v2.departmentType);
        totalamibaquanzhong.push(v2.amoeba_weight);
        totalwenhuaquanzhong.push(v2.culture_weight);
        totalzongfen.push(v2.total);
        return false;
      });
      return false;
    });

    const data = [
      totalAmoebaScore,
      totalwenhua,
    ];

    // 数据中的最大数
    const maxData = d3.max(scoreArray);
    // 数据中的最小数
    let minData = d3.min(scoreArray);
    minData = minData > 0 ? 0 : minData;

    // 设置svg变量和宽高
    const margin = {
      top: 20,
      right: 30,
      bottom: 30,
      left: 40,
    };
    const width = (70 + (2 * scoreData[0].length * 30) +
      ((scoreData[0].length) * 17)) * scoreData.length;
    const height = 400 - margin.top - margin.bottom;

    // 创建画布svg并且设置宽高
    const svg = d3.select('.scoreChart').append('svg')
      .attr('width', width)
      .attr('height', height + margin.top + margin.bottom)
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // 设置y轴的比例尺
    // d3.scale.linear 构建一个线性定量比例尺
    const yScale = d3.scale.linear()
    // linear.domain 取得或设置比例尺的定义域
      .domain([minData, maxData])
      // linear.range 取得或设置比例尺的输出范围
      .range([0, height]);

    const yScale1 = d3.scale.linear()
    // linear.domain 取得或设置比例尺的定义域
      .domain([minData, maxData])
      // linear.range 取得或设置比例尺的输出范围
      .range([height, 0]);

    // 设置X轴的比例尺
    const xScale0 = d3.scale.ordinal()
    // ordinal.domain 取得或设置比例尺的输入域
      .domain(scoreArray)
      // ordinal.rangeBands 指定输出范围为连续区间
      .rangeBands([0, width], 0.2);

    // x轴坐标轴
    const xAxis = d3.svg.axis()
    // axis.scale 设置或者获取比例尺
      .scale(xScale0)
      // axis.tickFormat 重载标签的刻度格式化
      .tickFormat((d, i) => {
        // 按索引值重新获取原始数据并赋给x轴
        return departmentName[i];
      })
      // axis.orient 设置或者取得轴的方向
      .orient('bottom');

    // x轴位置
    let axisPositionX;
    // 判断是否有负数
    if (minData < 0 && maxData > 0) {
      axisPositionX = ((height / (maxData - minData)) * maxData) + margin.top;
    } else {
    // 最大值最小值都为正数
      axisPositionX = height + margin.top;
    }

    // 每对数组的最小值，用于设置文本位置
    const minArray = [];
    for (let i = 0; i < departmentName.length; i += 1) {
      minArray.push(data[0][i] < data[1][i] ? data[0][i] : data[1][i]);
    }

    // 添加一个y轴的分组标签
    svg.append('g')
      .attr('class', 'y axis');

    // 添加一个x轴到分组标签
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${axisPositionX})`)
      .call(xAxis);

    // 添加矩形
    svg.selectAll('MyRect')
      .data(scoreArray)
      .enter()
      .append('rect')
      .attr('width', 30)
      .attr('height', (d) => { return Math.abs(yScale(d) - ((height / (maxData - minData)) * (-minData))); })
      // 设置rect的x坐标
      .attr('x', (d, i) => {
        return 30 + (30 * i) + (17 * Math.floor(i / 2)) +
          (60 * Math.floor(i / 2 / scoreData[0].length));
      })
      .attr('y', (d) => {
        if (d > 0) {
          return (height - yScale(d)) + margin.top;
        } else {
          return ((height / (maxData - minData)) * maxData) + margin.top;
        }
      })
      .attr('fill', (d, i) => {
        if (i % 2 === 0) {
          return '#163f59';
        } else {
          return '#6495e8';
        }
      })
      .on('mouseover', (d, i) => {
        const el = document.getElementById('scoreChart');
        tooltip.html(`部门类型：&nbsp;&nbsp;&nbsp;&nbsp;${totalbumenleixing[Math.floor(i / 2)]}<br />
          阿米巴权重：${totalamibaquanzhong[Math.floor(i / 2)]}<br />
          文化权重：&nbsp;&nbsp;&nbsp;&nbsp;${totalwenhuaquanzhong[Math.floor(i / 2)]}<br />
          总分：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${totalzongfen[Math.floor(i / 2)]}`
        )
          // 通过 selection.html() 来更改提示框的文字
          .style('left', `${d3.mouse(el)[0]}px`)
          // 通过更改样式 left 和 top 来设定提示框的位置
          .style('top', `${d3.mouse(el)[1]}px`)
          // 设定提示框的透明度为0.9
          .style('opacity', 0.9);
      })
      .on('mousemove', () => {
        const el = document.getElementById('scoreChart');
        /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
        tooltip.style('left', `${d3.mouse(el)[0]}px`)
          .style('top', `${d3.mouse(el)[1]}px`)
          .style('opacity', 0.9);
      })
      .on('mouseout', () => {
        // 鼠标移出时，将透明度设定为0.0（完全透明）
        tooltip.style('opacity', 0.0);
      });

    // 添加文字元素
    svg.selectAll('.MyText1')
      .data(scoreArray)
      .enter()
      .append('text')
      .attr('class', 'MyText')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('x', (d, i) => {
        return (30 + (30 * i) + (17 * Math.floor(i / 2)) +
          (60 * Math.floor(i / 2 / scoreData[0].length))) - 6;
      })
      .attr('y', (d) => {
        if (d < 0) {
          return ((height / (maxData - minData)) * maxData) + margin.top;
        } else {
          return yScale1(d) + margin.top;
        }
      })
      .attr('dx', () => {
        return -30;
      })
      .attr('dy', () => {
        return -28;
      })
      // 取得或设置文本内容
      .text((d) => {
        return d;
      });

    d3.selectAll('.tick')
      .attr('transform', (d, i) => {
        const xPosition = 30 + (60 * i) + (17 * (i - Math.floor(i / scoreData[0].length)))
          + (77 * Math.floor(i / scoreData[0].length)) + 30;
        return `translate(${xPosition}, 0)`;
      });

    // 设置x轴文本位置
    d3.selectAll('.tick text')
      .attr('y', (d, i) => {
        if (minData <= 0) {
          if (minArray[i] < 0) {
            return 9 + Math.abs(yScale(minArray[i]) -
              ((height / (maxData - minData)) * (-minData)));
          } else {
            return 9;
          }
        } else {
          return 9;
        }
      });

    // 添加文字提示框
    let tooltip = d3.select('.scoreChart')
      .append('div')
      .style('color', '#fff')
      .style('background-color', '#485465')
      .style('opacity', 0.0)
      .style('border-radius', '4px')
      .style('font-size', '11px')
      .style('position', 'absolute')
      .style('padding', '8px 7px 8px 10px');
  }

  render() {
    const { className } = this.props;
    const dashPartList = [];

    const scoreData = [];
    this.props.totalData.map((v1) => {
      scoreData.push(v1.data);
      return false;
    });

    const margin = {
      top: 20,
      right: 30,
      bottom: 30,
      left: 40,
    };
    const width = (70 + (2 * scoreData[0].length * 30) +
      ((scoreData[0].length) * 17)) * scoreData.length;
    // 表格虚线样式
    for (let i = 0; i < scoreData.length; i += 1) {
      const dashPartListWidth = `${60 + (17 * (scoreData[0].length)) + (60 * scoreData[0].length)}px`;
      const lineLeft = (i === 0 ? null : <div className={styles.lineLeft} />);
      const lineRight = <div className={styles.lineRight} />;
      const dashItem = <div className={styles.dashItem} />;
      dashPartList.push(
        <div className={styles.titleItem} style={{ width: dashPartListWidth }} key={i}>
          {lineLeft}
          {this.props.totalData[i].dateLabel}
          {dashItem}
          {lineRight}
        </div>
      );
    }
    const dashWidth = width + margin.left + margin.right;

    return (
      <div className={classNames(className)} style={{ background: '#ffffff', position: 'relative' }}>
        {/* 虚线样式 */}
        <div className={styles.dash} style={{ width: dashWidth }}>
          {dashPartList}
        </div>
        <div className="scoreChart" />
      </div>
    );
  }
}
