
// Make a request for a user with a given ID

axios.get('http://10.118.126.245/sanctum/csrf-cookie')
  .then(function (response) {
    // handle success
    console.log("success get cookie");

    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log("error");
    console.log(error);
  })
  .then(function () {
    // always executed
  });

  console.log("get cookie done");

function postLogin() {
	//alert("submitted");
     console.log("click sign in");


let data = {
    "email": $('#inputEmail').val(),
    "password": password = $('#inputPassword').val(),
    "remember": '0'
  };
  console.log($('#inputEmail').val());
  console.log(document.cookie);
const words = document.cookie.split('=');
console.log(words[1]);
	// Request headers
  let header = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-XSRF-TOKEN": words[1]
    // "X-XSRF-TOKEN":""
    //"Origin":"http://10.118.126.210"
    //"Authorization": `Bearer ${token}`,
    
   };
  console.log(header);
    axios({
        method: 'post',
        url: `http://10.118.126.245/api/auth/login`,
        data: data,
        headers: header,
        withCredentials: true
        
    })
        .then( function(response) {
		alert('登入成功');
		//alert(response.data.message);//success
	        if(response.data.message == 'success'){
		    window.location.href='http://10.118.126.245/main.html';
		}
	})
        .catch( function(error){
		alert('帳號密碼錯誤');
		console.log(error);
	});
}
