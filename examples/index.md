# Demo

---
Base 是一个基础类，提供一些常用功能,包括但不限于Json、ua、cookie的快捷支持。

## 使用说明

### baseUrl `object.baseUrl()`
在需要获取当前应用访问路径时，使用 `object.baseUrl()` 函数。

````javascript
seajs.use(['$','base'], function($,base) {
	$("#baseUrl").html(base.baseUrl());
});
````

执行后结果：
````html
<span id="baseUrl"></span>
````

### isNull `object.isNull()`
在需要判断某一对象是否为空（指的是为空字符串或者null）时，使用 `object.isNull(obj)` 函数。

````javascript
seajs.use(['$','base'], function($,base) {
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

### formatParams `object.formatParams(heads,params)`
在需要序列化提交参数(自动将参数中的空字符串转换成null，
并且将提交参数转化成json对象)时，
使用 `object.formatParams(heads,params)` 函数。

````javascript
seajs.use(['$','base'], function($,base) {
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

`heads`及`params` 参数类型都为*Array*。
