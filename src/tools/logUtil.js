/**
 * Created by zhanghaoyi on 17/7/3.
 */
import log4js from 'log4js';
import logConfig from '../configs/log4j';

/* 加载配置文件 */
log4js.configure(logConfig);

export default {
  errorLogger(content) {
    log4js.getLogger('errorLogger').error(content);
  },
  infoLogger(content) {
    log4js.getLogger('infoLogger').info(content);
  },
};
