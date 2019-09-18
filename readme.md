# listen-template

## 安装
1. npm install
2. npm start

## 用法
### 数据
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

### 模版
```
<div>
  {if $d.show}
  <ul>
  {for $d.list}
    <li>{$i + 1} : {$v.name}</li>
  {/for}
  </ul>
  {/if}
</div>
```

### 结果
```
<ul>
  <li>1 : li1</li>
  <li>2 : li2</li>
  <li>3 : li3</li>
</ul>
```

## 详情见example

[速度测试](./examples/speed_test/)
[树形结构json](./examples/json/)
[Xss](./examples/escape.html)
[范例](./examples/easy.html)