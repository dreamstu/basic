define("btrjslibs/base/1.0.0/base-debug", [ "$-debug", "./json-debug", "./ua-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var JSON = require("./json-debug");
    var base = {};
    var _baseUrl = "http://localhost:8080/mail/";
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
        return !Boolean($.trim(obj) || obj === 0) || obj == "null" || obj == "undefined";
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
    module.exports = base;
});

/**
 * @fileOverview 由于jQuery只有 parseJSON ，没有stringify所以使用过程不方便
 * @ignore
 */
define("btrjslibs/base/1.0.0/json-debug", [ "$-debug", "btrjslibs/base/1.0.0/ua-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var win = window, UA = require("btrjslibs/base/1.0.0/ua-debug"), JSON = win.JSON;
    // ie 8.0.7600.16315@win7 json 有问题
    if (!JSON || UA["ie"] < 9) {
        JSON = win.JSON = {};
    }
    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? "0" + n : n;
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function(key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
            return this.valueOf();
        };
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        // table of character substitutions
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    function quote(string) {
        // If the string contains no control characters, no quote characters, and no
        // backslash characters, then we can safely slap some quotes around it.
        // Otherwise we must also replace the offending characters with safe escape
        // sequences.
        escapable["lastIndex"] = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }
    function str(key, holder) {
        // Produce a string from holder[key].
        var i, // The loop counter.
        k, // The member key.
        v, // The member value.
        length, mind = gap, partial, value = holder[key];
        // If the value has a toJSON method, call it to obtain a replacement value.
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }
        // If we were called with a replacer function, then call the replacer to
        // obtain a replacement value.
        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }
        // What happens next depends on the value's type.
        switch (typeof value) {
          case "string":
            return quote(value);

          case "number":
            // JSON numbers must be finite. Encode non-finite numbers as null.
            return isFinite(value) ? String(value) : "null";

          case "boolean":
          case "null":
            // If the value is a boolean or null, convert it to a string. Note:
            // typeof null does not produce 'null'. The case is included here in
            // the remote chance that this gets fixed someday.
            return String(value);

          // If the type is 'object', we might be dealing with an object or an array or
            // null.
            case "object":
            // Due to a specification blunder in ECMAScript, typeof null is 'object',
            // so watch out for that case.
            if (!value) {
                return "null";
            }
            // Make an array to hold the partial results of stringifying this object value.
            gap += indent;
            partial = [];
            // Is the value an array?
            if (Object.prototype.toString.apply(value) === "[object Array]") {
                // The value is an array. Stringify every element. Use null as a placeholder
                // for non-JSON values.
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null";
                }
                // Join all of the elements together, separated with commas, and wrap them in
                // brackets.
                v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                gap = mind;
                return v;
            }
            // If the replacer is an array, use it to select the members to be stringified.
            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === "string") {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v);
                        }
                    }
                }
            } else {
                // Otherwise, iterate through all of the keys in the object.
                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v);
                        }
                    }
                }
            }
            // Join all of the member texts together, separated with commas,
            // and wrap them in braces.
            v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        }
    }
    if (typeof JSON.stringify !== "function") {
        JSON.stringify = function(value, replacer, space) {
            // The stringify method takes a value and an optional replacer, and an optional
            // space parameter, and returns a JSON text. The replacer can be a function
            // that can replace values, or an array of strings that will select the keys.
            // A default replacer method can be provided. Use of the space parameter can
            // produce text that is more easily readable.
            var i;
            gap = "";
            indent = "";
            // If the space parameter is a number, make an indent string containing that
            // many spaces.
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }
            } else if (typeof space === "string") {
                indent = space;
            }
            // If there is a replacer, it must be a function or an array.
            // Otherwise, throw an error.
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
            }
            // Make a fake root object containing our value under the key of ''.
            // Return the result of stringifying the value.
            return str("", {
                "": value
            });
        };
    }
    function looseParse(data) {
        try {
            return new Function("return " + data + ";")();
        } catch (e) {
            throw "Json parse error!";
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
    };
    return JSON;
});

/**
 * @fileOverview UA,jQuery的 $.browser 对象非常难使用
 * @ignore
 * @author dxq613@gmail.com
 */
define("btrjslibs/base/1.0.0/ua-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    function numberify(s) {
        var c = 0;
        // convert '1.2.3.4' to 1.234
        return parseFloat(s.replace(/\./g, function() {
            return c++ === 0 ? "." : "";
        }));
    }
    function uaMatch(s) {
        s = s.toLowerCase();
        var r = /(chrome)[ \/]([\w.]+)/.exec(s) || /(webkit)[ \/]([\w.]+)/.exec(s) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(s) || /(msie) ([\w.]+)/.exec(s) || s.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(s) || [], a = {
            browser: r[1] || "",
            version: r[2] || "0"
        }, b = {};
        a.browser && (b[a.browser] = !0, b.version = a.version), b.chrome ? b.webkit = !0 : b.webkit && (b.safari = !0);
        return b;
    }
    var UA = $.UA || function() {
        var browser = $.browser || uaMatch(navigator.userAgent), versionNumber = numberify(browser.version), /**
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
    }();
    return UA;
});
