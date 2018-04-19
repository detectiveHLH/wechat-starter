import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import config from '../../../config/app';

@connect(({ score, loading }) => ({
  score,
  loading: loading.effects['chart/fetch'],
}))
export default class Index extends Component {
  state = {};

  componentWillMount() {
    const redirectUri = `${config.HOST_NAME_FRONT_END}/#${this.changeUrl(this.props.match.params.path)}`;
    const path = `http://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${config.SCOPE}&state=STATE#wechat_redirect`;
    window.location.href = path;
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  /**
   * 拼接态路由
   * @param url 处理好的本项目真实路由
   */
  changeUrl = url => (`.${url}`.replace(/\./g, '/'));

  render() {
    return (
      <Fragment>
        <div className={styles.test}>
          loading...
        </div>
      </Fragment>
    );
  }
}
