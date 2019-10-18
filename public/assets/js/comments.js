$.ajax({
    type: 'get',
    url: '/comments',
    success: function(res) {
        console.log(res);
        var html = template('commentsTpl', res);
        $('#commentsBox').html(html);
        var page = template('pageTpl', res);
        $('.pagination').html(page);
    }
})

function dateFormat(date) {
    //将日期事件字符串转化为日期对象
    date = new Date(date);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
}




//编辑页码事件
function changePage(pageNum) {
    // console.log(pageNum);
    $.ajax({
        type: 'get',
        url: '/comments',
        //获取数据当前页码
        data: { page: pageNum },
        success: function(res) {
            // console.log(res);

            // location.reload();
            //渲染页面
            var html = template('commentsTpl', res);
            $('#commentsBox').html(html);
            var page = template('pageTpl', res);
            $('.pagination').html(page);
        }
    })
}


$('#commentsBox').on('click', '.status', function() {
    //获取被点击用户的id
    var id = $(this).parent().attr('data-id');
    var status = $(this).parent().attr('data-status');
    $.ajax({
        type: 'put',
        url: `/comments/${id}`,
        data: { state: status == 1 ? 0 : 1 },
        success: function(res) {
            location.reload();
        }
    })

})


//删除功能
$('#commentsBox').on('click', '.delete', function() {
    //获取被点击用户的id
    var bool = confirm('确定要删除吗?')
    if (bool) {
        var id = $(this).parent().attr('data-id');
        $.ajax({
            type: 'delete',
            url: `/comments/${id}`,
            success: function(res) {
                location.reload();
            }
        })

    }

})