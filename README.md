# listen-template

## 优点

1. 简单 语法简单易懂
2. 极速 超过绝大数引擎
3. 小巧 min 后不足 2KB

## ps
1. 采用自定义语法指令，相对于原生语法出错概率低
2. 自动识别遍历对象类型，采取对应枚举方式
3. 取消动态作用域分析，手动取值提高性能

## 功能
- 提供if for include基础指令实现基础语法
- 提供eval自定义执行变量
- 体统escape指令防止XSS攻击


## 例子
[if指令](https://listen80.github.io/listen-template/examples/if.html)  
[for指令](https://listen80.github.io/listen-template/examples/for.html)  
[include指令](https://listen80.github.io/listen-template/examples/include.html)  

[eval指令](https://listen80.github.io/listen-template/examples/eval.html)  

[escape指令(XSS)](https://listen80.github.io/listen-template/examples/escape.html)  

[性能测试](https://listen80.github.io/listen-template/examples/speed_test/)  
[树形结构 json](https://listen80.github.io/listen-template/examples/json/)  

## 安装

引入 js 文件

```html
<script type="text/javascript" src="https://listen80.github.io/listen-template/dist/lt.js"></script>
```

nodejs

```js
const lt = require('lt')
```

## 用法

### 模版

```html
<script id="tpl" type="text/html">
  <div>
    {if $d.name}
    <ul>
      {for $d.city}
      <li>{$k + 1} : {$v}</li>
      {/for}
    </ul>
    {/if}
  </div>
</script>
<div id="result"></div>  
```

### 数据

```js
const data = {
  name: "北京市",
  city: [
    "东城区",
    "西城区",
    "崇文区",
    "宣武区",
    "朝阳区",
    "丰台区",
    "石景山区",
    "海淀区",
    "门头沟区",
    "房山区",
    "通州区",
    "顺义区",
    "昌平区",
    "大兴区",
    "平谷区",
    "怀柔区",
    "密云县",
    "延庆县"
  ]
};

```

### 使用
```js
const renderFunc = lt("tpl");
const htmlDetail = renderFunc(data);
console.log(htmlDetail);
```

### 渲染

```js
var html = lt("tpl")(data);
document.getElementById("result").innerHTML = html;
```

### 字符串渲染

```js
var mytpl = `
<div>
  {if $d.name}
  <ul>
    {for $d.city}
    <li>{$k + 1} : {$v}</li>
    {/for}
  </ul>
  {/if}
</div>
`
var html = lt(mytpl)(data);
console.log(html);
```

## 原理
本模板引擎的核心原理是通过自定义语法解析器对模板字符串进行解析，将模板中的指令（如 `if`、`for` 等）转换为对应的 JavaScript 代码。在解析过程中：

1. **词法分析**：将模板字符串拆分为一个个的词法单元（Token），例如指令、变量、文本等。
2. **语法分析**：根据词法单元构建抽象语法树（AST），明确指令之间的嵌套关系和执行顺序。
3. **代码生成**：遍历抽象语法树，生成可执行的 JavaScript 渲染函数。
4. **执行渲染**：将数据传入渲染函数，生成最终的 HTML 内容。

这种实现方式使得模板引擎在保持简单语法的同时，能够高效地完成模板渲染任务，并且通过取消动态作用域分析等优化手段提升了性能。
