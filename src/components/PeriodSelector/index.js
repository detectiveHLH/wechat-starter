import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover, Icon } from 'antd';
import classNames from 'classnames';
import PeriodItem from './PeriodItem';

import styles from './index.less';

export default class index extends Component {
  static defaultProps = {
    className: '',
    // 弹出层的位置
    placement: 'bottom',
    // 需要展示的所有的绩效周期数据
    data: [],
    // 确认选中周期时候的回调
    onSelect: () => {},
  };
  static propTypes = {
    className: PropTypes.string,
    // 弹出层的位置
    placement: PropTypes.string,
    // 需要展示的所有的绩效周期数据
    data: PropTypes.array,
    // 确认选中周期时候的回调
    onSelect: PropTypes.func,
  };

  state = {
    // 弹出层是否可见
    visible: false,
    // 起始时间
    startTime: '开始时间',
    // 结束时间
    endTime: '结束时间',
    // 当前的时间字体的颜色
    isActive: false,
    // 所有的月份组件数
    months: {},
    // 是否开始选择
    isStartSelect: false,
    // 是否结束选择
    isEndSelect: false,
    // 选择的开始周期数据
    startSelected: null,
    // 选择的结束周期数据
    endSelected: null,
    // 选中的数据
    selectedIds: [],
  };

  componentWillMount() {
    this.initMonthsState();
  }
  componentDidMount() {}
  componentWillUnmount() {}

