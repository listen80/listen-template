const { toString, forEach, escape } = require("./utils");
const { compile } = require("./compile");

const cache = {};

function build(tpl) {
  const func = compile(tpl);
  return function (data) {
    try {
      return func.call(lt, data);
    } catch (e) {
      console.error(e);
      console.error("lt.js: template error", func);
      return "";
    }
  };
}

function lt(tpl, id) {
  tpl += "";
  let el;
  if (cache[tpl]) {
    return cache[tpl];
  } else if ((el = document.getElementById(tpl))) {
    id = id || tpl;
    tpl = el.innerHTML;
  }
  return (cache[id] = build(tpl));
}

lt.$e = escape;
lt.$f = forEach;
lt.$s = toString;

module.exports = lt;
