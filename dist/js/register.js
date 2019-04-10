"use strict";

$(function () {
  init();

  function init() {
    evenList();
  }

  function evenList() {
    //绑定验证码获取点击事件
    $(".get_code_btn").on("tap", function () {
      var mobile_text = $("input[name='mobile']").val().trim(); //判断正则表达式

      if (!checkPhone(mobile_text)) {
        //不正确弹框
        mui.toast("手机号码有错误");
        return;
      }

      $.ajax({
        url: "http://api.pyg.ak48.xyz/api/public/v1/users/get_reg_code",
        type: "post",
        data: {
          mobile: mobile_text
        },
        success: function success(result) {
          if (result.meta.status == 200) {
            console.log(result); //成功
            //禁止按钮

            $(".get_code_btn").attr("disabled", "disabled"); //开启定时器

            var time = 5;
            $(".get_code_btn").text("".concat(time, "\u79D2\u540E\u91CD\u65B0\u83B7\u53D6"));
            var timeId = setInterval(function () {
              time--;
              $(".get_code_btn").text("".concat(time, "\u79D2\u540E\u91CD\u65B0\u83B7\u53D6"));

              if (time == 0) {
                clearInterval(timeId); //修改文字

                $(".get_code_btn").removeAttr("disabled").text("获取验证码");
              }
            }, 1000);
          } else {
            console.log('请求失败', result);
          }
        }
      });
    });
  } //绑定 点击注册 的按钮事情


  $(".register_btn").on("tap", function () {
    //获取一堆值
    var mobile_text = $("input[name='mobile']").val().trim();
    var code_text = $("input[name='code']").val().trim();
    var email_text = $("input[name='email']").val().trim();
    var pwd_text = $("input[name='pwd']").val().trim();
    var pwd2_text = $("input[name='pwd2']").val().trim();
    var gender_text = $("input[name='gender']").val().trim(); //验证每一个

    if (!checkPhone(mobile_text)) {
      mui.toast("手机号码错误");
      return;
    }

    if (code_text.length != 4) {
      mui.toast('验证码不合法');
      return;
    }

    if (!checkEmail(email_text)) {
      mui.toast("邮箱不合法");
      return;
    }

    if (pwd_text.length < 6) {
      mui.toast("密码格式不对");
      return;
    }

    if (pwd2_text != pwd_text) {
      mui.toast('两次密码不一致');
      return;
    }

    $.ajax({
      url: "http://api.pyg.ak48.xyz/api/public/v1/users/reg",
      type: "post",
      data: {
        mobile: mobile_text,
        code: code_text,
        email: email_text,
        pwd: pwd_text,
        gender: gender_text
      },
      success: function success(result) {
        if (result.meta.status == 200) {
          mui.toast('注册成功');
          setInterval(function () {
            location.href = "login.html";
          }, 1000);
        } else {
          mui.toast(result.meta.msg);
        }
      }
    });
  }); // 验证 手机合法性

  function checkPhone(phone) {
    if (!/^1[34578]\d{9}$/.test(phone)) {
      return false;
    } else {
      return true;
    }
  } // 验证 邮箱


  function checkEmail(myemail) {
    var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;

    if (myReg.test(myemail)) {
      return true;
    } else {
      return false;
    }
  }
});
//# sourceMappingURL=register.js.map
