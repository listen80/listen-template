# leaf

### compile
1. npm install
2. npm start

### node环境
var leaf = require('leaf')

## 用法
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

## 模版
<pre>
{if $d.show}
<ul>
{for $d.list}
	  <li style="list-style: none">{$i + 1} : {$v.name}</li>
{/for}
</ul>
{/if}
</pre>
