$(function(){
    let QueryObj ={
        query:"",
        cid:getUrl('cid'),
        pagenum:1,
        pagesize:10

    }

    let TotalPage = 1;

  init();
  function init() {

    eventList()
    // 开始调用mui的下拉组件
    mui.init({
      pullRefresh: {
        container: ".pyg_view",
        // 下拉刷新组件的配置
        down: {
          // 一打开页面的时候 自动显示 下拉刷新组件
          auto: true,
          //  触发下拉刷新时自动触发
          callback: function() {
            // 一旦看到下拉刷新组件 就表示 该代码也会一起被执行
            let cb = function(data) {
              let html = template("mainTpl", { arr: data });
              $(".list").html(html);

              // 结束下拉刷新
              mui(".pyg_view")
                .pullRefresh()
                .endPulldownToRefresh();

                // 重置 上拉组件
                mui('.pyg_view').pullRefresh().refresh(true);
            };

            // 重置页码 变成第一页
            QueryObj.pagenum=1;
          
            goodsSearch(cb);
          }
        },
        // 上拉加载下一页的配置
        up: {
          //  触发上拉刷新时自动触发
          callback: function() {
            // 判断有没有下一页的数据
            if (QueryObj.pagenum >= TotalPage) {
              console.log("没有数据 不要再划了 网页都要崩掉！");

              mui(".pyg_view")
              .pullRefresh()
              .endPullupToRefresh(true);
            } else {
              console.log("还有数据 准备 下一次的请求");
              QueryObj.pagenum++;

              // 定义数据回来之后的逻辑
              let cb = function(data) {
                let html = template("mainTpl", { arr: data });
                // append 追加
                $(".list").append(html);

             
                mui(".pyg_view")
                  .pullRefresh()
                  .endPullupToRefresh(false);
              };

              goodsSearch(cb);
            }
          }
        }
      }
    });
  }

  // 获取商品列表数据
  function goodsSearch(func) {
    // $.get("地址","？参数对象",成功的回调函数)
    $.get(
      "http://api.pyg.ak48.xyz/api/public/v1/goods/search",
      QueryObj,
      function(result) {
        // 判断请求成功
        if (result.meta.status == 200) {
          // 成功
          // 模板要渲染的数据
          let data = result.data.goods;

          // 计算总页码
          TotalPage = Math.ceil(result.data.total / QueryObj.pagesize);
          console.log(TotalPage);

          func(data);
        } else {
          console.log("失败", result);
        }
      }


    );
  }

  function eventList(){
    $('.list').on('tap',"a",function(){
      let href = this.href;
      location.href=href
    })
  }
    


    // 获取url上的参数 的值
  function getUrl(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }
})