  /**
   * 关闭选择器的回调
   */
  onClose = () => {
    const { onSelect } = this.props;
    const { selectedIds } = this.state;
    onSelect(selectedIds);
  }
  /**
   * 选中某个周期触发事件
   * @param key
   */
  onClick = (key) => {
    const { data } = this.props;
    const { isStartSelect, isEndSelect } = this.state;
    let { startSelected, endSelected } = this.state;
    if (!isStartSelect && !isEndSelect) {
      for (let i = 0; i < data.length; i += 1) {
        if (this.isInPeriod(data[i], key)) {
          this.changeClickStatus(data[i], true);
          startSelected = data[i];
          this.setState({ startSelected });
        }
      }
      // 选中一个周期
      this.setState({ isStartSelect: true, isEndSelect: false });
    } else if (isStartSelect && !isEndSelect) {
      for (let i = 0; i < data.length; i += 1) {
        if (this.isInPeriod(data[i], key)) {
          this.changeClickStatus(data[i], true);
          endSelected = data[i];
          this.setState({ endSelected });
        }
      }
      // 选中第二个周期
      this.setState({ isEndSelect: true, isStartSelect: false });
      this.clickTheOthers(key, endSelected);
    } else if (!isStartSelect && isEndSelect) {
      // 此时为重新回到选中一个周期的状态
      this.reset();
      for (let i = 0; i < data.length; i += 1) {
        if (this.isInPeriod(data[i], key)) {
          this.changeClickStatus(data[i], true);
          this.setState({ startSelected: data[i], endSelected: null });
        }
      }
      this.setState({ isStartSelect: true, isEndSelect: false });
    }
  }
  /**
   * 监听鼠标hover事件, 判断周期
   * @param key
   */
  onMouseOver = (key) => {
    const { data } = this.props;
    const { isStartSelect, isEndSelect } = this.state;
    if (isStartSelect && !isEndSelect) {
      // 正在选取第二个周期
      this.hoverTheOthers(key);
    } else {
      for (let i = 0; i < data.length; i += 1) {
        if (this.isInPeriod(data[i], key)) {
          this.changeHoverStatus(data[i], true);
        }
      }
    }
  }
  /**
   * 监听鼠标离开组件
   * @param key
   */
  onMouseLeave = (key) => {
    const { data } = this.props;
    for (let i = 0; i < data.length; i += 1) {
      if (this.isInPeriod(data[i], key)) {
        this.changeHoverStatus(data[i], false);
      }
    }
  }
  /**
   * 获取年限的列表
   * @param data 从后台取到的周期数据 Array
   * @return 年份数组 eg: [2016,2018]
   */
  getYearsList = (data) => {
    const arr = [];
    const len = data.length;
    for (let i = 0; i < len; i += 1) {
      const startDate = this.getYear(data[i].startDate);
      const endDate = this.getYear(data[i].endDate);
      arr.push(startDate, endDate);
    }
    return this.unique(arr).sort();
  }
  /**
   * 从时间里取出单独的年份
   * @param time eg: 2018-01-01
   * @return year eg: 2018
   */
  getYear = time => Number(time.split('-')[0]);
  /**
   * 从时间里取出单独的月份
   * @param time eg: 2018-01-01
   * @return month eg: 01
   */
  getMonth = time => Number(time.split('-')[1]);
  /**
   * 改变相关周期月份组件的状态为hover
   * @param period 周期数据 data中的子项
   * @param status 取值为 true|false
   */
  changeHoverStatus = (period, status) => {
    const { months } = this.state;
    const year = this.getYear(period.startDate);
    const startMonth = this.getMonth(period.startDate);
    const endMonth = this.getMonth(period.endDate);
    for (let i = startMonth; i <= endMonth; i += 1) {
      months[`${year}-${i}`].isHover = status;
    }
    this.setState({ months });
  }
  /**
   * 改变相关周期月份组件的状态为选中
   * @param period 周期数据 data中的子项
   * @param status 取值为 true|false
   */
  changeClickStatus = (period, status) => {
    const { months } = this.state;
    const year = this.getYear(period.startDate);
    const startMonth = this.getMonth(period.startDate);
    const endMonth = this.getMonth(period.endDate);
    for (let i = startMonth; i <= endMonth; i += 1) {
      months[`${year}-${i}`].isHover = false;
      months[`${year}-${i}`].isClicked = status;
    }
    this.setState({ months });
  }
  /**
   * 将日期转化为数字
   * @param date eg: 2018-01-01
   * @return date eg: 20180101
   */
  changeDateFromStringToNumber = date => Number(date.split('-').join(''));
  /**
   * 在模态层状态发生变化时触发函数，同时调用关闭时的回调函数
   * @param visible
   */
  handleVisibleChange = (visible) => {
    this.setState({ visible });
    this.onClose();
  }
  /**
   * 将当前选中周期到鼠标所指周期全部改成hover状态
   * @param key
   */
  hoverTheOthers = (key) => {
    const { data } = this.props;
    const { startSelected } = this.state;
    for (let i = 0; i < data.length; i += 1) {
      if (this.isInPeriod(data[i], key)) {
        for (let j = 0; j < data.length; j += 1) {
          let start = this.changeDateFromStringToNumber(startSelected.startDate);
          let end = this.changeDateFromStringToNumber(data[i].startDate);
          const curr = this.changeDateFromStringToNumber(data[j].startDate);
          if (start > end) {
            const temp = end;
            end = start;
            start = temp;
          }
          if (curr >= start && curr <= end) {
            this.changeHoverStatus(data[j], true);
          }
        }
      }
    }
  }
  /**
   * 将当前选中周期到鼠标所指周期全部改成click状态
   * @param key
   */
  clickTheOthers = (key, endSelected) => {
    const { data, onSelect } = this.props;
    const { startSelected, selectedIds } = this.state;
    let { startTime, endTime } = this.state;
    for (let i = 0; i < data.length; i += 1) {
      if (this.isInPeriod(data[i], key)) {
        for (let j = 0; j < data.length; j += 1) {
          let start = this.changeDateFromStringToNumber(startSelected.startDate);
          let end = this.changeDateFromStringToNumber(data[i].startDate);
          const curr = this.changeDateFromStringToNumber(data[j].startDate);
          if (start > end) {
            const temp = end;
            end = start;
            start = temp;
          }
          if (curr >= start && curr <= end) {
            this.changeClickStatus(data[j], true);
            selectedIds.push(data[j].id);
          }
        }
      }
    }
    onSelect(selectedIds);
    startTime = startSelected.startDate;
    endTime = endSelected.endDate;
    const startTimeNumber = this.changeDateFromStringToNumber(startTime);
    const endTimeNumber = this.changeDateFromStringToNumber(endTime);
    if (startTimeNumber > endTimeNumber) {
      startTime = endSelected.startDate;
      endTime = startSelected.endDate;
    }
    startTime = this.formatLayoutTime(startTime);
    endTime = this.formatLayoutTime(endTime);
    this.setState({ selectedIds, startTime, endTime });
  }
  /**
   * 初始化state
   */
  initMonthsState = () => {
    const { data } = this.props;
    const months = {};
    const yearsList = this.getYearsList(data);
    for (let i = 0; i < yearsList.length; i += 1) {
      for (let j = 1; j <= 12; j += 1) {
        months[`${yearsList[i]}-${j}`] = { isHover: false, isClicked: false };
      }
    }
    this.setState({ months });
  }
  /**
   * 判断时间是否在某个时间段内
   * @param period object
   * @param key time eg: 2017-1
   */
  isInPeriod = (period, key) => {
    let res = false;
    const year = this.getYear(key);
    let month = this.getMonth(key);
    if (Number(month) < 10) {
      month = `0${month}`;
    }
    const currDate = Number(`${year}${month}`);
    const startDate = Number(period.startDate.replace(/-/g, '').substring(0, 6));
    const endDate = Number(period.endDate.replace(/-/g, '').substring(0, 6));
    if (currDate >= startDate && currDate <= endDate) {
      res = true;
    }
    return res;
  }
  /**
   * 数组去重
   * @param array
   * @return 去重复后的数组
   */
  unique = (array) => {
    return [...new Set(array)];
  }
  /**
   * 将2018-01-01格式化为2018年1月
   * @param time
   */
  formatLayoutTime = time => `${this.getYear(time)}年${this.getMonth(time)}月`;
  /**
   * 将所有周期的状态重置为初始状态
   */
  reset = () => {
    let { selectedIds } = this.state;
    const { months } = this.state;
    selectedIds = [];
    for (const key in months) {
      if (Object.prototype.hasOwnProperty.call(months, key)) {
        months[key].isHover = false;
        months[key].isClicked = false;
      }
    }
    this.setState({ months, selectedIds });
  }
  /**
   * 控制模态层的隐藏和显示
   */
  toggle = () => {
    const status = !this.state.visible;
    this.setState({
      visible: status,
    });
  }

