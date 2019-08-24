/* 
  author: deng
  date: 2019/07/19
  description: Image lazy loading plugin
*/
(function (root) {
  /* 
    图片懒加载其核心思想是：
      1、先将img标签中的src链接设为同一张图片，真正的图片地址存储在img标签的自定义属性中。
      2、当js监听到该图片元素进入可视窗口时，将自定义属性中的地址存储到src属性中。

    基于jQuery开发一个懒加载插件，实现步骤：
    1、通过jQuery拾取img元素，如果是jQuery对象直接处理，如果不是进行包装，包装成jQuery对象，最终merge成数组。
    2、对读取到的元素src属性转移到loadSrc属性中。并将src属性赋予默认图片路径。
    3、对元素绑定滑动事件，当进入视窗内，切换属性。
  */
  var defaultImg = './loading.png',
      // 初始化img元素
      elemList=[],
      // img元素个数
      imgLen=0,
      // 添加监听
      addEventListener = root.addEventListener,
      // 移除监听
      removeEventListener = root.removeEventListener;
  // 初始化
  var init = function (selector) {
    var index=0;
    if (!selector) return;
    // 判断是否是jQuery对象
    if (typeof selector === 'string') {
      elemList = $(selector);
    } else if (selector instanceof jQuery) {
      elemList = selector;
    }
    elemList = jQuery.merge([], elemList)
    // 过滤非img元素
    elemList = elemList.filter(elem => elem.nodeName === 'IMG')
    imgLen = elemList.length;
    // 保存所有元素中的src属性
    for(; index<imgLen; index++) {
      // 将src中的属性保存到loadSrc
      loadAccess(elemList[index], 'src', 'loadSrc');
    }
    // 初始化加载视窗内的图片
    loadImg()
    return elemList;
  }

  // 实现保存src、加载src、删除属性功能
  function loadAccess (elem, src, dist, clearAttr) {
    var cache;
    if (!elem) return;
    if (src && dist) {
      if (!elem.getAttribute(dist)) {
        elem.setAttribute(dist, defaultImg);
      }
      if (elem.getAttribute(src)) {
        cache = elem.getAttribute(dist);
        elem.setAttribute(dist, elem.getAttribute(src));
        elem.setAttribute(src, cache);
      }
    } else if (clearAttr) {
      elem.removeAttribute(clearAttr);
    }
  }

  // 节流处理
  function throttle(fn, delay){
    let timer = null;
    return function(){
      if(timer) return;
      timer = setTimeout(()=>{
        fn.apply(this, arguments);
        timer = null;
      },delay);
    }
  }

  // 滑动加载图片
  function loadImg (event) {
    var scrollTop = 0, 
        scrollLeft = 0,
        visiableWidth = root.innerWidth, // 可视窗口宽
        visiableHeight = root.innerHeight; // 可是窗口高
    if (event) {
      scrollTop = event.target.documentElement.scrollTop
      scrollLeft = event.target.documentElement.scrollLeft
    }
    // 遍历扫描img元素是否进入可视区域
    for(var index=0; index<elemList.length; index++) {
          offsetTop = elemList[index].offsetTop - scrollTop;
          offsetLeft = elemList[index].offsetLeft - scrollLeft;
      // 进入可视区域加载图片
      if (offsetTop < visiableHeight && offsetLeft < visiableWidth) {
          // 将loadSrc中的图片地址读取到src属性中
          loadAccess(elemList[index], 'loadSrc', 'src');
          // 移除缓存属性loadSrc
          loadAccess(elemList[index], null, null, 'loadSrc');
          elemList.splice(index, 1);
          index--;
      }
    }
    imgLen = elemList.length
    if (imgLen===0) {
      // 加载完成，移除监听
      removeEventListener && removeEventListener('scroll', function () {
        console.log('图片加载完成')
      })
    }
  }

  // 监听图片位置变化
  addEventListener && addEventListener('scroll', throttle(loadImg, 100), false)

  root.lazyLoad = init
})(this)