'use strict';

$(function() {
  var uploadImg = $('#uploadImage')[0];
  var form = $('form')[0];

  $('form').on('submit', function(event) {
    event.preventDefault();

    if (!uploadImg.files.length) {
      return;
    }

    var formData = new FormData();
    formData.append('file', uploadImg.files[0]);

    var xhr = new XMLHttpRequest();
    $.ajax({
      type: "POST",
      url: event.target.action,
      data: formData,
      processData: false,
      contentType:false,
      headers: {"API_KEY": "26310805d2f3e84c5a7cfea24aaca0897e8e958244f551e812f8dc5d353e3501"}
    }).done(function(data) {
      form.reset();
    });
  });
});
