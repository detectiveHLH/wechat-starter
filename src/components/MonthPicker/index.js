import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const { RangePicker } = DatePicker;

// TODO: 添加逻辑

class MonthPicker extends PureComponent {
  static defaultProps = {
    className: '',
  };

  static propTypes = {
    className: PropTypes.string,
  };
  state = {
    mode: ['month', 'month'],
    value: [],
  };

  handlePanelChange = (value, mode) => {
    this.setState({
      value,
      mode: [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1],
      ],
    });
  };


  render() {
    const { className } = this.props;
    const { value, mode } = this.state;

    return (
      <div className={classNames(className)}>
        <RangePicker
          placeholder={['开始时间', '结束时间']}
          format="YYYY-MM"
          value={value}
          mode={mode}
          onPanelChange={this.handlePanelChange}
          className={styles.monthPicker}
        />
      </div>
    );
  }
}

export default MonthPicker;
