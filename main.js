document.getElementById("warningFile").style.display = "none";
document.getElementById("input-SglFile").style.display = "none";

function hideWarring() {
    document.getElementById("warningFile").style.display = "none";
    document.getElementById("input-MultiCFile").style.display = "block";
    document.getElementById("input-SglFile").style.display = "none";


}

function showWarring() {
    document.getElementById("warningFile").style.display = "block";
    document.getElementById("input-MultiCFile").style.display = "none";
    document.getElementById("input-SglFile").style.display ="block";
}

function isMtpFile(){
  var f = document.getElementById("inputGroupFile01").files;
  if (multipulFile == true){
      //f.style.fi
  } 
}

// $(function () {
//   $('#fileupload').fileupload({
//       dataType: 'json',
//       done: function (e, data) {
//           $.each(data.result.files, function (index, file) {
//               $('<p></p>').text(file.name).appendTo(document.body);
//           });
//       }
//   });
// });


var files = [];
$(document).ready(function(){
  $("input").change(function(){
    files = this.files;
  });
});
$("#upload-btn").click(function(){
  var fd = new FormData();
  for (var i = 0; i < files.length; i++) {
    fd.append("file", files[i]);
  }
  $.ajax({
    url: "10.118.126.210/api/files",
    method: "POST",
    data: fd,
    contentType: false,
    processData: false,
    cache: false,
    success: function(data){
      console.log(data);
    }
  });
});