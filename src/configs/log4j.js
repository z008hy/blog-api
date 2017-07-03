/**
 * Created by zhanghaoyi on 17/6/30.
 */
import path from 'path';
//日志根目录
const errorPath = path.resolve(__dirname, '../logs/error/error');
const infoPath = path.resolve(__dirname, '../logs/info/info');

export default {
  appenders:
    [
      {
        category: 'errorLogger',             //logger名称
        type: 'console',                   //日志类型
        filename: errorPath,             //日志输出位置
        alwaysIncludePattern: true,          //是否总是有后缀名
        pattern: '-yyyy-MM-dd.log',          //后缀，每小时创建一个新的日志文件
      },
      {
        category: 'infoLogger',
        type: 'DateFile',
        filename: infoPath,
        alwaysIncludePattern: true,
        pattern: '-yyyy-MM-dd.log',
      },
    ],
  levels:                                     //设置logger名称对应的的日志等级
    {
      errorLogger: 'ERROR',
      infoLogger: 'ALL',
    },
};
