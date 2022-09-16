function toString(value) {
  if (value == undefined) {
    value = "";
  } else {
    value += "";
  }
  return value;
}

const map = {
  "<": "&#60;",
  ">": "&#62;",
  '"': "&#34;",
  "'": "&#39;",
  "&": "&#38;",
};
function escape(value) {
  return toString(value).replace(/&(?![\w#]+;)|[<>"']/g, function (s) {
    return map[s];
  });
}

function ArrayLike(obj) {
  return obj && typeof obj.length === "number";
}

function forEach(data, callback) {
  var i,
    len,
    count = 0;
  if (ArrayLike(data)) {
    for (i = 0, len = data.length; i < len; i++) {
      callback.call(data, data[i], i, i);
    }
  } else {
    for (i in data) {
      if (data.hasOwnProperty(i)) {
        callback.call(data, data[i], i, count);
        count++;
      }
    }
  }
}

module.exports = {
  toString,
  forEach,
  escape,
};
