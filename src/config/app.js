const IP = '你自己的IP地址';

// 应用配置
export default {
  // ip地址
  IP,
  // 后端地址
  HOST_NAME: process.env.NODE_ENV === 'development' ? `http://${IP}:3003` : '',
  // 前端地址
  HOST_NAME_FRONT_END: process.env.NODE_ENV === 'development' ? `http://${IP}:8000` : '',
  // 开发者id
  APP_ID: process.env.NODE_ENV === 'development' ? '你自己的APP_ID' : '',
  // 应用授权作用域
  SCOPE: 'snsapi_base',
};
