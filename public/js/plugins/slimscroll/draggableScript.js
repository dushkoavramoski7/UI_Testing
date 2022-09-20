/* eslint-env jquery */
/* global $ */
$(document).ready(function () {
    $("#todo").sortable({
        update: function (event, ui) {
            var todo = $("#todo").sortable("toArray");
        }
    }).disableSelection();

    $("#todo1").sortable({
        update: function (event, ui) {
            var todo = $("#todo1").sortable("toArray");
        }
    }).disableSelection();

    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });

    $(".select2_demo_3").select2({
        placeholder: "Select a value",
        allowClear: true
    });
});