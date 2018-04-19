import { stringify } from 'qs';
import request from '../utils/request';
import config from '../config/app';

export async function getSignature(params) {
  return request(`http://${config.IP}:3003/wechat/pass/get_signature?${stringify(params)}`);
}
