define(function(require, exports, module) {
	var $ = require("$");
	var JSON = require("./json");

  	var base = {};

	var _baseUrl = "http://localhost:8080/mail/";

	base.baseUrl = function(){
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
	base.formatParams = function(heads,params){
		var jsonObj = new Object();
		jsonObj.head= heads;
		$.each(params,function(index,value){
			params[index] = base.isNull(value)==true?null:value;
		});
		jsonObj.data=params;
		return JSON.toJsonString(jsonObj);
	};

  module.exports = base;

});
