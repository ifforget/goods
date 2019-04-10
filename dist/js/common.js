"use strict";

$(function () {
  // zepto的ajax 发送前 都会被拦截到这里
  $.ajaxSettings.beforeSend = function (xhr, obj) {
    // console.log("发送前 拦截器 ");
    // 显示正在等待图标
    $("body").addClass("loadding");
  }; // zepto ajax 发送成功 回来数据之后 后会被拦截


  $.ajaxSettings.complete = function () {
    // console.log("发送后 拦截器 ");
    // 结束 正在等待的图标
    $("body").removeClass("loadding");
  };
});
//# sourceMappingURL=common.js.map
