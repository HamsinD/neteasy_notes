/* 
  author: deng
  date: 2019/07/19
  description: Form validate plugin
*/
(function (root) {
  /* 
    微量级表单验证插件实现步骤：
    1. 拾取form表单元素
    2. 给form内的input元素绑定绑定配置的validate选项
    3. 监听、校验输入内容，并提示校验结果
  */

  var isPlainObject = function (obj) {
        return toString.call(obj) === '[object Object]'
      },
      isArray = function (obj){
        return toString.call(obj) === '[object Array]'
      }
      validateOption = {};

  // 初始化，拾取表单元素
  var init = function (rules) {
    var len, formElem, i, select, attrStr;
    if (!rules) {
      rules = {};
    }
    formElem = this
    if (formElem[0].nodeName !== 'FORM') {
      console.error('查找不到form元素')
      return
    }
    // 获取form表单里的input元素。
    len = formElem.find("input").length;
    if (len=0) {
      console.error('查找不到input元素！');
    }
    if (isPlainObject(rules)) {
      // 查找到对应的元素，给它分配校验rule
      $.each(rules, function (name, option) {
        attrStr = '*[name='+ name + ']';
        select = formElem.find(attrStr);
        if (select.length>0) {
          for (i=0; i<select.length; i++) {
            addOption.call(select[i], option)
          }
        }
      })
    }
    return this
  }

  // 给表单添加validate option
  function addOption (option) {
    var  i = 0;
    if (isPlainObject(option)) {
        dispatchEvent.call(this, option)
    } else {
      console.error('请检查option参数是否为对象格式！')
    }
  }

  // 分发校验触发事件
  function dispatchEvent(option) {
    var i = 0,
      defaultEvent = option.defaultEvent || "change",
      validateReg = option.validateReg || /\s+/g,
      errMsg = option.errMsg || "";
    if (!(validateReg instanceof RegExp)) {
      console.error('请检查参数validateReg是否为正则表达式')
      return
    }
    // 绑定正则校验事件
    bindEvent.call(this, defaultEvent, validateReg, errMsg);
  }

  // 校验事件
  function bindEvent(defaultEvent, validateReg, errMsg) {
    var value, result, errBox;
    input = $(this)
    errBox = $("<span></span>")
              .addClass("error-msg disabled")
              .text(errMsg)
    // 给每个元素添加error提示框
    input.after(errBox);
    input.on(defaultEvent, function(event) {
      value = event.target.value || "";
      if (!(result = validateReg.test(value))) {
        $(this).next().hasClass("disabled") && $(this).next().removeClass('disabled')
        console.log('添加err元素的')
      } else {
        !$(this).next().hasClass("disabled") && $(this).next().addClass("disabled");
      }
    });
  }

  root.$.fn.validate = init
})(this)