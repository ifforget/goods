"use strict";

$(function () {
  init();

  function init() {
    eventList();
  }

  function eventList() {
    //点击 登录按钮事件
    $('.login_btn').on("tap", function () {
      console.log('进来了'); //获取用户和密码

      var username_text = $("input[name='username']").val().trim();
      var password_text = $("input[name='password']").val().trim(); //验证合法性

      if (!checkPhone(username_text)) {
        //不通过
        mui.toast('手机不合法');
        return;
      }

      if (password_text.leng < 6) {
        mui.toast('密码不合法');
        return;
      }

      $.ajax({
        url: "http://api.pyg.ak48.xyz/api/public/v1/login",
        type: "post",
        data: {
          username: username_text,
          password: password_text
        },
        success: function success(result) {
          if (result.meta.status == 200) {
            //成功,把数据放入本地存储,存对象的时候转换json格式
            sessionStorage.setItem("userinfo", JSON.stringify(result.data));
            mui.toast("登录成功");
            setTimeout(function () {
              location.href = "index.html";
            }, 1000);
          } else {
            //错误
            mui.toast(result.meta.msg);
          }
        }
      });
    });
  } // 验证 手机合法性


  function checkPhone(phone) {
    if (!/^1[34578]\d{9}$/.test(phone)) {
      return false;
    } else {
      return true;
    }
  }
});
//# sourceMappingURL=login.js.map
