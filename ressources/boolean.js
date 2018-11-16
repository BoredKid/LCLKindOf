const { pair } = require('./pair');
const { K, KI } = require('./utils');

const bool = pair;
const T = K;
const F = KI;

const and = exp1 => exp2 => exp1(exp2)(exp1);
const or = exp1 => exp2 => exp1(exp1)(exp2);
const not = exp => exp(F)(T);


// for testing purpose
const toJsBool = bool(true)(false);

module.exports = {
  bool,
  T,
  F,
  and,
  or,
  not,
  toJsBool,
};
