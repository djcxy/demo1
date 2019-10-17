$.ajax({
        type: 'get',
        url: '/categories',
        success: function(res) {
            var html = template('categoriesListTpl', { data: res });
            // console.log(html);

            $("#categoryBox").html(html);



        }
    })
    //表单提交功能
$('#addCategory').on('submit', function() {
    $.ajax({
        type: 'post',
        url: '/categories',
        data: $(this).serialize(),
        success: function(res) {
            location.reload();


        }
    })

    //阻止默认行为
    return false;
})

//编辑功能
$('#categoryBox').on('click', '.edit', function() {
    //获取id
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(res) {
            // console.log(res);

            // location.reload();
            var html = template('modifycategoryTpl', res)
            $('#modifyBox').html(html);
            console.log(html);

        }
    })

})



$('#modifyBox').on('submit', '#modifyCategory', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: $(this).serialize(),
        success: function(res) {
            // console.log(res);

            location.reload();

        }
    })
    return false;
})