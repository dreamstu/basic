# Demo

---
Base 是一个基础类，提供一些常用功能,包括但不限于Json、ua、cookie的快捷支持。

## 使用说明

### baseUrl `object.baseUrl()`
在需要获取当前应用访问路径时，使用 `object.baseUrl()` 函数，该函数返回一个*String*。

````javascript
seajs.use(['jquery','index'], function($,base) {
	$("#baseUrl").html(base.baseUrl());
});
````

执行后结果：
````html
<span id="baseUrl"></span>
````

### isNull `object.isNull(obj)`	*Object*
在需要判断某一对象是否为空（指的是为空字符串或者null）时，使用 `object.isNull(obj)` 函数，该函数返回一个*Boolean*。

````javascript
seajs.use(['jquery','index'], function($,base) {
	$("#isNullBtn").on('click',function(){
		var obj = prompt("请输入点什么吧！","null");
		$("#isNull").html(base.isNull(obj)+"");
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


### trimStr `object.trimStr(obj)`	*Object*
在需要去掉字符串左右两边的空格时，使用 `object.trimStr(obj)` 函数，该函数返回一个*String*。

````javascript
seajs.use(['jquery','index'], function($,base) {
	var str = base.trimStr(" 	 hello world!   ");
	console.log(str);
	$("#trimStr").html(str);
});
````

````html
<span>
	执行后结果：
	<span id="trimStr"></span>
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



### buildURI `object.buildURI(uri)` *String*
在需要把字符串作为 URI 组件进行编码时，使用`object.buildURI(uri)` 函数，该函数返回一个*String*。

````javascript
seajs.use(['jquery','index'], function($,base) {
	var str = base.buildURI('id=1&name=小白');
	console.log("uri编码后："+str);
	$("#buildURI").html(str);
});
````

````html
执行后结果：
	<span id="buildURI"></span>
````

### decodingURI `object.decodingURI(uri)` *String*
在需要把字符串作为 URI 组件进行解码时，使用`object.decodingURI(uri)` 函数，该函数返回一个*String*。

````javascript
seajs.use(['jquery','index'], function($,base) {
	var str1 = base.buildURI('id=1&name=小白');
	var str2 = base.decodingURI(str1);
	console.log("uri解码后："+str2);
	$("#decodingURI").html(str2);
});
````

````html
执行后结果：
	<span id="decodingURI"></span>
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