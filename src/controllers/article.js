/**
 * Created by zhanghaoyi on 17/6/27.
 */
import koaRouter from 'koa-router';
import ArticleService from '../services/article';

const router = koaRouter();

/**
 * 创建
 */
router.post('/api/article', async (ctx, next) => {
  // 获取数据，验证数据必须数据
  const title = ctx.request.body.title || '';
  const content = ctx.request.body.content || '';
  const type = ctx.request.body.type || '';
  const author = ctx.request.body.author || '';
  const status = ctx.request.body.status || 1;
  const privateState = ctx.request.body.privateState || false;

  // 创建时自动生成的字段
  const createTime = Date.now();
  const editTime = Date.now();
  // 判空
  if (!title) {
    ctx.body = {
      msg: '标题不能为空',
      code: '1990',
    };
    return;
  }
  if (!type) {
    ctx.body = {
      msg: '类型不能为空',
      code: '1990',
    };
    return;
  }
  // 类型判断
  if (typeof status !== 'number') {
    ctx.body = {
      msg: 'status类型必须为number',
      code: '1991',
    };
  }
  if (typeof privateState !== 'boolean') {
    ctx.body = {
      msg: 'privateState类型必须为boolean',
      code: '1991',
    };
  }
  // service操作
  try {
    await ArticleService.addArticle({title, content, author, type, status: Number(status), privateState: Boolean(privateState), createTime, editTime}).then((result) => {
      console.log(result);
      ctx.body = {
        code: '1992',
      };
    });
  } catch (error) {
    logUtil.errorLogger(`#####创建/api/article/#####\n######${ctx}######\n######数据库异常：${error}######`);
    ctx.body = {
      msg: '入库异常',
      code: '1993',
    };
  }
});
/**
 * 修改文件内容(全量更新)
 */
router.put('/api/article/:id', async (ctx, next) => {
  // 获取数据，验证数据必须数据
  const id = ctx.params.id;
  const title = ctx.request.body.title || '';
  const content = ctx.request.body.content || '';
  const type = ctx.request.body.type || '';
  const author = ctx.request.body.author || '';
  const status = ctx.request.body.status || 1;
  const privateState = ctx.request.body.privateState || false;
  // 创建时自动生成的字段
  const editTime = Date.now();
  // 判空
  if (!id) {
    ctx.body = {
      msg: 'id不能为空',
      code: '1990',
    };
    return;
  }
  if (!title) {
    ctx.body = {
      msg: '标题不能为空',
      code: '1990',
    };
    return;
  }
  if (!type) {
    ctx.body = {
      msg: '类型不能为空',
      code: '1990',
    };
    return;
  }
  // 类型判断
  if (typeof status !== 'number') {
    ctx.body = {
      msg: 'status类型必须为number',
      code: '1991',
    };
  }
  if (typeof privateState !== 'boolean') {
    ctx.body = {
      msg: 'privateState类型必须为boolean',
      code: '1991',
    };
  }
  // service操作
  try {
    await ArticleService.updateArticle({id, title, content, author, type, status: Number(status), privateState: Boolean(privateState), editTime}).then((result) => {
      console.log(result);
      ctx.body = {
        code: '1992',
      };
    });
  } catch (error) {
    logUtil.errorLogger(`#####修改文件内容(全量更新)/api/article/:id#####\n######${ctx}######\n######数据库异常：${error}######`);
    ctx.body = {
      msg: '入库异常',
      code: '1993',
    };
  }
});
/**
 * 查询文章列表 （共有，非草稿）
 */
router.get('/api/article', async (ctx, next) => {
  // 获取request数据
  const title = ctx.query.title || '';
  const type = ctx.query.type || '';
  const author = ctx.query.author || '';
  const page = ctx.query.page || 1;
  const pageSize = ctx.query.pageSize || 10;
  // 类型判断
  if (typeof title !== 'string') {
    ctx.body = {
      msg: 'title类型必须为string',
      code: '1991',
    };
    return;
  }
  if (typeof type !== 'string') {
    ctx.body = {
      msg: 'type类型必须为string',
      code: '1991',
    };
    return;
  }
  if (typeof author !== 'string') {
    ctx.body = {
      msg: 'author类型必须为string',
      code: '1991',
    };
    return;
  }
  // service操作
  try {
    await ArticleService.getArticleList({title, author, type, page:Number(page), pageSize: Number(pageSize)}).then((result) => {
      console.log(result);
      ctx.body = {
        code: '1992',
        data: result,
      };
    });
  } catch (error) {
    logUtil.errorLogger(`#####查询文章列表/api/article#####\n######${ctx}######\n######数据库查询异常：${error}######`);
    ctx.body = {
      msg: '查库异常',
      code: '1993',
    };
  }
});
/**
 * 根据id查询文章详情 （共有，非草稿）
 */
router.get('/api/article/:id', async (ctx, next) => {
  // 获取request数据
  const id = ctx.params.id || '';
  // 判空
  if (!id) {
    ctx.body = {
      msg: 'id不能为空',
      code: '1990',
    };
    return;
  }
  // service操作
  try {
    await ArticleService.getArticleById({id}).then((result) => {
      console.log(result);
      ctx.body = {
        code: '1992',
        data: result,
      };
    });
  } catch (error) {
    logUtil.errorLogger(`#####根据id查询文章详情/api/article/:id#####\n######${ctx}######\n######数据库查询异常：${error}######`);
    ctx.body = {
      msg: '查库异常',
      code: '1993',
    };
  }
});
export default router;
