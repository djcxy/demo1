$('#modifyForm').on('submit', function() {
    //获取用户在表单中输入的内容
    var formData = $(this).serialize();

    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function() {
            //如果密码修改成功的话就跳转到登入页面
            location.href = '/admin/login.html';


        }

    })
    return false;
})