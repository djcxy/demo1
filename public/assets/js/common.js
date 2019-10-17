$('#logout').on('click', function() {

    var bool = confirm('你确认要退出吗')
    if (bool) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function() {
                //如果退出正确跳转到登入页面
                location.href = 'login.html'
            }




        })



    }
})