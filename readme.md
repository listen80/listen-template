#leaf

###compile
1. npm install
2. npm start

###node环境
var leaf = require('leaf')

###浏览器
引入leaf.js leaf为全局变量 dist下为生产版 src下为源码

##用法
<pre>
var data = {
  list: [
    {name: li1, sex: 1},
    {name: li2, sex: 2},
    {name: li3, sex: 3}
  ],
  show: true
}
var html = leaf('test')(data)
</pre>

##模版
<pre>
{if $d.show}
&lt;ul>
{for $d.list}
  &lt;li>{$i + 1} : {$v.name}&lt;/li>
{/for}
&lt;/ul>
{/if}
</pre>

##结果
<pre>
&lt;ul>
  &lt;li>1 : li1&lt;/li>
  &lt;li>2 : li2&lt;/li>
  &lt;li>3 : li3&lt;/li>
&lt;/ul>
</pre>