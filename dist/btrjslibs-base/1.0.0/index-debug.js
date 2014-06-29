define("btrjslibs-base/1.0.0/index-debug", ["btrjslibs-base/1.0.0/src/base-debug", "jquery", "btrjslibs-base/1.0.0/src/json-debug", "btrjslibs-base/1.0.0/src/ua-debug"], function(require, exports, module) {
  define(function(require, exports, module) {
    module.exports = require("btrjslibs-base/1.0.0/src/base-debug");
  });
});
define("btrjslibs-base/1.0.0/src/base-debug", ["jquery", "btrjslibs-base/1.0.0/src/json-debug", "btrjslibs-base/1.0.0/src/ua-debug"], function(require, exports, module) {
  var $ = require("jquery");
  var JSON = require("btrjslibs-base/1.0.0/src/json-debug");
  var base = {};
  var _baseUrl = "http://localhost:8000/";
  base.baseUrl = function() {
    return _baseUrl;
  };
  /**
   * 判断当前obj是否为空
   *
   * @method isNull
   * @param {Object} obj 需要验证的对象
   * @return {Boolean} obj是否为空,返回true则为空，返回false则不为空
   */
  base.isNull = function(obj) {
    return (!(Boolean($.trim(obj) || obj === 0)) || obj == "null" || obj == "undefined");
  };
  /**
   * 序列化提交参数
   *
   * @method formatParams
   * @param {Array} heads 需要序列化的head头
   * @param {Array} params 需要序列化的head头对应的data
   * @return {Json} json字符串，可直接提交至服务器
   */
  base.formatParams = function(heads, params) {
    var jsonObj = new Object();
    jsonObj.head = heads;
    $.each(params, function(index, value) {
      params[index] = base.isNull(value) == true ? null : value;
    });
    jsonObj.data = params;
    return JSON.toJsonString(jsonObj);
  };
  /**
   * 去掉字符串左右两边的空格
   *
   * @method trimStr
   * @param {Object} obj 需要处理的对象
   * @return {String} 处理完成后的obj字符串
   */
  base.trimStr = function(obj) {
    // 用正则表达式将前后空格  
    // 用空字符串替代。  
    return obj.replace(/(^\s*)|(\s*$)/g, "");
  };
  /**
   * 根据DOM节点ID自动将服务器返回的json数据插入页面DOM中
   *
   * @method autoInsertDataByParam
   * @param {Json} rst 服务器返回的JSON对象数据
   * @param {Array} params 页面所需的数据head头，该head头应该与页面中DOM元素ID保持一致
   * @see 解析返回的JSON格式数据
   */
  base.autoInsertDataByParam = function(rst, params) {
    $.each(params, function(index, perParam) {
      var str = base.getValueByHead(rst, perParam);
      console.info(str);
      if (!base.isNull(str)) {
        $("#" + perParam).val(str);
      };
    });
  };
  /**
   * 解析服务器返回的JSON对象数据，获取某一head头所对应的data数据
   *
   * @method getValueByHead
   * @param {json} rst 服务器返回的JSON对象数据
   * @param {String} head 某一需要的head
   * @return {String} head头对应的data数据值
   */
  base.getValueByHead = function(rst, head) {
    if (rst == null) {
      return rst;
    } else {
      if (rst.result.len > 0) {
        var pIndex = -1;
        $(rst.result.head).each(function(i, perHead) {
          if (perHead == head) {
            pIndex = i;
          }
        });
        if (pIndex != -1) return rst.result.data[0][pIndex];
        else return null;
      } else {
        return null;
      }
    }
  };
  /**
   * 创建json对象，该函数多用于提交数据时，生成GsonHeadOneRow
   *
   * @method createJsonData
   * @param {Array} head head数组
   * @param {Array} data data数组
   * @return {json} 生成的json对象 类似于GsonHeadOneRow
   */
  base.createJsonData = function(head, data) {
    var obj = new Object();
    obj.head = head;
    obj.data = data;
    return obj;
  };
  /**
   * 重定向页面
   *
   * @method goPage
   * @param {String} url 需要重定向的目标页面路径
   */
  base.goPage = function(url) {
    window.location.href = url;
  };
  /**
   * 后退页面
   *
   * @method back
   */
  base.back = function() {
    history.back();
  };
  /**
   * 重载页面
   *
   * @method reload
   */
  base.reload = function() {
    window.location.reload(Math.random());
  };
  /**
   * 获取当前页面url地址
   *
   * @return {String} 当前页面url地址
   */
  base.getCurrUrl = function() {
    return window.location.href;
  };
  /**
   * 把字符串作为 URI 组件进行编码
   *
   * @method buildURI
   * @param {String} uri 需要编码的字符串
   * @return {String} 经过编码过后的字符串
   */
  base.buildURI = function(uri) {
    return encodeURIComponent(uri);
  };
  /**
   * 把字符串作为 URI 组件进行解码
   *
   * @method decodingURI
   * @param {String} uri 需要解码的字符串
   * @return {String} 经过解码过后的字符串
   */
  base.decodingURI = function(uri) {
    return decodeURIComponent(uri);
  };
  /**
   * 获取url参数
   *
   * @method getUrlParam
   * @param {String} name 参数名
   * @return {String} 获取到的结果
   */
  base.getUrlParam = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
    var r = base.decodingURI(window.location.search).substr(1).match(reg); // 匹配目标参数
    if (r != null) return r[2];
    return null; // 返回参数值
  };
  /*==========================Array.remove方法==========================*/
  /**
   *
   *  方法:Array.remove(dx) 通过遍历,重构数组
   *  功能:删除数组元素.
   *  参数:dx删除元素的下标.
   * @method remove
   */
  Array.prototype.remove = function(dx) {
    if (isNaN(dx) || dx > this.length) {
      return false;
    }
    for (var i = 0, n = 0; i < this.length; i++) {
      if (this[i] != this[dx]) {
        this[n++] = this[i];
      }
    }
    this.length -= 1;
  };
  //全局Ajax配置
  $(function() {
    $.ajaxSetup({
      async: true,
      timeout: 30000,
      dataType: 'json',
      type: 'GET',
      beforeSend: function(xhr) {
        //console.info("query beforeSend.");
        //可以设置自定义标头
        //xhr.setRequestHeader('Content-Type', 'application/xml;charset=utf-8');
      },
      error: function(xhr, status, e) {
        alert("抱歉，请求服务器出现异常！");
      },
      complete: function(xhr, status) {
        //console.info("query complete.");
      }
    });
  });
  module.exports = base;
});
define("btrjslibs-base/1.0.0/src/json-debug", ["jquery", "btrjslibs-base/1.0.0/src/ua-debug"], function(require, exports, module) {
  /**
   * @fileOverview 由于jQuery只有 parseJSON ，没有stringify所以使用过程不方便
   * @ignore
   */
  var $ = require("jquery");
  var win = window,
    UA = require("btrjslibs-base/1.0.0/src/ua-debug"),
    JSON = win.JSON;
  // ie 8.0.7600.16315@win7 json 有问题
  if (!JSON || UA['ie'] < 9) {
    JSON = win.JSON = {};
  }

  function f(n) {
    // Format integers to have at least two digits.
    return n < 10 ? '0' + n : n;
  }
  if (typeof Date.prototype.toJSON !== 'function') {
    Date.prototype.toJSON = function(key) {
      return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
    };
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
      return this.valueOf();
    };
  }
  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap,
    indent,
    meta = { // table of character substitutions
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '"': '\\"',
      '\\': '\\\\'
    },
    rep;

  function quote(string) {
    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.
    escapable['lastIndex'] = 0;
    return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
      var c = meta[a];
      return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + string + '"';
  }

  function str(key, holder) {
    // Produce a string from holder[key].
    var i, // The loop counter.
      k, // The member key.
      v, // The member value.
      length,
      mind = gap,
      partial,
      value = holder[key];
    // If the value has a toJSON method, call it to obtain a replacement value.
    if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
      value = value.toJSON(key);
    }
    // If we were called with a replacer function, then call the replacer to
    // obtain a replacement value.
    if (typeof rep === 'function') {
      value = rep.call(holder, key, value);
    }
    // What happens next depends on the value's type.
    switch (typeof value) {
      case 'string':
        return quote(value);
      case 'number':
        // JSON numbers must be finite. Encode non-finite numbers as null.
        return isFinite(value) ? String(value) : 'null';
      case 'boolean':
      case 'null':
        // If the value is a boolean or null, convert it to a string. Note:
        // typeof null does not produce 'null'. The case is included here in
        // the remote chance that this gets fixed someday.
        return String(value);
        // If the type is 'object', we might be dealing with an object or an array or
        // null.
      case 'object':
        // Due to a specification blunder in ECMAScript, typeof null is 'object',
        // so watch out for that case.
        if (!value) {
          return 'null';
        }
        // Make an array to hold the partial results of stringifying this object value.
        gap += indent;
        partial = [];
        // Is the value an array?
        if (Object.prototype.toString.apply(value) === '[object Array]') {
          // The value is an array. Stringify every element. Use null as a placeholder
          // for non-JSON values.
          length = value.length;
          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || 'null';
          }
          // Join all of the elements together, separated with commas, and wrap them in
          // brackets.
          v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
          gap = mind;
          return v;
        }
        // If the replacer is an array, use it to select the members to be stringified.
        if (rep && typeof rep === 'object') {
          length = rep.length;
          for (i = 0; i < length; i += 1) {
            k = rep[i];
            if (typeof k === 'string') {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ': ' : ':') + v);
              }
            }
          }
        } else {
          // Otherwise, iterate through all of the keys in the object.
          for (k in value) {
            if (Object.hasOwnProperty.call(value, k)) {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ': ' : ':') + v);
              }
            }
          }
        }
        // Join all of the member texts together, separated with commas,
        // and wrap them in braces.
        v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
        gap = mind;
        return v;
    }
  }
  if (typeof JSON.stringify !== 'function') {
    JSON.stringify = function(value, replacer, space) {
      // The stringify method takes a value and an optional replacer, and an optional
      // space parameter, and returns a JSON text. The replacer can be a function
      // that can replace values, or an array of strings that will select the keys.
      // A default replacer method can be provided. Use of the space parameter can
      // produce text that is more easily readable.
      var i;
      gap = '';
      indent = '';
      // If the space parameter is a number, make an indent string containing that
      // many spaces.
      if (typeof space === 'number') {
        for (i = 0; i < space; i += 1) {
          indent += ' ';
        }
        // If the space parameter is a string, it will be used as the indent string.
      } else if (typeof space === 'string') {
        indent = space;
      }
      // If there is a replacer, it must be a function or an array.
      // Otherwise, throw an error.
      rep = replacer;
      if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
        throw new Error('JSON.stringify');
      }
      // Make a fake root object containing our value under the key of ''.
      // Return the result of stringifying the value.
      return str('', {
        '': value
      });
    };
  }

  function looseParse(data) {
    try {
      return new Function('return ' + data + ';')();
    } catch (e) {
      throw 'Json parse error!';
    }
  }
  /**
   * JSON 格式化
   * @class BUI.JSON
   * @singleton
   */
  var JSON = {
    /**
     * 转成json 等同于$.parseJSON
     * @method
     * @param {String} jsonstring 合法的json 字符串
     */
    toJson: $.parseJSON,
    /**
     * 业务中有些字符串组成的json数据不是严格的json数据，如使用单引号，或者属性名不是字符串
     * 如 ： {a:'abc'}
     * @method
     * @param {String} jsonstring
     */
    looseParse: looseParse,
    /**
     * 将Json转成字符串
     * @method
     * @param {Object} json json 对象
     */
    toJsonString: JSON.stringify
  }
  return JSON;
});
define("btrjslibs-base/1.0.0/src/ua-debug", ["jquery"], function(require, exports, module) {
  /**
   * @fileOverview UA,jQuery的 $.browser 对象非常难使用
   * @ignore
   * @author dxq613@gmail.com
   */
  var $ = require("jquery");

  function numberify(s) {
    var c = 0;
    // convert '1.2.3.4' to 1.234
    return parseFloat(s.replace(/\./g, function() {
      return (c++ === 0) ? '.' : '';
    }));
  };

  function uaMatch(s) {
    s = s.toLowerCase();
    var r = /(chrome)[ \/]([\w.]+)/.exec(s) || /(webkit)[ \/]([\w.]+)/.exec(s) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(s) || /(msie) ([\w.]+)/.exec(s) || s.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(s) || [],
      a = {
        browser: r[1] || "",
        version: r[2] || "0"
      },
      b = {};
    a.browser && (b[a.browser] = !0, b.version = a.version),
    b.chrome ? b.webkit = !0 : b.webkit && (b.safari = !0);
    return b;
  }
  var UA = $.UA || (function() {
    var browser = $.browser || uaMatch(navigator.userAgent),
      versionNumber = numberify(browser.version),
      /**
       * 浏览器版本检测
       * @class BUI.UA
       * @singleton
       */
      ua = {
        /**
         * ie 版本
         * @type {Number}
         */
        ie: browser.msie && versionNumber,
        /**
         * webkit 版本
         * @type {Number}
         */
        webkit: browser.webkit && versionNumber,
        /**
         * opera 版本
         * @type {Number}
         */
        opera: browser.opera && versionNumber,
        /**
         * mozilla 火狐版本
         * @type {Number}
         */
        mozilla: browser.mozilla && versionNumber
      };
    return ua;
  })();
  return UA;
});