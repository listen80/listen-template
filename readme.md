# listen-template

## 优点

1. 简单 语法简单易懂
2. 极速 超过绝大数引擎
3. 小巧 min 后不足 2KB

## 例子

[速度测试](https://listen80.github.io/listen-template/examples/speed_test/)  
[树形结构 json](https://listen80.github.io/listen-template/examples/json/)  
[README例子](https://listen80.github.io/listen-template/examples/)  
[防Xss](https://listen80.github.io/listen-template/examples/escape.html)  
[for循环](https://listen80.github.io/listen-template/examples/easy.html)  

## 安装

引入 js 文件

```html
<script type="text/javascript" src="https://listen80.github.io/listen-template/dist/lt.js"></script>
```

## 用法

### 数据

```js
var data = {
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

var html = lt("test")(data);
```

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
```
