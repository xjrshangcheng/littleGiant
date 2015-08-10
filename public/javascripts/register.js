$(function() {
    $('#reg-form').easyform();
})

function validation() {

    var inputName = $("#uid").val();
    var isExisted;
    $.post('/name', {
        inputName: inputName
    }, function(message) {
        if (message.data === 'user_exist') {
            isExisted = false;
        } else {
            isExisted = true;
        }
        $("#uid").trigger("easyform-ajax", isExisted);
    })
}
