/**
 * Created by zhanghaoyi on 17/6/27.
 */
import ArticleModel from '../models/article.js';

export default {
  /**
   *
   * @param title
   * @param content
   * @param author
   * @param type
   * @param status
   * @param privateState
   * @param createTime
   * @param editTime
   * @returns {Promise.<void>}
   */
  async addArticle({title, content, author, type, status, privateState, createTime, editTime}) {
    const article = new ArticleModel({
      title,
      content,
      author,
      type,
      status,
      privateState,
      createTime,
      editTime
    });
    return await article.save();
  },
  /**
   * 公有查询列表方法
   * @param title
   * @param content
   * @param author
   * @param type
   * @param createTime
   * @param editTime
   * @param page
   * @param pageSize
   * @returns {Promise.<*|Aggregate>}
   */
  async getArticleList({title, content, author, type, createTime, editTime, page, pageSize}) {
    // 查询条件 类型
    const typeCondition = !!type ? { type: type } : {};
    // 查询条件 作者
    const authorCondition = !!author ? { author: author } : {};
    // 查询条件 标题
    const titleCondition = !!title ? { author: new RegExp(title) } : {};

    return await ArticleModel
      .find(typeCondition)
      .find(authorCondition)
      .find(titleCondition)
      .where('status').equals('1')
      .where('privateState').equals(false)
      .sort('-createTime')
      .skip(pageSize*(page-1)).limit(pageSize);
  },
  /**
   * 根据id查询
   * @param id
   * @returns {Promise.<Query>}
   */
  async getArticleById({id}) {
    return await ArticleModel
      .findById(id);
  },
  async updateArticle({id, title, content, author, type, status, privateState, editTime}) {

    return await ArticleModel.findByIdAndUpdate(id,
      {
        $set: {title, content, author, type, status, privateState, editTime},
      });
  },
};
