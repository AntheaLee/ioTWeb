document.getElementById("warningFile").style.display = "none";
var multipulFile = true;
function hideWarring() {
  var x = document.getElementById("warningFile");
    x.style.display = "none";
    multipulFile = false;
}

function showWarring() {
  var x = document.getElementById("warningFile");
    x.style.display = "block";
    multipulFile = true;
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