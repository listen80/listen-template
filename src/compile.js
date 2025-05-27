/**
 * 将输入的代码字符串包装成 $o += code; 的形式
 * @param {string} code - 需要处理的代码字符串
 * @returns {string} - 包装后的代码字符串
 */
function echo(code) {
  return "$o+=" + code + ";";
}

/**
 * 处理 HTML 代码，将特殊字符转义后包装成 $o += 'code'; 的形式
 * @param {string} code - 需要处理的 HTML 代码字符串
 * @returns {string} - 处理后的代码字符串，如果输入为空则返回原输入
 */
function for_html(code) {
  if (code) {
    // 对代码中的单引号、反斜杠、回车和换行符进行转义
    return echo(
      "'" +
      code
        .replace(/('|\\)/g, "\\$1")
        .replace(/\r/g, "\\r")
        .replace(/\n/g, "\\n") +
      "'"
    );
  } else {
    return code;
  }
}

/**
 * 根据输入的代码关键字，将自定义语法转换为 JavaScript 代码
 * @param {string} code - 需要处理的自定义语法代码字符串
 * @returns {string} - 转换后的 JavaScript 代码字符串
 */
function for_js(code) {
  // 去除代码首尾的空白字符，并按空白字符分割成数组
  var split = code.replace(/^\s+|\s+$/, "").split(/\s+/);
  // 取出数组的第一个元素作为关键字
  var key = split.shift();
  switch (key) {
    case "if":
      // 转换 if 语句
      code = "if(" + split.join(" ") + "){";
      break;

    case "else":
      // 转换 else 语句
      code = "}else{";
      break;

    case "elif":
    case "elseif":
      // 转换 elseif 语句
      code = "}else if(" + split.join(" ") + "){";
      break;

    case "/if":
      // 结束 if 语句块
      code = "};";
      break;

    case "for":
      // 确保循环变量有默认值
      split[0] = split[0] || "$d";
      split[1] = split[1] || "$v";
      split[2] = split[2] || "$k";
      // 转换 for 循环语句
      code = "$f(" + split.shift() + ",function(" + split.join() + "){";
      break;

    case "/for":
      // 结束 for 循环语句块
      code = "});";
      break;

    case "eval":
      // 直接执行代码
      code = split.join(' ') + ";";
      break;

    case "escape":
      // 对代码进行转义处理并追加到 $o
      code = echo("$e(" + split.join(" ") + ")");
      break;

    case "include":
      // 包含其他模板并追加到 $o
      code = echo("$t(" + split[0] + ")(" + split[1] + ")");
      break;

    default:
      // 默认处理，对代码进行处理并追加到 $o
      code = echo("$s(" + code + ")");
      break;
  }
  return code;
}

/**
 * 将输入的模板源代码编译成一个 JavaScript 函数
 * @param {string} source - 需要编译的模板源代码
 * @returns {Function} - 编译后的 JavaScript 函数，接收一个数据对象作为参数
 */
function compile(source) {
  // 初始化代码字符串，定义一些变量和初始值
  var code = "'use strict';var $t=this,$e=$t.$e,$f=$t.$f,$s=$t.$s,$o='';";
  // 按 { 或 } 分割源代码
  var codes = source.split(/\{|\}/);
  for (var i = 0, len = codes.length; i < len; i++) {
    // 偶数索引处理 HTML 代码，奇数索引处理自定义语法代码
    i % 2 === 0 ? (code += for_html(codes[i])) : (code += for_js(codes[i]));
  }
  // 添加返回语句
  code += "return $o;";
  try {
    // 动态创建一个函数并返回
    return new Function("$d", code);
  } catch (e) {
    // 捕获编译错误并输出错误信息和生成的代码
    console.error("Compile error: " + e.message);
    console.error(code);
    throw e;
  }
}

module.exports = { compile };
