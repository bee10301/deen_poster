'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const oAuthTypes = ['github', 'twitter', 'google', 'linkedin'];

/**
 * User Schema
 */

const UserSchema = new Schema({
  position: { type: String, default: '未設定區域' },
  level: { type: String, default: '未設定職位' },
  twid: { type: String, default: 'A123456789' },
  name: { type: String, default: '' },
  join_date: { type: Date, default: Date.now() },
  leave_date: { type: Date, default: null },
  money_acc: { type: String, default: '' },
  money_10: { type: Number, default: '0' },
  money_least: { type: Number, default: '0' },
  email: { type: String, default: '' },
  username: { type: String, default: '' },
  provider: { type: String, default: '' },
  hashed_password: { type: String, default: '' },
  authToken: { type: String, default: '' },
  twitter: {},
  github: {},
  google: {},
  linkedin: {}
});

const validatePresenceOf = value => value && value.length;

/**
 * Virtuals
 */

UserSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

/**
 * Validations
 */

// the below 5 validations only apply if you are signing up traditionally

UserSchema.path('name').validate(function(name) {
  if (this.skipValidation()) return true;
  return name.length;
}, '名字不能為空');

UserSchema.path('email').validate(function(email) {
  if (this.skipValidation()) return true;
  return email.length;
}, '必須輸入一個識別EMAIL');

UserSchema.path('email').validate(function(email) {
  return new Promise(resolve => {
    const User = mongoose.model('User');
    if (this.skipValidation()) return resolve(true);

    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('email')) {
      User.find({ email }).exec((err, users) => resolve(!err && !users.length));
    } else resolve(true);
  });
}, 'Email `{VALUE}` 已被使用');

UserSchema.path('username').validate(function(username) {
  if (this.skipValidation()) return true;
  return username.length;
}, '使用者名稱不能為空');

UserSchema.path('hashed_password').validate(function(hashed_password) {
  if (this.skipValidation()) return true;
  return hashed_password.length && this._password.length;
}, '請設定密碼');

/**
 * Pre-save hook
 */

UserSchema.pre('save', function(next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error('密碼無效'));
  } else {
    next();
  }
});

/**
 * Methods
 */

UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @return {Boolean}
   * @api public
   */

  authenticate: function(password) {
    return bcrypt.compareSync(password, this.hashed_password);
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return bcrypt.hashSync(password, 10);
    } catch (err) {
      return '';
    }
  },

  /**
   * Validation is not required if using OAuth
   */

  skipValidation: function() {
    return ~oAuthTypes.indexOf(this.provider);
  }
};

/**
 * Statics
 */

UserSchema.statics = {
  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function(options, cb) {
    options.select = options.select || 'name username level';
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
};

mongoose.model('User', UserSchema);
