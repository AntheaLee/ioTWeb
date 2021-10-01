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

$(function () {
  $('#fileupload').fileupload({
      dataType: 'json',
      done: function (e, data) {
          $.each(data.result.files, function (index, file) {
              $('<p></p>').text(file.name).appendTo(document.body);
          });
      }
  });
});

