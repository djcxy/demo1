//获取所属分类数据
$.ajax({

    url: '/categories',
    type: 'get',
    success: function(res) {
        //渲染页面
        var html = template('categoryTpl', { data: res })
        $('#category').html(html);
    }
})


//文章封面上传事件
$('#feature').on('change', function() {
    //获取文件
    var file = this.files[0];
    //formData 收集数据  上传文件
    var formData = new FormData();
    formData.append('avatar', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉ajax不要解析请求参数
        processData: false,
        //告诉ajax不要设置请求参数
        contentType: false,
        success: function(res) {


            // console.log(res);
            $('.thumbnail').attr('src', res[0].avatar).show();
            $('#thumbnail').val(res[0].avatar)
        }
    })
})





$('#addForm').on('submit', function() {
    //获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    //阻止表单默认提交的行为
    $.ajax({

        url: '/posts',
        type: 'post',
        data: formData,
        success: function(res) {
            //文章添加成功跳转到列表页面
            location.href = '/admin/posts.html'
        }
    })
    return false;
})