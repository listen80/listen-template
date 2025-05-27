/**
 * 将传入的值转换为字符串类型。
 * 如果传入的值为 undefined 或 null，则返回空字符串。
 * 否则，将该值转换为字符串并返回。
 * @param {*} value - 需要转换为字符串的值。
 * @returns {string} - 转换后的字符串。
 */
function toString(value) {
  // 检查值是否为 undefined 或 null
  if (value == undefined) {
    // 如果是，则将值设置为空字符串
    value = "";
  } else {
    // 否则，通过拼接空字符串将值转换为字符串
    value += "";
  }
  return value;
}

/**
 * 用于转义 HTML 特殊字符的映射对象。
 * 键为需要转义的特殊字符，值为对应的 HTML 实体编码。
 */
const map = {
  "<": "&#60;",
  ">": "&#62;",
  '"': "&#34;",
  "'": "&#39;",
  "&": "&#38;",
};

/**
 * 对传入的值进行 HTML 特殊字符转义。
 * 首先将传入的值转换为字符串，然后替换其中的特殊字符为对应的 HTML 实体编码。
 * @param {*} value - 需要进行转义的值。
 * @returns {string} - 转义后的字符串。
 */
function escape(value) {
  // 先将值转换为字符串，然后替换特殊字符
  return toString(value).replace(/&(?![\w#]+;)|[<>"']/g, function (s) {
    // 根据映射对象返回对应的 HTML 实体编码
    return map[s];
  });
}

/**
 * 检查一个对象是否类似数组。
 * 类似数组的对象需要满足非 null 且具有一个数值类型的 length 属性。
 * @param {*} obj - 需要检查的对象。
 * @returns {boolean} - 如果对象类似数组则返回 true，否则返回 false。
 */
function ArrayLike(obj) {
  // 检查对象是否存在且 length 属性是否为数值类型
  return obj && typeof obj.length === "number";
}

/**
 * 遍历数组或对象，并对每个元素执行回调函数。
 * 如果传入的是类似数组的对象，则使用 for 循环遍历；如果是普通对象，则使用 for...in 循环遍历。
 * @param {Array|Object} data - 需要遍历的数组或对象。
 * @param {Function} callback - 对每个元素执行的回调函数，接收三个参数：元素值、元素索引或键、计数器。
 */
function forEach(data, callback) {
  var i,
    len,
    count = 0;
  // 检查 data 是否为类似数组的对象
  if (ArrayLike(data)) {
    // 使用 for 循环遍历类似数组的对象
    for (i = 0, len = data.length; i < len; i++) {
      // 调用回调函数，将 this 指向 data
      callback.call(data, data[i], i, i);
    }
  } else {
    // 使用 for...in 循环遍历普通对象
    for (i in data) {
      // 检查属性是否为对象自身的属性
      if (data.hasOwnProperty(i)) {
        // 调用回调函数，将 this 指向 data，并更新计数器
        callback.call(data, data[i], i, count);
        count++;
      }
    }
  }
}

/**
 * 导出工具函数模块。
 * 包含 toString、forEach 和 escape 三个工具函数。
 */
module.exports = {
  toString,
  forEach,
  escape,
};
