import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu, Icon } from 'antd';
import classNames from 'classnames';

import styles from './index.less';

export default class TileDropdown extends Component {
  static defaultProps = {
    className: '',
    placeholder: 'Search',
  };

  static propTypes = {
    data: PropTypes.array.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    searchEnter: PropTypes.func.isRequired,
  }

  state = {
    checkedItem: [],
    showPlaceholder: true,
    visible: false,
    calcInputWidth: '8px',
    showData: [],
  };

  componentWillReceiveProps(nextProp) {
    this.setState({
      showData: nextProp.data,
    });
  }

  /**
   * 处理菜单格式
   * @param treeData
   * @param layer
   * @returns {Array}
   */
  formatMenu = (treeData) => {
    const resData = [];
    treeData.forEach((item) => {
      resData.push(
        <Menu.Item className={`layer${item.layer}`} key={item.key}>
          <input
            name="menuitem"
            onChange={(e) => { this.menuItemChange(e, item.key, item.label); }}
            type="checkbox"
            id={item.key}
            placeholder=""
          />
          <label className="itemLabel" htmlFor={item.key}>{item.label}</label>
        </Menu.Item>
      );
    });
    return resData;
  }

  /**
   * 过滤数据
   * @param data
   * @param filter
   */
  filterMenu = (data, filter) => {
    data.forEach((item) => {
      if (item.children && item.children.length) {
        this.filterMenu(item.children, filter);
      }
    });
  }

  /**
   * 聚焦input
   */
  dropClick = () => {
    this.searchInput.focus();
  }

  /**
   * menu的点击事件
   */
  handleMenuClick = (e) => {
    if (e.key === -1) {
      this.setState({ visible: false });
    }
  }

  /**
   * 输入框改变事件，处理placeholder显示以及搜索
   * @param input
   */
  inputChange = (e) => {
    const showData = this.props.data.filter((item) => {
      return item.label.indexOf(e.target.value) > -1;
    });
    this.setState({
      showData,
      showPlaceholder: e.target.value === '',
      calcInputWidth: `${document.getElementById('calcInputWidth').offsetWidth + 15}px`,
    });
  }

  /**
   * 回车搜索事件
   * @param e
   */
  inputEnter = (e) => {
    // 回车事件
    if (e.which === 13) {
      this.props.searchEnter(this.state.checkedItem);
    }
  }

  /**
   * 处理下拉菜单隐藏
   * @param flag
   */
  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
    if (!flag) {
      this.props.searchEnter(this.state.checkedItem);
    }
  }

  /**
   * 下拉列表的选择切换事件
   * @param e
   * @param key
   * @param name
   */
  menuItemChange = (e, key, name) => {
    let tempCheckedItem = this.state.checkedItem;
    const isInArray = tempCheckedItem.filter((item) => { return item.key === key; }).length;
    if (e.target.checked && !isInArray) {
      tempCheckedItem.push({ key, name });
    } else if (!e.target.checked) {
      tempCheckedItem = tempCheckedItem.filter((item) => { return item.key !== key; });
    }
    this.setState({
      checkedItem: tempCheckedItem,
    });
  }

  /**
   * 删除选中项事件
   * @param key
   */
  delItem = (key) => {
    let tempCheckedItem = this.state.checkedItem;
    tempCheckedItem = tempCheckedItem.filter((item) => { return item.key !== key; });
    this.setState({
      checkedItem: tempCheckedItem,
    });
    // 取消复选框选中
    document.getElementById(key).checked = false;
  }

  render() {
    const { className } = this.props;
    const { checkedItem, visible, showPlaceholder, calcInputWidth, showData } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} className={styles.downHolder}>
        {showData && showData.length ? this.formatMenu(showData) : ''}
      </Menu>
    );
    const list = [];
    checkedItem.forEach((item) => {
      list.push(
        <li key={item.key}>
          <span>{item.name}</span>
          <span className={styles.delItem} onClick={() => { this.delItem(item.key); }}>
            <Icon type="close" />
          </span>
        </li>
      );
    });
    return (
      <div className={classNames(className)}>
        <Dropdown
          trigger={['click']}
          overlay={menu}
          onVisibleChange={this.handleVisibleChange}
          visible={visible}
        >
          <div onClick={this.dropClick} className={styles.dropHolder}>
            {showPlaceholder && !list.length ? <span className={styles.placeholderSpan}>{this.props.placeholder}</span> : ''}
            <ul>
              {list}
              <li>
                <input
                  className={styles.dropSearch}
                  onKeyPress={this.inputEnter}
                  onChange={this.inputChange}
                  ref={(input) => { this.searchInput = input; }}
                  style={{ width: calcInputWidth }}
                />
                <span style={{ visibility: 'hidden', position: 'absolute' }} id="calcInputWidth">{this.searchInput ? this.searchInput.value : ''}</span>
              </li>
            </ul>
          </div>
        </Dropdown>
      </div>
    );
  }
}
