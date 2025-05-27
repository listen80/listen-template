// 从 './utils' 模块导入 toString、forEach 和 escape 函数
const { toString, forEach, escape } = require("./utils");
// 从 './compile' 模块导入 compile 函数
const { compile } = require("./compile");

// 用于缓存已编译的模板函数
const cache = {};

/**
 * 根据传入的模板字符串构建一个渲染函数
 * @param {string} tpl - 模板字符串
 * @returns {Function} - 一个接受数据对象并返回渲染结果的函数
 */
function build(tpl) {
  // 调用 compile 函数编译模板字符串，得到一个渲染函数
  const func = compile(tpl);
  return function (data) {
    try {
      // 调用渲染函数并传入数据对象，返回渲染结果
      return func.call(lt, data);
    } catch (e) {
      // 捕获并打印错误信息
      console.error(e);
      // 打印模板错误信息和渲染函数
      console.error("lt.js: template error", func);
      // 出错时返回空字符串
      return "";
    }
  };
}

/**
 * 主函数，用于处理模板字符串并返回渲染函数
 * @param {string|HTMLElement} tpl - 模板字符串或 HTML 元素的 ID
 * @param {string} [id] - 可选的缓存 ID
 * @returns {Function} - 一个接受数据对象并返回渲染结果的函数
 */
function lt(tpl, id) {
  // 将 tpl 转换为字符串
  tpl += "";
  let el;
  // 检查缓存中是否已经存在该模板的渲染函数
  if (cache[tpl]) {
    return cache[tpl];
  } 
  // 尝试通过 ID 获取 HTML 元素
  else if ((el = document.getElementById(tpl))) {
    // 如果未提供 id，则使用 tpl 作为 id
    id = id || tpl;
    // 获取 HTML 元素的内部 HTML 作为模板字符串
    tpl = el.innerHTML;
  }
  // 构建渲染函数并缓存，然后返回该函数
  return (cache[id] = build(tpl));
}

// 将 escape 函数挂载到 lt 对象上
lt.$e = escape;
// 将 forEach 函数挂载到 lt 对象上
lt.$f = forEach;
// 将 toString 函数挂载到 lt 对象上
lt.$s = toString;

// 导出 lt 函数
module.exports = lt;
