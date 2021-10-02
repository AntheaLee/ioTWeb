
// Make a request for a user with a given ID

axios.get('http://10.118.126.210/sanctum/csrf-cookie')
  .then(function (response) {
    // handle success
    console.log("success");

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

  console.log("done www");
let data = {
    "email": "testtest@gmail.com",
    "password": "test",
    "remember": '1'
};

//請求表頭
let header = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-XSRF-TOKEN": $('meta[name="xsrf-token"]').attr('content')
   // "X-XSRF-TOKEN":""
    //"Origin":"http://10.118.126.210"
    //"Authorization": `Bearer ${token}`,
    
};

console.log(document.cookie);
console.log("pleassssss!");
 axios({
     method: 'post',
     url: `http://10.118.126.210/api/auth/login`,
     data: data,
     headers: header,
     withCredentials: true
    
 })
     .then( (response) => console.log(response))
     .catch( (error) => console.log(error))
