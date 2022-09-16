function echo(code) {
  return "$o+=" + code + ";";
}

function for_html(code) {
  if (code) {
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

function for_js(code) {
  var split = code.replace(/^\s+|\s+$/, "").split(/\s+/);
  var key = split.shift();
  switch (key) {
    case "if":
      code = "if(" + split.join(" ") + "){";
      break;

    case "else":
      code = "}else{";
      break;

    case "elif":
    case "elseif":
      code = "}else if(" + split.join(" ") + "){";
      break;

    case "/if":
      code = "};";
      break;

    case "for":
      split[0] = split[0] || "$d";
      split[1] = split[1] || "$v";
      split[2] = split[2] || "$k";
      code = "$f(" + split.shift() + ",function(" + split.join() + "){";
      break;

    case "/for":
      code = "});";
      break;

    case "eval":
      code = code + ";";
      break;

    case "escape":
      code = echo("$e(" + split.join(" ") + ")");
      break;

    case "include":
      code = echo("$t(" + split[0] + ")(" + split[1] + ")");
      break;

    default:
      code = echo("$s(" + code + ")");
      break;
  }
  return code;
}

function compile(source) {
  var code = "'use strict';var $t=this,$e=$t.$e,$f=$t.$f,$s=$t.$s,$o='';";
  var codes = source.split(/\{|\}/);
  for (var i = 0, len = codes.length; i < len; i++) {
    i % 2 === 0 ? (code += for_html(codes[i])) : (code += for_js(codes[i]));
  }
  code += "return $o;";
  return new Function("$d", code);
}

module.exports = { compile };
