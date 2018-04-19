import React, { Component, Fragment } from 'react';
import styles from './index.less';

export default class Index extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <div className={styles.test}>
          <h1>test</h1>
        </div>
      </Fragment>
    );
  }
}
