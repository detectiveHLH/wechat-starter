import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './index.less';

export default class index extends Component {
  static defaultProps = {
    className: '',
    // 需要显示的内容
    content: '',
  };

  static propTypes = {
    className: PropTypes.string,
    // 需要显示的内容
    content: PropTypes.string,
  };

  state = {
    // 当前的样式
    currStyles: null,
  };

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.isHover) {
      this.setState({ currStyles: styles.hover });
    } else if (nextProps.isClicked) {
      this.setState({ currStyles: styles.chosen });
    } else {
      this.setState({ currStyles: null });
    }
  }

  componentWillUnmount() {}

  render() {
    const { className, content } = this.props;
    const { currStyles } = this.state;

    return (
      <div className={classNames(className, styles.scoreItem, currStyles)}>
        {content}
      </div>
    );
  }
}
