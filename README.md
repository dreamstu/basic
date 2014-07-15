# basic

basic 是一个基础组件，提供一些常用功能,包括但不限于Json、cookie的快捷支持。

---

[![Build Status](https://travis-ci.org/dreamstu/base.svg?branch=master)](https://travis-ci.org/dreamstu/basic)
[![spm version](http://spmjs.io/badge/basic)](http://spmjs.io/package/basic)

一套方便灵活的高可用的前端组合框架.


---

## Usage

It is very easy to use this module.

```javascript
seajs.use('index', function(base) {
	//write your some code...
	like base.baseUrl();...
});
```

## Api
---

### isEmpty `object.isEmpty(obj)`	*Object*
在需要判断某一对象是否为空（指的是为空字符串或者null）时，使用 `object.isEmpty(obj)` 函数，该函数返回一个*Boolean*。

````javascript
seajs.use(['jquery','index'], function($,base) {
	$("#isEmptyBtn").on('click',function(){
		var obj = prompt("请输入点什么吧！","null");
		$("#isEmpty").html(base.isEmpty(obj)+"");
	});
});
````

````html
<span>
	<button id="isEmptyBtn">点击我进行测试</button>
	执行后结果：
	<span id="isEmpty"></span>
</span>
````


### isUndefined `object.isUndefined(obj)`	*Object*
判断变量的值是否是 undefined，当 o 的值是 undefined 时返回 true *Boolean*。

````javascript
seajs.use(['jquery','index'], function($,base) {
	$("#isUndefinedBtn").on('click',function(){
		var obj = prompt("请输入点什么吧！","undefined");
		$("#isUndefined").html(base.isUndefined(obj)+"");
	});
});
````

````html
<span>
	<button id="isUndefinedBtn">点击我进行测试</button>
	执行后结果：
	<span id="isUndefined"></span>
</span>
````


### isNull `object.isNull(obj)`	*Object*
判断变量的值是否是 null，当 o 的值是 null 时返回 true *Boolean*。

````javascript
seajs.use(['jquery','index'], function($,base) {
	$("#isNullBtn").on('click',function(){
		$("#isNull").html(base.isNull(null)+"|"+base.isNull("null"));
	});
});
````
````html
<span>
	<button id="isNullBtn">点击我进行测试</button>
	执行后结果：
	<span id="isNull"></span>
</span>
````

### isNumber `object.isNumber(obj)`	*Object*
判断变量的类型是否是 Number，当 o 的类型是 number 时返回 true *Boolean*。
--
   * @param {Mixed} o 传入被检测变量的名称
````javascript
seajs.use(['jquery','index'], function($,base) {
	$("#isNumberBtn").on('click',function(){
		$("#isNumber").html(base.isNumber(123)+"|"+base.isNumber("123"));
	});
});
````
````html
<span>
	<button id="isNumberBtn">点击我进行测试</button>
	执行后结果：
	<span id="isNumber"></span>
</span>
````

### isBoolean|isString|isObject|isArray|isArguments|isFunction	*Object*
该函数返回一个*Boolean*。



### $typeof `object.$typeof(obj)`	*Object*
判断变量的类型是否是什么 ，返回变量的类型，如果不识别则返回 other *String*。
--
     * @param {Mixed} o 传入被检测变量的名称
````javascript
seajs.use(['jquery','index'], function($,base) {
	$("#typeofBtn").on('click',function(){
		var obj = prompt("请输入点什么吧！","null");
		$("#typeof").html(base.$typeof(obj)+"|"+base.$typeof(123)+"|"+base.$typeof(true)+"|"+base.$typeof(function(){}));
	});
});
````
````html
<span>
	<button id="typeofBtn">点击我进行测试</button>
	执行后结果：
	<span id="typeof"></span>
</span>
````

### isBoolean|isString|isObject|isArray|isArguments|isFunction	*Object*
该函数返回一个*Boolean*。


### formatParams `object.formatParams(heads,params)`	*Array*,*Array*。
在需要序列化提交参数(自动将参数中的空字符串转换成null，
并且将提交参数转化成json对象)时，
使用 `object.formatParams(heads,params)` 函数，该函数返回一个*Json*。

````javascript
seajs.use(['jquery','index'], function($,base) {
	$("#formatParamsBtn").on('click',function(){
		var heads = new Array("id","name","sex","age","IDcard");
		var datas = new Array(1,"小白","男",null,"");
		var json = base.formatParams(heads,datas);
		console.log(json);
		$("#formatParams").html(json);
	});
});
````

````html
<span>
	<button id="formatParamsBtn">点击我进行测试</button>
	执行后结果：
	<span id="formatParams"></span>
</span>
````


### autoInsertDataByParam `object.autoInsertDataByParam(rst,params)`	*Json*,*Array*
在需要根据DOM节点ID自动将服务器返回的json数据插入页面DOM中时，使用 `object.autoInsertDataByParam(rst,params)` 函数。

````javascript
seajs.use(['jquery','index'], function($,base) {
	$("#autoInsertDataByParamBtn").on('click',function(){
		//准备的模拟服务器返回的json数据
		var rst = $.parseJSON('{"msg":"","state":0,"result":{"len":1,"head":["id","name","age"],"data":[[1,"小白","22"]]}}');
		var params = new Array("id","name","age");
		base.autoInsertDataByParam(rst,params);
	});
});
````

````html
<span>
	<button id="autoInsertDataByParamBtn">点击我进行测试</button>
	<br/><br/>
	执行后结果：
	<br/><br/>
	id：<input id="id" type="text"/>
	name：<input id="name" type="text"/>
	age：<input id="age" type="text"/>
</span>
````

### getValueByHead `object.getValueByHead(rst,head)`	*Json*,*String*
在需要解析服务器返回的JSON对象数据，获取某一head头所对应的data数据时，
使用 `object.getValueByHead(rst,head)` 函数，该函数返回一个*String*。

````javascript
seajs.use(['jquery','index'], function($,base) {
	$("#getValueByHeadBtn").on('click',function(){
		//准备的模拟服务器返回的json数据
		var rst = $.parseJSON('{"msg":"","state":0,"result":{"len":1,"head":["id","name","age"],"data":[[1,"小白","22"]]}}');
		alert(base.getValueByHead(rst,"id"));
		alert(base.getValueByHead(rst,"name"));
		alert(base.getValueByHead(rst,"age"));
	});
});
````

````html
<span>
	<button id="getValueByHeadBtn">点击我进行测试</button>
	<br/><br/>
	执行后结果：【请点击上边的按钮，在乎一下弹出框中的值好吗。。。】
</span>
````

### createJsonData `object.createJsonData(head,data)`	*Array*,*Array*
在需要创建json对象，生成GsonHeadOneRow时，使用 `object.createJsonData(head,data)` 函数，该函数多用于提交数据时生成json数据对象，该函数返回一个*Json*。

````javascript
seajs.use(['jquery','index'], function($,base) {
	$("#createJsonDataBtn").on('click',function(){
		//准备的模拟服务器返回的json数据
		var head = Array("name","age","sex","id");
		var data = Array("发哥",21,"男",100);
		var json = base.createJsonData(head,data);
		console.log(json);
	});
});
````

````html
<span>
	<button id="createJsonDataBtn">点击我进行测试</button>
	执行后结果：请打开控制台查看log
</span>
````


### goPage `object.goPage(url)`	*String*
在需要重定向页面时，使用 `object.goPage(url)` 函数。

````javascript
seajs.use(['jquery','index'], function($,base) {
	$("#goPageBtn").on('click',function(){
		//打开网址：http://www.dreamstu.com/
		base.goPage("http://www.dreamstu.com/");
	});
});
````

````html
<span>
	<button id="goPageBtn">点击我进行测试</button>
	执行后结果：你懂的、、、
</span>
````


### back `object.back()`
在需要后退页面时，使用 `object.back()` 函数。

````javascript
seajs.use(['jquery','index'], function($,base) {
	$("#backBtn").on('click',function(){
		//后退
		base.back();
	});
});
````

````html
<span>
	<button id="backBtn">点击我进行测试</button>
	执行后结果：你懂的、、、
</span>
````


### reload `object.reload()`
在需要重载页面时，使用 `object.reload()` 函数。

````javascript
seajs.use(['jquery','index'], function($,base) {
	$("#reloadBtn").on('click',function(){
		//重载页面
		base.reload();
	});
});
````

````html
<span>
	<button id="reloadBtn">点击我进行测试</button>
	执行后结果：你懂的、、、
</span>
````

### getCurrUrl `object.getCurrUrl()`
在需要获取当前页面url地址时，使用 `object.getCurrUrl()` 函数，该函数返回一个*String*。

````javascript
seajs.use(['jquery','index'], function($,base) {
	$("#getCurrUrlBtn").on('click',function(){
		//重载页面
		$("#getCurrUrl").html(base.getCurrUrl());
	});
});
````

````html
<span>
	<button id="getCurrUrlBtn">点击我进行测试</button>
	执行后结果：<span id="getCurrUrl"></span>
</span>
````


### getUrlParam `object.getUrlParam(name)` *String*
在需要获取url参数时，使用`object.getUrlParam(name)` 函数，该函数返回一个*String*。

````javascript
seajs.use(['jquery','index'], function($,base) {
	//请自己给当前地址加上请求参数	?id=100&name=小白 
	var id = base.getUrlParam("id");
	var name = base.getUrlParam("name");
	$("#getUrlParam").html("ID："+id+"	Name:"+name);
});
````

````html
执行后结果：
	<span id="getUrlParam"></span>
````

### random(min, max) *Number|Number*
生成随机数的方法

>@param {Number} min 生成随机数的最小值
>@param {Number} max 生成随机数的最大值
>@return {Number} 返回生成的随机数

---


### clone(o) *Object*
克隆一个对象

>@param {Object} o 要克隆的对象
>@return {Object} 返回通过克隆创建的对象

````js
	var objA = {name: "Kinvix"};
	// 克隆一个 objA 对象，并存入 objB 中。
	var objB = clone(objA);
````
---



### $return(result) *Object*
生成一个返回值是传入的 value 值的函数

>@param {Mixed} value 要返回的值
>@return {Mixed} 返回一个返回值是 value 的函数

---




### $try() 
按顺序执行 funcA, funcB, funcC，当中途有一个 func 的执行结果返回 true 则不再往下执行，并返回成功执行的 func 的返回值；


````js
$try(funcA, funcB, funcC....);
````

---




### now()
获取当前时间的函数

---




### timedChunk(items, process, context, isShift, callback)
通用分时处理函数

---


### getLength(obj)
获取对象自身具有的属性和方法的数量

>@param {Object} obj 要获取的对象

>@return {Number} 返回对象自身具有属性和方法的数量

---


### emptyFunc()
一个空函数函数

>@return {Number} 返回一个空函数

---



### pass(func, var_args)
给函数传入参数并执行

>@param {Mixed} args 参数列表

>@return {Mixed} 返回函数执行结果

示例：

````js
	// 将"a"、"b"两个字符串传入funcA函数并执行
    funcA.pass("a","b");
````

---




### bind(func, context, var_args)
将一个函数绑定给一个对象作方法，返回的函数将总被传入{@code obj} as {@code this}

>@param {Function} func 要绑定的函数

>@param {Object} contextObj 要绑定的对象

>@param {Mixed} args 参数列表，长度任意

>@return {Function} 返回一个被绑定this上下文对象的函数


示例：

````js
	funcB = bind(funcA, obj, a, b)
    funcB(c, d) // 相当于执行 funcA.call(obj, a, b, c, d)
````

---

