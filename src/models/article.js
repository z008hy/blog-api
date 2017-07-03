import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
  // 标题
  title: String,
  // 内容
  content: String,
  // 作者
  author: String,
  // 类型
  type: String,
  // 状态 （0:草稿，1:正常）
  status: String,
  // 私有型
  privateState: {
    type: Boolean,
    default: false
  },
  // 创建时间
  createTime: {
    type: Date,
    default: Date.now
  },
  // 编辑时间
  editTime: {
    type: Date,
    default: Date.now
  },
}, { versionKey: false });

module.exports = mongoose.model('article', articleSchema);
