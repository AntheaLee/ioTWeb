
  
  console.log("start get devices");
let data = {
    "email": $('#inputEmail').val(),
    "password": password = $('#inputPassword').val(),
    "remember": '0'
  };
  //console.log($('#inputEmail').val());
  // Request headers
  let header = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-XSRF-TOKEN": $('meta[name="xsrf-token"]').attr('content')
    // "X-XSRF-TOKEN":""
    //"Origin":"http://10.118.126.210"
    //"Authorization": `Bearer ${token}`,

   };
    axios({
        method: 'get',
        url: `http://10.118.126.245/api/devices`,
        headers: header,
        withCredentials: true

    })
        .then( function(response) {
                alert('獲取device中');
    		console.log(response);
    		return response.json(); // 轉換成 JSON 再傳入下一個 then 中處理
	})
	.then(function(data) {
    		console.log(data);
	
		//alert(response.data.message);//success
                if(response.data.message == 'success'){
                 //   window.location.href='http://10.118.126.210/main.html';
                }
		var len = response.length;
            for(var i=0; i<len; i++){
                var id = response[i].id;
                var name = response[i].name;
		var description = response[i].description;
                var option_str =
               " <option >"  +name+"     \\t  "+ description+ " </option>";

                $("#inputGroupSelect01").append(option_str);
            }
        })
        .catch( function(error){
                alert('帳號密碼錯誤');
                console.log(error);
        });


