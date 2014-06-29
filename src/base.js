	var $ = require("jquery");
	var JSON = require("./json");

  	var base = {};

	var _baseUrl = "http://localhost:8000/";

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

	/**
	 * 去掉字符串左右两边的空格
	 * 
	 * @method trimStr
	 * @param {Object} obj 需要处理的对象
	 * @return {String} 处理完成后的obj字符串
	 */
	base.trimStr = function(obj){  
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
				if(pIndex!=-1)
					return rst.result.data[0][pIndex];
				else
					return null;
			}else{
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
	base.goPage = function(url){
		window.location.href = url;
	};
	
	/**
	 * 后退页面
	 * 
	 * @method back
	 */
	base.back = function(){
		history.back();
	};

	/**
	 * 重载页面
	 * 
	 * @method reload
	 */
	base.reload = function(){
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
		if (r != null)
			return r[2];
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
	Array.prototype.remove=function(dx)
	{
	    if(isNaN(dx)||dx>this.length){return false;}
	    for(var i=0,n=0;i<this.length;i++)
	    {
	        if(this[i]!=this[dx])
	        {
	            this[n++]=this[i];
	        }
	    }
	    this.length-=1;
	};


	//全局Ajax配置
	$(function(){
		$.ajaxSetup({
			async : true,
			timeout: 30000,
			dataType: 'json',
			type : 'GET',
			beforeSend:function(xhr){
				//console.info("query beforeSend.");
				//可以设置自定义标头
				//xhr.setRequestHeader('Content-Type', 'application/xml;charset=utf-8');
			},
			error:function(xhr, status, e){
				alert("抱歉，请求服务器出现异常！");
			},
			complete:function(xhr, status){
				//console.info("query complete.");
			}
		});
	});

  module.exports = base;