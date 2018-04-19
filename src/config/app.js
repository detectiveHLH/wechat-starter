const IP = '192.168.199.222';

// 应用配置
export default {
  // 后端地址
  HOST_NAME: process.env.NODE_ENV === 'development' ? `http://${IP}:3003` : 'http://ggj-api.tap4fun.com',
  // 前端地址
  HOST_NAME_FRONT_END: process.env.NODE_ENV === 'development' ? `http://${IP}:8000` : 'http://ehr.tap4fun.com/ggj',
};
