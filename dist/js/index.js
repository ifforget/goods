"use strict";

$(function () {
  init(); // js一加载就执行的 方法 入口

  function init() {
    swiperdata();
    catitems();
    goodslist();
  } // 获取首页轮播图的数据


  function swiperdata() {
    $.ajax({
      url: "http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata",
      type: "get",
      success: function success(result) {
        //  判断请求是否成功
        if (result.meta.status === 200) {
          // 获取要渲染的数据 data=[]
          var data = result.data; // console.log(data);
          // 生成要渲染的html标签

          var html = template("swiperTpl", {
            arr: data
          }); // 把标签插入到 轮播图的 div中

          $(".pyg_slide").html(html); // 初始化轮播图

          var gallery = mui(".mui-slider");
          gallery.slider({
            interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；

          });
        } else {
          console.log("请求失败", result);
        }
      }
    });
  } // 获取分类菜单数据


  function catitems() {
    // $.ajax({})
    // $.get(接口的路径，发送到后台去的参数|可以不传，成功的回调函数)
    $.get("http://api.pyg.ak48.xyz/api/public/v1/home/catitems", function (result) {
      if (result.meta.status == 200) {
        // 请求成功
        // 要渲染的数据 数组
        var data = result.data; // 要拼接html

        var html = "";

        for (var i = 0; i < data.length; i++) {
          var tmpHtml = "\n          <a href=\"javascript:;\">\n          <img src=\"".concat(data[i].image_src, "\" alt=\"\">\n           </a>\n          ");
          html += tmpHtml;
        } // 把分类的标签 插入到  容器中


        $(".pyg_cates").html(html);
      } else {
        console.log("请求失败", result);
      }
    });
  } // 获取首页商品列表数据


  function goodslist() {
    $.get("http://api.pyg.ak48.xyz/api/public/v1/home/goodslist", function (result) {
      if (result.meta.status == 200) {
        //  成功
        // 获取要渲染的数据
        var data = result.data; // 生成要渲染的数据

        var html = template("listTpl", {
          arr: data
        });
        $(".pyg_goodslist").html(html);
      } else {//  失败
      }
    });
  }
});
//# sourceMappingURL=index.js.map
