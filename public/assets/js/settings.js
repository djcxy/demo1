$('#logo').on('change', function() {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('logo', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
            console.log(res);
            $('#hiddenLogo').val(file);
            $('#preview').val(file);
        }
    })
})