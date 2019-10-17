//获取文章列表数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(res) {
        // console.log(res);

        // location.reload();
        var html = template('postsTpl', res);
        $('#postsBox').html(html);
    }
})


// 处理日期时间格式

function dateFormat(date) {
    //将日期事件字符串转化为日期对象
    date = new Date(date);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
}
// template.defaults.import