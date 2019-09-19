# listen-template

## 安装
```html
<script type="text/javascript" src=""></script>
```

## 用法
### 数据
```
var data = {
  "name": "北京市",
  "city": [
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
  }
}
var html = lt('test')(data)
```

### 模版
```
<div>
  {if $d.name}
  <ul>
  {for $d.city}
    <li>{$i + 1} : {$v}</li>
  {/for}
  </ul>
  {/if}
</div>
```

## 例子
[速度测试](https://listen80.github.io/listen-template/examples/speed_test/)  
[树形结构json](https://listen80.github.io/listen-template/examples/json/)  
[Xss](https://listen80.github.io/listen-template/examples/escape.html)  
[范例](https://listen80.github.io/listen-template/examples/easy.html)  