console.log(document.cookie);
fetch('/api/devices')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
	console.log("lenght is:");
    console.log(myJson.length);
	  var len = myJson.length;
            for(var i=0; i<len; i++){
                var id = myJson[i].id;
                var name = myJson[i].name;
		var description = myJson[i].description;
                var option_str =
               " <option >"+ name +" ( " + description+ "  ) </option>";

                $("#inputGroupSelect01").append(option_str);
            }
    //alert(myJson.description);
  });
console.log(document.cookie);
const words = document.cookie.split('=');
//console.log(words[1]);

function getCookie(cookieName) {
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length+1, c.length);
        }
    }
    return "";
}

let header = {
    "Accept": "application/json",
    "X-XSRF-TOKEN": words[1]
    // "X-XSRF-TOKEN":""
    //"Origin":"http://10.118.126.210"
    //"Authorization": `Bearer ${token}`,

   };
var files = [];
$(document).ready(function () {
  $("#inputFolder").change(function () {
    files = this.files;
  });
});
$("#upload-btn").click(function () {
  var fd = new FormData();
  for (var i = 0; i < files.length; i++) {
    let file = files[i];
    let fileParamName = `files[]`;
    let filePathParamName = `filepath[]`;
    fd.append(fileParamName, file);
    fd.append(filePathParamName, file.webkitRelativePath);
  }
  fd.append('device_id', '1');

  $.ajax({
	  url: "http://10.118.126.245/api/analyses",
    method: "POST",
    headers: header,
    xhrFields:{
    	withCredentials: true
    },
    beforeSend: function(xhr){
       xhr.setRequestHeader('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));
    },
    data: fd,
    processData: false,
    contentType: false,
    cache: false,
    success: function (data) {
    window.location.href='http://10.118.126.245/history.html';
	    console.log(data);
    }
  });
});
