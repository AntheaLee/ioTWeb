/*    document.getElementById("card1").style.display = "none";
    document.getElementById("card2").style.display = "none";
    function show5(){
        document.getElementById("card1").style.display = "block";
        document.getElementById("card2").style.display = "none";
    }
    function show4(){
        document.getElementById("card1").style.display = "none";
        document.getElementById("card2").style.display = "block";
    }*/
let header = {
    "Accept": "application/json",
    //"Origin":"http://10.118.126.210"
    //"Authorization": `Bearer ${token}`,
};
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
$.ajax({
    url: "http://10.118.126.245/api/analyses",
    method: "GET",
    headers: header,
    xhrFields:{
        withCredentials: true
    },
    beforeSend: function(xhr){
       xhr.setRequestHeader('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));
    },
    processData: false,
    contentType: false,
    cache: false,
    success: function (myJson) {
      console.log(myJson);
      console.log(myJson.length);
   
     myJson .sort((a, b) => {
  	return new Date(b.created_at) - new Date(a.created_at); //ascending
     })

    var len = myJson.length;
for(var i=0; i<len; i++){
    var download_path = myJson[i].execution_path;
    console.log("execution_path:");
    console.log(myJson[i].execution_path);
    var uuid = myJson[i].uuid;
    var date = myJson[i].created_at;
    var device_id = myJson[i].device_id;
    var status = myJson[i].status;
    if(status =="testing"){ status ="During Dynamic analysis...";
    }else if(status =="uploaded"){ status ="During Static analysis...";
    }else if(status =="emulation_failed") {status = "emulation failed";}
    var severityCount = myJson[i].creds_logs_count + myJson[i].exploits_logs_count;
    
    var dates = date.split('T');
    var time =dates[1].split('.');
    var tr_str =
   " <tr>"+
              "<th scope='row'>"+(i+1)+"</th>"+
              "<td data-toggle='modal' data-target='.bd-example-modal-lg' data-whatever='"+uuid+"'><a href='#' class='alert-link'>"+uuid+"</a></td>"+
              "<td>"+dates[0]+" "+time[0]+"</td>"+
              "<td>DIR-868L</td>"+
              "<td>"+status+"</td>";
    if(status=="During Static analysis..."){
	tr_str = tr_str.concat("<td><span class='badge badge-pill badge-info'>waiting...</span></td>");
    }else if (status=="emulation failed"){
	tr_str = tr_str.concat("<td><span class='badge badge-pill badge-secondary'>failed</span></td>");
    }else if(severityCount<=0){
        tr_str = tr_str.concat("<td><span class='badge badge-pill badge-success'>Low</span></td>");
    }else if(severityCount >3){
        tr_str = tr_str.concat("<td><span class='badge badge-pill badge-danger'>Critical</span></td>");
    }else{
    tr_str = tr_str.concat("<td><span class='badge badge-pill badge-warning'>Medium</span></td>");
    }
    if(download_path != ""){
        tr_str = tr_str.concat("<td><button type='button' style='border-radius: 7px;' class='btn btn-info' name='");
	tr_str = tr_str.concat(download_path);
	tr_str = tr_str.concat("' onclick='downloadFile(this.name)'> Download</button></td></tr>");
	//document.getElementById('download_iframe').src = download_path;
    }else{
    	tr_str = tr_str.concat("<td><button type='button'  style='border-radius: 7px;' class='btn btn-outline-info'disabled><i class='glyphicon glyphicon-download-alt'></i> Download</button></td></tr>");
    }	
    $("#listTable").append(tr_str);
}
    
    }


});

function downloadFile(path){
     //alert(path);
     document.getElementById('download_iframe').src = path;
}

//Modal detil
$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('Analysis result of' + recipient)
  //modal.find('.modal-body input').val(recipient)
    $.ajax({
	url: "http://10.118.126.245/api/analyses/"+recipient,
	method: "GET",
	headers: header,
	xhrFields:{
    	withCredentials: true
	},
	beforeSend: function(xhr){
   	xhr.setRequestHeader('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));
	},
	processData: false,
	contentType: false,
	cache: false,
	success: function (myJson) {
  		console.log(myJson.exploits_logs.length);
    		//console.log(myJson[0]);
  		//console.log(myJson.length);
		var statusCount =0;
		var num = 1;
		for(var a=0;a< myJson.exploits_logs.length;a++){
		    if(myJson.exploits_logs[a].status=="vulnerable"||myJson.exploits_logs[a].status=="unable_verified") statusCount ++;
		}
		for(var k=0;k < myJson.exploits_logs.length;k++){
                   console.log(myJson.exploits_logs[k].name);
                   console.log(myJson.exploits_logs[k].port);
                   console.log(myJson.exploits_logs[k].service);
                   console.log(myJson.exploits_logs[k].status);
                   console.log("==============");
                   var filename = myJson.exploits_logs[k].name;
                   var port = myJson.exploits_logs[k].port;
                   var service = myJson.exploits_logs[k].service;
                   var status = myJson.exploits_logs[k].status;
		   var tr_str="";
		  if(status=="invulnerable"){
 			 tr_str ="";
		  }else{
  			if(status =="vulnerable"){
    				tr_str =" <tr>"+
                                "<th scope='row'>"+(num++)+"</th>"+
                                "<td>"+filename+"</td>"+
                                "<td>"+port+"</td>"+
                                "<td>"+service+"</td>";
                                // "<td>"+status+"</td></tr>";
				tr_str = tr_str.concat("<td><span class='badge badge-pill badge-danger'>vulnerable</span></td></tr>");
  			}else if(status == "unable_verified" && statusCount < 11){
    				tr_str =" <tr>"+
                                "<th scope='row'>"+(num++)+"</th>"+
                                "<td>"+filename+"</td>"+
                                "<td>"+port+"</td>"+
                                "<td>"+service+"</td>";
				tr_str = tr_str.concat("<td><span class='badge badge-pill badge-warning'>unable_verified</span></td</tr>");
  			}
		  } 
		
                $("#exploitsTable").append(tr_str);
                }
                
		// Creds Table
		for(var j=0;j < myJson.creds_logs.length;j++){
                  var CPort = myJson.creds_logs[j].port;
                  var CService = myJson.creds_logs[j].service;
                  var username = myJson.creds_logs[j].username;
                  var password = myJson.creds_logs[j].password;
                  var tr_string =
                  " <tr>"+
                  "<th scope='row'>"+(j+1)+"</th>"+
                    "<td>"+CPort+"</td>"+
                    "<td>"+CService+"</td>"+
                    "<td>"+username+"</td>"+
                    "<td>"+password+"</td></tr>";
		}
                  $("#credsTable").append(tr_string);

	}
 	
	});
})

//When Modal close
$('#exampleModal').on('hidden.bs.modal', function (e) {
  // clean
  $(".modal-ExpTable").html("");
   $("#exploitsTables").html("");
   $("#credsTable").empty();
})
