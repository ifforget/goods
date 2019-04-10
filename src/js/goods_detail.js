

$(function () {
    let GoodsObj={};
    init()
    function init(){
      goodsDate() 
      eventList()
    }
   

    function goodsDate() {
        $.ajax({
            type: "get",
            url: "http://api.pyg.ak48.xyz/api/public/v1/goods/detail",
            // datatype: 'json',
            data:{goods_id:getUrl("goods_id")},
            success: function (result) {
                if (result.meta.status == 200) {
                    //商品信息
                    GoodsObj={
                        cat_id:result.data.cat_id,
                        goods_id:result.data.goods_id,
                        goods_name:result.data.goods_name,
                        goods_number:result.data.goods_number,
                        goods_price:result.data.goods_price,
                        goods_small_logo:result.data.goods_small_logo,
                        goods_weight:result.data.goods_weight
                    };
                    //需要的数据
                    let data = result.data
                    let htmls=template("main",data)
                    $(".pyg_view").html(htmls)


                    // 轮播图的js 初始
                    var gallery = mui(".mui-slider");
                    gallery.slider({
                        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
                    });
                } else {
                    console.log('请求失败')
                }


            }
        })



    }


    function eventList() {
        // 绑定 加入购物车 点击 事件
        $(".shoopping_car_btn").on("tap",function () {
            let userStr = sessionStorage.getItem("userinfo")
            if(!userStr){
          // 弹出 mui的消息提示框 自动消失
            mui.toast("您还没有登录");
            setTimeout(()=>{
                sessionStorage.setItem("pageurl",location.href);
                location.href="login.html"
            },1000)
            }else{
                let token = JSON.parse(userStr).token
                $.ajax({
                    url: "http://api.pyg.ak48.xyz/api/public/v1/my/cart/add",
                    type:"post",
                    data:{
                        info:JSON.stringify(GoodsObj)
                    },
                    headers:{
                        Authorization: token
                    },
                    success:function(result){
                        if(result.meta.status==200){
                            mui.confirm("您是否要跳转购物车网页","添加成功",["跳转","取消"],function(editType){
                                if(editType.index==0){
                                    location.href="cart.html"
                                }else if(editType==1){
                                    console.log('取消')
                                }
                            })
                        }else{
                            mui.toast(result.meta.msg)
                        }
                    }
                })
            }
        
        })
        
      }
      function goodsDatail(){
          $.get(
            "http://api.pyg.ak48.xyz/api/public/v1/goods/detail",
            {
                goods_id:getUrl("goods_id")
            },
            function(result){
                if(result.meta.msg==200){
                    //给全局商品信息对象赋值
                    GoodsObj={
                        cat_id:result.data.cat_id,
                        goods_id:result.data.goods_id,
                        goods_name:result.data.goods_name,
                        goods_number:result.data.goods_number,
                        goods_price:result.data.goods_price,
                        goods_small_logo:result.data.goods_small_logo,
                        goods_weight:result.data.goods_weight
                    };
                    let data = result.data;
                    let html = template("mainTpl",data)
                    $(".pyg_view").html(html)

                    //轮播图js初始化
                    var gallery = mui(".mui-slider")
                    gallery.slider({
                        interval:5000
                    })

                }else{
                    console.log('请求失败',result)
                }
            }

          )
      }

    // 获取url上的参数 的值
    function getUrl(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }


})