'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const notify = require('../mailer');

// const Imager = require('imager');
// const config = require('../../config');
// const imagerConfig = require(config.root + '/config/imager.js');

const Schema = mongoose.Schema;

const getTags = tags => tags.join(',');
const setTags = tags => {
  if (!Array.isArray(tags)) return tags.split(',').slice(0, 10); // max tags
  return [];
};

/**
 * Article Schema
 */
// deen_case.uid = req.body.uid ? req.body.uid : date_cache.getUTCFullYear().toString() + "_" + date_cache.getUTCMonth().toString() + "_" + date_cache.getUTCDate().toString() + "_" + date_cache.getUTCHours().toString() + date_cache.getUTCMinutes().toString() + date_cache.getUTCSeconds().toString() + date_cache.getUTCMilliseconds().toString();
const ArticleSchema = new Schema({
  /* title: { type: String, default: '', trim: true, maxlength: 400 }
  createdAt: { type: Date, default: Date.now },
  image: {
    cdnUri: String,
    files: []
  }, */
  //案件討論
  comments: [
    {
      body: { type: String, default: '', maxlength: 1000 },
      user: { type: Schema.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  //案件描述
  body: { type: String, default: '', trim: true, maxlength: 1000 },
  //標籤
  tags: { type: [], get: getTags, set: setTags },
  //創建人
  user: { type: Schema.ObjectId, ref: 'User' },
  //區域
  position: String,
  //案件流水號(日期)
  uid: {
    type: String,
    //default: new Date().getUTCFullYear().toString() + "_" + new Date().getUTCMonth().toString() + "_" + new Date().getUTCDate().toString() + "_" + new Date().getUTCHours().toString() + new Date().getUTCMinutes().toString() + new Date().getUTCSeconds().toString() + new Date().getUTCMilliseconds().toString(),
    required: true
  },
  //案件人名
  case_name: {
    type: String,
    default: ""
  },
  clear_date: {
    type: Date,
    default: () => new Date(+new Date() + 100 * 365 * 24 * 60 * 60 * 1000),
    required: true
  },
  create_date: {
    type: Date,
    required: true
  },
  helper_name: {
    type: String,
    //default: "未設定禮助"
  },
  host_date: {
    type: Date,
    default: () => new Date(+new Date() + 99 * 365 * 24 * 60 * 60 * 1000),
    required: true
  },
  host_name: {
    type: String,
    //default: "未設定禮儀師"
  },
  host_sign: {
    type: Boolean,
    default: false
  },
  plan_money: {
    type: Number,
    default: 9876543210
  },
  object_item: {
    接體: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 500 },
      person: { type: Array, default: [] },
    },
    引魂: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 500 },
      person: { type: Array, default: [] },
    },
    頭七: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 500 },
      person: { type: Array, default: [] },
    },
    二七: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 500 },
      person: { type: Array, default: [] },
    },
    三七: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 500 },
      person: { type: Array, default: [] },
    },
    四七: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 500 },
      person: { type: Array, default: [] },
    },
    五七: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 500 },
      person: { type: Array, default: [] },
    },
    六七: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 500 },
      person: { type: Array, default: [] },
    },
    滿七: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 500 },
      person: { type: Array, default: [] },
    },
    功德法事: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 1000 },
      person: { type: Array, default: [] },
    },
    洗穿化殮: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 500 },
      person: { type: Array, default: [] },
    },
    洗穿化殮5K: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 1000 },
      person: { type: Array, default: [] },
    },
    大體SPA入殮_單人: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 1000 },
      person: { type: Array, default: [] },
    },
    大體SPA入殮_雙人: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 500 },
      person: { type: Array, default: [] },
    },
    報殮3K: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 500 },
      person: { type: Array, default: [] },
    },
    報殮4K: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 1000 },
      person: { type: Array, default: [] },
    },
    抬棺2K: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 500 },
      person: { type: Array, default: [] },
    },
    抬棺4K: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 1000 },
      person: { type: Array, default: [] },
    },
    會場布置: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 500 },
      person: { type: Array, default: [] },
    },
    告別式: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 500 },
      person: { type: Array, default: [] },
    },
    靈車: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 500 },
      person: { type: Array, default: [] },
    },
    返主: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 500 },
      person: { type: Array, default: [] },
    },
    晉塔: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 500 },
      person: { type: Array, default: [] },
    },
    土葬上山: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 1000 },
      person: { type: Array, default: [] },
    },
    起掘遷葬: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 1000 },
      person: { type: Array, default: [] },
    },
    起掘遷葬晉塔: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 1000 },
      person: { type: Array, default: [] },
    },
    德誼VIP安靈室: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 100 },
      person: { type: Array, default: [] },
    },
    職案獎金: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 1000 },
      person: { type: Array, default: [] },
    },
    小孩出生死亡_未滿月: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 1000 },
      person: { type: Array, default: [] },
    },
    小孩出生死亡_滿月: {
      date: { type: Date, default: () => new Date(+new Date() + 98 * 364 * 24 * 60 * 60 * 1000) },
      count: { type: Number, default: 0 },
      money: { type: Number, default: 2000 },
      person: { type: Array, default: [] },
    },

  }
});

/**
 * Validations
 */

ArticleSchema.path('case_name').required(true, '案件名不能為空');
//ArticleSchema.path('body').required(true, 'Article body cannot be blank');

/**
 * Pre-remove hook
 */

ArticleSchema.pre('remove', function (next) {
  // const imager = new Imager(imagerConfig, 'S3');
  // const files = this.image.files;

  // if there are files associated with the item, remove from the cloud too
  // imager.remove(files, function (err) {
  //   if (err) return next(err);
  // }, 'article');

  next();
});

/**
 * Methods
 */

ArticleSchema.methods = {
  /**
   * Save article and upload image
   *
   * @param {Object} images
   * @api private
   */

  uploadAndSave: function (/*image*/) {
    const err = this.validateSync();
    if (err && err.toString()) throw new Error(err.toString());
    return this.save();

    /*
    if (images && !images.length) return this.save();
    const imager = new Imager(imagerConfig, 'S3');

    imager.upload(images, function (err, cdnUri, files) {
      if (err) return cb(err);
      if (files.length) {
        self.image = { cdnUri : cdnUri, files : files };
      }
      self.save(cb);
    }, 'article');
    */
  },

  /**
   * Add comment
   *
   * @param {User} user
   * @param {Object} comment
   * @api private
   */

  addComment: function (user, comment) {
    this.comments.push({
      body: comment.body,
      user: user._id
    });

    if (!this.user.email) this.user.email = 'email@test.com';

    notify.comment({
      article: this,
      currentUser: user,
      comment: comment.body
    });

    return this.save();
  },

  /**
   * Remove comment
   *
   * @param {commentId} String
   * @api private
   */

  removeComment: function (commentId) {
    const index = this.comments.map(comment => comment.id).indexOf(commentId);

    if (~index) this.comments.splice(index, 1);
    else throw new Error('沒有討論串');
    return this.save();
  }
};

/**
 * Statics
 */

ArticleSchema.statics = {
  /**
   * Find article by id
   *
   * @param {ObjectId} id
   * @api private
   */

  load: function (_id) {
    return this.findOne({ _id })
      .populate('user', 'name email username')
      .populate('comments.user')
      .exec();
  },

  /**
   * List articles
   *
   * @param {Object} options
   * @api private
   */

  list: function (options) {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || 30;
    return this.find(criteria)
      .populate('user', 'name username')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page)
      .exec();
  }
};

mongoose.model('Article', ArticleSchema);
