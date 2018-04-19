import React from 'react';
import { Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import styles from './index.less';
import { getRoutes } from '../../utils/utils';

class index extends React.PureComponent {
  componentDidMount() {
    const { currentUser } = this.props;
    if (this.isEmpty(currentUser)) {
      this.props.dispatch({
        type: 'wechat/fetchSignature',
        payload: {
          code: this.getParamCode(),
        },
      });
    }
  }

  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Ant Design Pro';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - 绩 效 系 统`;
    }
    return title;
  }

  /**
   * 获取重定向带在url后的参数免登code
   * @return code 微信免登code
   */
  getParamCode = () => {
    const path = window.location.href;
    const paramsStr = path.match(/\?(\S*)#/)[1];
    const code = paramsStr.match(/code=(\S*)&/)[1];
    return code;
  }
  /**
   * 对象是否为空
   * @param obj
   * @return {boolean}
   */
  isEmpty = (obj) => {
    if (obj === null || obj === undefined) {
      return true;
    }
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }

  render() {
    const { routerData, match, isFetch } = this.props;

    const routeData = (
      <div className={styles.content}>
        <Switch>
          {getRoutes(match.path, routerData).map(item =>
          (
            <Route
              key={item.key}
              path={item.path}
              component={item.component}
              exact={item.exact}
            />
          )
        )}
          <Redirect exact from="/wechat" to="/wechat/test" />
        </Switch>
      </div>
    );
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          {
            isFetch ? routeData : null
          }
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(({ wechat, global, loading }) => ({
  currentUser: wechat.userInfo,
  isFetch: wechat.isFetch,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))(index);
