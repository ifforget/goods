checkPermission()
function checkPermission(){
    //获取本地储存的userinfo数据
    let userinfoStr = sessionStorage.getItem("userinfo");
    //判断是否存在
    if(!userinfoStr){
        //存一下当前页面
        sessionStorage.setItem('pageurl',location.href)
        //不存在就跳转登录页面
        location.href="login.html"
        return;
    }
}