  render() {
    const { className, placement, data } = this.props;
    const { visible, startTime, endTime, isActive, months } = this.state;

    // 根据年份初始化弹出层周期选择的内容
    const yearsList = this.getYearsList(data);
    const lineList = [];
    for (let i = 0; i < yearsList.length; i += 1) {
      const upMonths = [];
      const downMonths = [];
      for (let j = 1; j <= 6; j += 1) {
        const upKey = `${yearsList[i]}-${j}`;
        const upMonth = (
          <div
            className={styles.contentLineItemUp}
            key={upKey}
            onMouseOver={() => this.onMouseOver(upKey)}
            onMouseLeave={() => this.onMouseLeave(upKey)}
            onClick={() => this.onClick(upKey)}
            onFocus={this.onMouseOver}
          >
            <PeriodItem content={`${j}月`} isHover={months[`${yearsList[i]}-${j}`].isHover} isClicked={months[`${yearsList[i]}-${j}`].isClicked} />
          </div>
        );
        upMonths.push(upMonth);
      }
      for (let j = 7; j <= 12; j += 1) {
        const downKey = `${yearsList[i]}-${j}`;
        const downMonth = (
          <div
            className={styles.contentLineItemDown}
            key={downKey}
            onMouseOver={() => this.onMouseOver(downKey)}
            onMouseLeave={() => this.onMouseLeave(downKey)}
            onClick={() => this.onClick(downKey)}
            onFocus={this.onMouseOver}
          >
            <PeriodItem content={`${j}月`} isHover={months[`${yearsList[i]}-${j}`].isHover} isClicked={months[`${yearsList[i]}-${j}`].isClicked} />
          </div>
        );
        downMonths.push(downMonth);
      }
      const line = (
        <div className={styles.contentLine} key={i}>
          {i !== 0 ?
            <div className={styles.contentYear} style={{ borderTop: '1px solid #d9d9d9', marginTop: '-1px' }}>{`${yearsList[i]}年`}</div>
            :
            <div className={styles.contentYear}>{`${yearsList[i]}年`}</div>}
          <div className={styles.contentMonth}>
            <div className={styles.up}>{upMonths}</div>
            <div className={styles.down}>{downMonths}</div>
          </div>
        </div>
      );
      lineList.push(line);
    }

    // 弹出层的内容
    const periodArea = (
      <div className={styles.content}>
        {lineList}
      </div>
    );
    // 弹出层按钮
    const button = (
      <div className={styles.layout} onClick={this.toggle}>
        <div className={visible ? styles.calendarIconActive : styles.calendarIcon}><Icon type="calendar" /></div>
        <div className={isActive ? styles.startTimeActive : styles.startTime}>{startTime}</div>
        <div className={visible ? styles.lineActive : styles.line}>~</div>
        <div className={isActive ? styles.endTimeActive : styles.endTime}>{endTime}</div>
      </div>
    );
    // 弹出层layout
    const popoverLayout = (
      <Popover
        content={periodArea}
        placement={placement}
        trigger="click"
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <div />
      </Popover>
    );

    return (
      <div className={classNames(className, styles.periodSelector)}>
        {/* 弹出层按钮 */}
        {button}
        {/* 弹出层layout */}
        {popoverLayout}
      </div>
    );
  }
}
