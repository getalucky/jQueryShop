(function ($) {

    // 获取或设置本地存储
    $.storage = function (key, value) {
        // 功能1：获取功能，如果 value 为 undefined 就是获取
        if (value === undefined) {
            return JSON.parse(localStorage.getItem(key)) || [];
        } else {
            // 功能2：设置功能，传递两个参数就是设置本地存储
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    // 删除一条或清空本地存储
    $.removeStorage = function (key) {
        // 如果是字符串，根据键名称删除一条
        if (typeof key === 'string') {
            localStorage.removeItem(key);
        } else if (key === true) {
            // 如果是 布尔值 true ，清空全部
            localStorage.clear();
        }
    }



    // 添加实例方法：$.fn.方法名 = function(){  }      
    // 调用实例方法：$('选择器').方法名()   
    // 实例方法，这类方法主要是用于操作 DOM 元素的
    $.fn.bgc = function (color) {
        if (typeof color === 'string') {
            // console.log(this, color);
            // 内部的 this 指向调用该方法的 JQ 实例对象
            return this.css('backgroundColor', color);  // 设置返回JQ对象，链式编程
        } else if (color === undefined) {
            return this.css('backgroundColor');         // 获取返回颜色
        }
    }

})(jQuery);