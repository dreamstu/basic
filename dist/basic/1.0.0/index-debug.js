define("basic/1.0.0/index-debug", ["jquery/1.7.2/jquery-debug", "ua/1.0.0/index-debug", "jsons/1.0.0/index-debug", "qs-console/1.0.0/index-debug"], function(require, exports, module) {
  var $ = require("jquery/1.7.2/jquery-debug");
  var JSON = require("jsons/1.0.0/index-debug");
  var Log = require("qs-console/1.0.0/index-debug")
  var base = {};
  /**
   * 判断当前obj是否为空
   *
   * @method isEmpty
   * @param {Object} obj 需要验证的对象
   * @return {Boolean} obj是否为空,返回true则为空，返回false则不为空
   */
  base.isEmpty = function(obj) {
    return (!(Boolean($.trim(obj) || obj === 0)) || obj == "null" || obj == "undefined");
  };
  /**
   * 判断变量的值是否是 undefined
   * Determines whether or not the provided object is undefined
   *
   * @method isUndefined
   * @memberOf Jx.prototype
   *
   * @param {Mixed} o 传入被检测变量的名称
   * @return {Boolean} 当 o 的值是 undefined 时返回 true
   */
  base.isUndefined = function(o) {
    return typeof(o) === "undefined";
  };
  /**
   * 判断变量的值是否是 null
   * Determines whether or not the provided object is null
   *
   * @method isNull
   * @memberOf Jx.prototype
   *
   * @param {Mixed} o 传入被检测变量的名称
   * @return {Boolean} 当 o 的值是 null 时返回 true
   */
  base.isNull = function(o) {
    return o === null;
  };
  /**
   * 判断变量的类型是否是 Number
   * Determines whether or not the provided object is a number
   *
   * @memberOf Jx.prototype
   * @name isNumber
   * @function
   * @param {Mixed} o 传入被检测变量的名称
   * @return {Boolean} 当 o 的类型是 number 时返回 true
   */
  base.isNumber = function(o) {
    return (o === 0 || o) && o.constructor === Number;
  };
  /**
   * 判断变量的类型是否是 Boolean
   * Determines whether or not the provided object is a boolean
   *
   *
   * @method isBoolean
   * @memberOf Jx.prototype
   *
   * @static
   * @param {Mixed} o 传入被检测变量的名称
   * @return {Boolean} 当 o 的类型是 boolean 时返回 true
   */
  base.isBoolean = function(o) {
    return (o === false || o) && (o.constructor === Boolean);
  };
  /**
   * 判断变量的类型是否是 String
   * Determines whether or not the provided object is a string
   *
   *
   * @method isString
   * @memberOf Jx.prototype
   *
   * @static
   * @param {Mixed} o 传入被检测变量的名称
   * @return {Boolean} 当 o 的类型是 string 时返回 true
   */
  base.isString = function(o) {
    return (o === "" || o) && (o.constructor === String);
  };
  /**
   * 判断变量的类型是否是 Object
   * Determines whether or not the provided object is a object
   *
   *
   * @method isObject
   * @memberOf Jx.prototype
   *
   * @param {Mixed} o 传入被检测变量的名称
   * @return {Boolean} 当 o 的类型是 object 时返回 true
   */
  base.isObject = function(o) {
    return o && (o.constructor === Object || Object.prototype.toString.call(o) === "[object Object]");
  };
  /**
   * 判断变量的类型是否是 Array
   * Determines whether or not the provided object is a array
   *
   *
   * @method isArray
   * @memberOf Jx.prototype
   *
   * @param {Mixed} o 传入被检测变量的名称
   * @return {Boolean} 当 o 的类型是 array 时返回 true
   */
  base.isArray = function(o) {
    return o && (o.constructor === Array || Object.prototype.toString.call(o) === "[object Array]");
  };
  /**
   * 判断变量的类型是否是 Arguments
   * Determines whether or not the provided object is a arguments
   *
   *
   * @method isArguments
   * @memberOf Jx.prototype
   *
   * @param {Mixed} o 传入被检测变量的名称
   * @return {Boolean} 当 o 的类型是 arguments 时返回 true
   */
  base.isArguments = function(o) {
    return o && o.callee && isNumber(o.length) ? true : false;
  };
  /**
   * 判断变量的类型是否是 Function
   * Determines whether or not the provided object is a function
   *
   *
   * @method isFunction
   * @memberOf Jx.prototype
   *
   * @param {Mixed} o 传入被检测变量的名称
   * @return {Boolean} 当 o 的类型是 function 时返回 true
   */
  base.isFunction = function(o) {
    return o && (o.constructor === Function);
  };
  /**
   * 判断变量类型的方法
   * Determines the type of object
   *
   *
   * @method $typeof
   * @memberOf Jx.prototype
   *
   * @param {Mixed} o 传入被检测变量的名称
   * @return {String} 返回变量的类型，如果不识别则返回 other
   */
  base.$typeof = function(o) {
    if (base.isUndefined(o)) {
      return "undefined";
    } else if (base.isNull(o)) {
      return "null";
    } else if (base.isNumber(o)) {
      return "number";
    } else if (base.isBoolean(o)) {
      return "boolean";
    } else if (base.isString(o)) {
      return "string";
    } else if (base.isObject(o)) {
      return "object";
    } else if (base.isArray(o)) {
      return "array";
    } else if (base.isArguments(o)) {
      return "arguments";
    } else if (base.isFunction(o)) {
      return "function";
    } else {
      return "other";
    }
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
  /**
   * 生成随机数的方法
   *
   * @method random
   *
   * @param {Number} min 生成随机数的最小值
   * @param {Number} max 生成随机数的最大值
   * @return {Number} 返回生成的随机数
   */
  base.random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  /**
   * 克隆一个对象
   *
   * @method clone
   *
   * @param {Object} o 要克隆的对象
   * @return {Object} 返回通过克隆创建的对象
   *
   * @example
   * Jx().$package(function(J){
   *     var objA = {name: "Kinvix"};
   *     // 克隆一个 objA 对象，并存入 objB 中。
   *     var objB = clone(objA);
   * };
   */
  base.clone = function(o) {
    /**
     * @ignore
     */
    var tempClass = function() {};
    tempClass.prototype = o;
    // 返回新克隆的对象
    return (new tempClass());
  };
  /**
   * 生成一个返回值是传入的 value 值的函数
   *
   * @method $return
   *
   * @param {Mixed} value 要返回的值
   * @return {Mixed} 返回一个返回值是 value 的函数
   */
  base.$return = function(result) {
    return isFunction(result) ? result : function() {
      return result;
    };
  };
  /***
   * 按顺序执行 funcA, funcB, funcC，当中途有一个 func 的执行结果返回 true 则不再往下执行，并返回成功执行的 func 的返回值；
   * 	$try(funcA, funcB, funcC);
   */
  base.$try = function() {
    var i,
      l = arguments.length,
      result;
    for (i = 0; i < l; i++) {
      try {
        result = arguments[i]();
        // 如果上边语句执行成功则执行break跳出循环
        break;
      } catch (e) {
        Log.error("C.错误：[" + e.name + "] " + e.message + ", " + e.fileName + ", 行号:" + e.lineNumber + "; stack:" + typeof e.stack, 2);
      }
    }
    return result;
  };
  /**
   * 获取当前时间的函数
   *
   * @method now
   *
   * @example
   * alert(now());
   *
   */
  base.now = function() {
    return +new Date;
  };
  /**
   * 通用分时处理函数
   *
   * @method timedChunk
   *
   *
   *
   *
   */
  base.timedChunk = function(items, process, context, isShift, callback) {
    var todo = items.concat(),
      delay = 25;
    if (isShift) {
      todo = items;
    }
    window.setTimeout(function() {
      var start = +new Date();
      do {
        process.call(context, todo.shift());
      } while (todo.length > 0 && (+new Date() - start < 50));
      if (todo.length > 0) {
        window.setTimeout(arguments.callee, delay);
      } else if (callback) {
        callback(items);
      }
    }, delay);
  };
  /**
   * 获取对象自身具有的属性和方法的数量
   *
   * @method getLength
   *
   * @param {Object} obj 要获取的对象
   * @return {Number} 返回对象自身具有属性和方法的数量
   */
  base.getLength = function(obj) {
    var p,
      count = 0;
    for (p in obj) {
      if (obhasOwnProperty(p)) {
        count++;
      }
    }
    return count;
  };
  /**
   * 一个空函数函数
   *
   */
  base.emptyFunc = function() {};
  /**
   * 给函数传入参数并执行
   *
   * @param {Mixed} args 参数列表
   * @return {Mixed} 返回函数执行结果
   *
   * @example
   *     // 将"a"、"b"两个字符串传入funcA函数并执行
   *     funcA.pass("a","b");
   *
   */
  base.pass = function(func, var_args) {
    var slice = Array.prototype.slice;
    var a = slice.call(arguments, 1);
    return function() {
      var context = this;
      return func.apply(context, a.concat(slice.call(arguments)));
    };
  };
  /**
   * 将一个函数绑定给一个对象作方法，返回的函数将总被传入{@code obj} as {@code this}
   *
   * @param {Function} func 要绑定的函数
   * @param {Object} contextObj 要绑定的对象
   * @param {Mixed} args 参数列表，长度任意
   * @return {Function} 返回一个被绑定this上下文对象的函数
   *
   * @example
   *   funcB = bind(funcA, obj, a, b)
   *   funcB(c, d) // 相当于执行 funcA.call(obj, a, b, c, d)
   */
  base.bind = function(func, context, var_args) {
    var slice = Array.prototype.slice;
    var a = slice.call(arguments, 2);
    return function() {
      return func.apply(context, a.concat(slice.call(arguments)));
    };
  };
  module.exports = base;
});