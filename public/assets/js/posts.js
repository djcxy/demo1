//获取文章列表数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(res) {
        // console.log(res);

        // location.reload();
        var html = template('postsTpl', res);
        $('#postsBox').html(html);
        var page = template('pageTpl', res);
        $('.pagination').html(page);

    }
})


// 处理日期时间格式

function dateFormat(date) {
    //将日期事件字符串转化为日期对象
    date = new Date(date);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
}
// template.defaults.import

//编辑事件

function changePage(pageNum) {

    // console.log(pageNum);
    $.ajax({
        type: 'get',
        url: '/posts',
        //获取数据当前页码
        data: { page: pageNum },
        success: function(res) {
            // console.log(res);

            // location.reload();
            //渲染页面
            var html = template('postsTpl', res);
            $('#postsBox').html(html);
            var page = template('pageTpl', res);
            $('.pagination').html(page);

        }
    })


}


//索要并且渲染分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        // console.log(res);
        //获取模板
        var html = template('categoryTpl', { data: res });
        // 将模板添加到categoryBox里(渲染到页面上)
        $('#categoryBox').html(html);

    }
})

//给筛选按钮添加筛选功能
$('#filterForm').on('submit', function() {
    //自动获取表单数据
    var formData = $(this).serialize();
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function(res) {
            var html = template('postsTpl', res);
            $('#postsBox').html(html);
            var page = template('pageTpl', res);
            $('.pagination').html(page);

        }
    })
    return false;
})