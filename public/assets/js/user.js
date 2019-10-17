//ajax数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function(res) {
        var html = template('userTpl', { data: res });
        // console.log(html);
        $('#userBox').html(html)

    }
})



//给表单添加提交效果
$('#userForm').on('submit', function() {
    // console.log(111);


    //自动收集表单所有数据
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function(res) {


            location.reload(); //刷新当前页面


        }
    })

    return false;


})

//上穿用户头像
$('#modifyBox').on('change', '#avatar', function() {
    // this.files[0]
    var fd = new FormData;
    fd.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: fd,
        //告诉ajax不要解析请求参数
        processData: false,
        //告诉ajax不要设置请求参数
        contentType: false,
        success: function(res) {


            // console.log(res);
            $('#preview').attr('src', res[0].avatar);
            $('#hiddenImg').val(res[0].avatar)
        }
    })


})

//用户信息修改功能
$('#userBox').on('click', '.edit', function() {
    //获取被点击用户的id
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(res) {
            console.log(res);

            var html = template('modifyTpl', res);
            // console.log(html);
            $('#modifyBox').html(html);

        }
    })

})

//用事件委托给修改按钮添加点击事件
$('#modifyBox').on('submit', '#modifyForm', function() {
    //获取用户在表单中输入的内容(自动收集表单数据的方法)
    var formData = $(this).serialize();
    //获取要修改的id值
    var id = $(this).attr('data-id');
    $.ajax({
            type: 'put',
            url: '/users/' + id,
            data: formData,
            success: function() {
                //刷新重新加载数据
                location.reload();
            }
        })
        //阻止表单提交
    return false;
})


//给删除按钮添加删除功能   事件委托
$('#userBox').on('click', '.delete', function() {
        //如果管理员确认删除用户
        var bool = confirm('你真的要删除用户吗?')
        if (bool) {
            //获取被选择的id
            var id = $(this).attr('data-id');
            // console.log(id);
            $.ajax({
                type: 'delete',
                url: '/users/' + id,
                success: function() {
                    location.reload();
                }
            })
        }
    })
    //批量删除功能的实现
$('#checkAll').on('change', function() {
    //获取复选框的状态值
    var bool = $(this).prop('checked');
    //获取用户的复选框状态值
    var checkList = $('#userBox input[type="checkbox"]');
    checkList.prop('checked', bool);
    if (bool) {
        $('#deletaAll').show();
    } else {
        $('#deletaAll').hide();

    }
})




//实现下面的复选框的状态值都打钩全选框也打钩
$('#userBox').on('change', 'input[type="checkbox"]', function() {
    //如果用户在复选框选中的长度等于复选框的总个数,就让全选框的状态值为true
    if ($('#userBox input[type="checkbox"]').length == $('#userBox input[type="checkbox"]:checked').length) {
        $('#checkAll').prop('checked', true)
    } else {
        $('#checkAll').prop('checked', false)

    }
    if ($('#userBox input[type="checkbox"]:checked').length > 0) {
        $('#deletaAll').show();
    } else {
        $('#deletaAll').hide();
    }
})


//给批量删除按钮添加点击事件
$('#deletaAll').on('click', function() {
    var checkList = $('#userBox input[type="checkbox"]:checked');
    var str = "";
    checkList.each(function(index, item) {
        str += $(item).attr('data-id') + '-';
    })
    str = str.substr(0, str.length - 1);
    // console.log(str);
    $.ajax({
        type: 'delete',
        url: '/users/' + str,
        success: function() {
            location.reload();
        }
    })

})