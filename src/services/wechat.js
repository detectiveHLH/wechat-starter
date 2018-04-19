import { stringify } from 'qs';
import request from '../utils/request';

export async function getSignature(params) {
  return request(`http://192.168.199.222:3003/wechat/pass/get_signature?${stringify(params)}`);
}
