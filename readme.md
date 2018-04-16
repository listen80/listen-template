#leaf

##安装
1. npm install
2. npm start

##node环境
var leaf = require('leaf')

##浏览器
引入leaf.js leaf为全局变量 dist下为生产版 src下为源码

##用法
```
var data = {
  list: [
    {name: li1, sex: 1},
    {name: li2, sex: 2},
    {name: li3, sex: 3}
  ],
  show: true
}
var html = leaf('test')(data)
```

##模版
<xmp>
{if $d.show}
<ul>
{for $d.list}
  <li>{$i + 1} : {$v.name}</li>
{/for}
</ul>
{/if}
</xmp>

##结果
<xmp>
<ul>
  <li>1 : li1</li>
  <li>2 : li2</li>
  <li>3 : li3</li>
</ul>
</xmp>