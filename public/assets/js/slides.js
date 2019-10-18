$.ajax({
    type: 'get',
    url: '/slides',
    success: function(res) {
        console.log(res);
        var html = template('slidesTpl', { data: res });
        $('#slidesBox').html(html);
    }
})



$('#file').on('change', function() {
    //用户选择到的文件
    var file = this.files[0];
    //将选中的文件添加到formData对象中
    var formData = new FormData();
    formData.append('avatar', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
            console.log(res);
            // var html = template('slidesTpl', { data: res });
            // $('#slidesBox').html(html);
            // $('.image').attr('src', res[0].avatar).show();
            $('#hiddenImage').val(res[0].avatar)
        }
    })
})



//添加提交功能
$('#slidesForm').on('submit', function() {
    //获取在管理员在表单中输入的内容
    var formData = $(this).serialize();
    $.ajax({
            type: 'post',
            url: '/slides',
            data: formData,
            success: function(res) {
                location.reload();
            }
        })
        //阻止默认行为 页面跳转
    return false;
})

$('#slidesBox').on('click', '.delete', function() {
    //获取被点击用户的id
    var bool = confirm('确定要删除吗?')
    if (bool) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: `/slides/${id}`,
            success: function(res) {
                location.reload();
            }
        })

    }

})