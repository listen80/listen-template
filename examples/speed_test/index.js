var length = 1e3; // 数据 长度
var number = 2e3; // 测试 次数
var testData = {
  list: [],
};

for (var i = 0; i < length; i++) {
  testData.list.push({
    index: i,
    user: '<strong style="color:red">引擎渲染速度</strong>',
    site: "http://www.baidu.com",
    weibo: "http://weibo.com",
    QQweibo: "http://t.qq.com",
  });
}

var testList = [
  {
    name: "artTemplate",
    tester: function () {
      template.config("escape", false);
      var source = document.getElementById("artTemplate").innerHTML;
      var fn = template.compile(source);
      for (var i = 0; i < number; i++) {
        fn(testData);
      }
    },
  },
  {
    name: "easyTemplate",
    tester: function () {
      var source = document.getElementById("easyTemplate").innerHTML;
      var fn = easyTemplate(source);
      for (var i = 0; i < number; i++) {
        // easyTemplate 渲染方法被重写到 toString(), 需要取值操作才会运行
        fn(testData) + "";
      }
    },
  },
  {
    name: "juicer",
    tester: function () {
      var config = {
        cache: true,
      };
      var source = document.getElementById("juicer").innerHTML;
      for (var i = 0; i < number; i++) {
        juicer.to_html(source, testData, config);
      }
    },
  },
  {
    name: "etpl",
    tester: function () {
      // dont escape html
      etpl.config({
        defaultFilter: "",
      });
      var source = document.getElementById("etpl").innerHTML;
      var fn = etpl.compile(source);
      for (var i = 0; i < number; i++) {
        fn(testData);
      }
    },
  },
  {
    name: "Mustache",
    tester: function () {
      var source = document.getElementById("Mustache").innerHTML;
      for (var i = 0; i < number; i++) {
        Mustache.to_html(source, testData);
      }
    },
  },
  {
    name: "Handlebars",
    tester: function () {
      var source = document.getElementById("Handlebars").innerHTML;
      var fn = Handlebars.compile(source);
      for (var i = 0; i < number; i++) {
        fn(testData);
      }
    },
  },
  {
    name: "listen-template",
    tester: function () {
      var fn = lt("lt");
      for (var i = 0; i < number; i++) {
        fn(testData);
      }
    },
  },
  {
    name: "baiduTemplate",
    tester: function () {
      var bt = baidu.template;
      bt.ESCAPE = false;
      for (var i = 0; i < number; i++) {
        bt("baidu-template", testData);
      }
    },
  },
  {
    name: "tmpl",
    tester: function () {
      var source = document.getElementById("tmpl").innerHTML;
      var fn = tmpl(source);
      for (var i = 0; i < number; i++) {
        fn(testData);
      }
    },
  },
  {
    name: "doT",
    tester: function () {
      var source = document.getElementById("doT").innerHTML;
      var doTtmpl = doT.template(source);
      for (var i = 0; i < number; i++) {
        doTtmpl(testData);
      }
    },
  },
  {
    name: "ejs",
    tester: function () {
      var source = document.getElementById("ejs").innerHTML;
      for (var i = 0; i < number; i++) {
        ejs.render(source, testData);
      }
    },
  },
  {
    name: "underscore",
    tester: function () {
      var source = document.getElementById("underscoreTemplate").innerHTML;
      var fn = _.template(source);
      for (var i = 0; i < number; i++) {
        fn(testData);
      }
    },
  },
];

var startTest = function () {
  var colorList = [
    "#B5C334",
    "#FCCE10",
    "#E87C25",
    "#27727B",
    "#9BCA63",
    "#FAD860",
    "#F3A43B",
    "#60C0DD",
    "#D7504B",
    "#C6E579",
    "#F4E001",
    "#F0805A",
    "#26C0C0",
  ];

  var categories = [];
  var chartData = [];
  for (var i = 0; i < testList.length; i++) {
    categories.push(testList[i].name);
    chartData.push({
      color: colorList[i],
      y: 0,
    });
  }

  var chart = new Highcharts.Chart({
    chart: {
      renderTo: "container",
      type: "column",
    },
    title: {
      text: length + " 条数据 × " + number + " 次渲染",
    },
    xAxis: {
      categories: categories,
      labels: {
        align: "center",
        style: {
          fontSize: "14px",
          fontFamily: "Aria, sans-serif",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "耗时(毫秒)",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          formatter: function () {
            return this.y + "ms";
          },
        },
      },
    },
    series: [
      {
        data: chartData.slice(),
      },
    ],
  });

  var tester = function (i) {
    setTimeout(function () {
      var target = testList[i];
      if (target) {
        var starttime = +new Date();
        target.tester();
        var endTime = +new Date();
        chartData[i] = {
          y: endTime - starttime,
        };
        chart.series[0].setData(chartData);
        tester(i + 1);
      } else {
        console.log("test end");
      }
    }, 500);
  };

  tester(0);
};

window.onload = startTest;
