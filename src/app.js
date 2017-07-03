/**
 * Created by zhanghaoyi on 17/6/27.
 */
import Koa2 from 'koa';
import bodyParser from 'koa-bodyparser';
import importDir from 'import-dir';
import mongoose from 'mongoose';
import dbConfig from './configs/mongo';
import logUtil from './tools/logUtil';

/* 日志配置 */

/* 连接数据库 */
mongoose.Promise = Promise;
mongoose.connect('mongodb://47.92.80.169:27017/blog', {useMongoClient: true});
const dbConnect = mongoose.connection;
dbConnect.on('error', function(error){
  logUtil.errorLogger('连接失败！失败原因：' + error);
});
dbConnect.once('open', function callback () {
  logUtil.infoLogger('mogo连接成功！');
});

/* 创建Koa2 */
const app = new Koa2();
app.use(bodyParser());
/* 使用路由 */
const routers = importDir('./controllers');
Object.keys(routers).forEach(name => {
  app.use(routers[name].routes());
});

app.listen(3000);
console.log('项目启动成功');
logUtil.infoLogger('项目启动成功！');

