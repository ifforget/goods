
$(function(){

    let data;
    // renderLeft()
    location()
    eventList()
  

    //本地获取数据
    function location() { 
        let sessStr = sessionStorage.getItem("list")
        
       
        if(!sessStr){
            renderLeft()
        }else{
             let sessobj=JSON.parse(sessStr)
            if(Date.now()-sessobj.time>50000){
                console.log('重新获取')
            //重新获取数据
            renderLeft()
          }else{
            console.log('存储获取')
            data=sessobj.data
            //左边
            renderleft()
            //右边
            renderright(0);

          }

        }
  
     }
  
    //最开始$ajax请求
    function renderLeft(){
        $.ajax({
        url:"http://api.pyg.ak48.xyz/api/public/v1/categories",
        type:"get",
        success:function(result){
            if(result.meta.status == 200){
               data = result.data
               let sessionObj={data:data,time:Date.now()};
               sessionStorage.setItem("list",JSON.stringify(sessionObj))
               renderright(0);
               renderleft()
             
            }else{
                console.log('失败')
            }
        }
        
    })
    }

   

    // 负责 绑定 页面当中的 一坨事件
  function eventList() {  
    // 1 左侧菜单的点击事件  委托 委派
    // touchstart 原生的触屏事件  

    $(".left_list ").on("tap","li",function () {
    
      $(this).addClass("active").siblings().removeClass("active");

      // 获取 被点击的li标签的索引 $(this).index()
      let index=$(this).index();
      renderright(index);
      
    })
  }
    
    //左边
    function renderleft(){
        let html ="";
                for(let i = 0;i < data.length ;i++){
                    let temphtml =`
                    <li class="${ i==0?'active':''}">${data[i].cat_name}<li>
                    
                    `;
                    html+=temphtml;
                }
                $(".left_list").html(html)
                var leftScroll = new IScroll('.left');
    }
    //右边
    function renderright(index){
        let item20bj = data[index]
        let rightData = item20bj.children
        let righthtml = template("rightp1",{arr:rightData})
        $('.bs-popover-right').html(righthtml);
        //获取要动态渲染的图片长度
        let rightimg=$('.bs-popover-right img').length;
        $('.bs-popover-right img').on('load',function(){
            rightimg--
            if(rightimg===0){
            var rightScroll = new IScroll('.bs-popover-right')
            }
        })
    }
    
})