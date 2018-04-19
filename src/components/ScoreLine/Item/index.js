import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './index.less';

export default class ScoreLine extends Component {
  static defaultProps = {
    className: '',
    name: '',
    score: '',
    isActive: false,
    decimalLine: '',
  };

  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    score: PropTypes.string,
    isActive: PropTypes.bool,
    decimalLine: PropTypes.string,
  };

  state = {
    isHover: false,
  };

  componentDidMount() {}

  componentWillUnmount() {}


  /**
   * 鼠标移动到分位线上触发的事件
   */
  onMouseOver = () => {
    this.setState({ isHover: true });
  }

  /**
   * 鼠标离开到分位线上触发的事件
   */
  onMouseLeave = () => {
    this.setState({ isHover: false });
  }

  render() {
    const { className, name, score, isActive, decimalLine } = this.props;
    const { isHover } = this.state;

    return (
      <div className={classNames(className, styles.scoreItem)}>
        {/* 左侧部门名称 */}
        <div className={isHover ? styles.itemNameContainerHover : styles.itemNameContainer}>
          <div className={isHover ? styles.itemNameHover : styles.itemName}>{isActive ? name : ''}</div>
        </div>
        {/* 中部分位线 */}
        <div
          className={isHover ? styles.lineContainerHover : styles.lineContainer}
          onMouseOver={isActive ? this.onMouseOver : () => {}}
          onFocus={isActive ? this.onMouseOver : () => {}}
          onMouseLeave={isActive ? this.onMouseLeave : () => {}}
        >
          <div
            className={classNames(
              isHover ? styles.lineHover : styles.line,
              isActive ? styles.bgPrimary : styles.bgDisable
            )}
          >
            <div>{`${decimalLine}分位线`}</div>
          </div>
        </div>
        {/* 右侧分数 */}
        <div className={isHover ? styles.scoreContainerHover : styles.scoreContainer}>
          <div className={isHover ? styles.scoreHover : styles.score}>{isActive ? score : ''}</div>
        </div>
      </div>
    );
  }
}
