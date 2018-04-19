import { stringify } from 'qs';
import request from '../utils/request';

/**
 * 部门查询
 * @returns {Promise.<Object>}
 */
export async function queryDepartments() {
  return request('http://bonus-backend-dev.tap4fun.com:8000/department_tree');
}

/**
 *  阿米巴得分查询
 * @param params
 * @returns {Promise.<Object>}
 */
export async function queryAmoebas(params) {
  return request(`http://bonus-backend-dev.tap4fun.com:8000/amoebas?${stringify(params)}`);
}

/**
 * 文化得分查询
 * @param params
 * @returns {Promise.<Object>}
 */
export async function queryCulture(params) {
  return request(`http://galileo.tap4fun.com:8080/app/mock/16/culture/score?${stringify(params)}`);
}
