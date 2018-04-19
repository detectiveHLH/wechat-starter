import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ScoreLineItem from './Item';

import styles from './index.less';

export default class ScoreLine extends Component {
  static defaultProps = {
    className: '',
    scores: [],
  };
  static propTypes = {
    className: PropTypes.string,
    scores: PropTypes.array,
  };

  state = {};

  componentDidMount() {}

  componentWillUnmount() {}

  /**
   * 判断是否高亮显示该组件
   * @param id 部门id
   * @return true|false 是否需要高亮
   */
  isActive = (id) => {
    const { activeItems } = this.props;
    let res = false;
    if (activeItems.indexOf(id) !== -1) {
      res = true;
    }
    return res;
  }

  render() {
    const { className, scores } = this.props;

    // 处理部门列表中数据
    let item = null;
    const itemList = [];
    for (let i = 0; i < scores.length; i += 1) {
      item = (
        <ScoreLineItem
          key={i}
          name={scores[i].departmentName}
          score={scores[i].accessScore}
          decimalLine={scores[i].decimalLine}
          isActive={this.isActive(scores[i].departmentId)}
        />
      );
      itemList.push(item);
    }

    return (
      <div className={classNames(className, styles.scoreLine)}>
        {itemList}
      </div>
    );
  }
}
