//var XHR = createXMLHttpRequest(); //from utility.js ; creat an object

function  generateRandomString (num) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < num; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result1;
  }
  
  document.cookie = `XSRF-TOKEN=${generateRandomString}`;
  

// $(function (){
//     var apiURL = "http://10.118.126.210:8080/api/auth/login";
//     $("#lsignin").on("click",function(){
//         $ajax({
//             url : apiURL,
//             dataType : "jsonp",
//             success : onSuccess // �]�w��Ajax �n�D���\�ɩҭn���檺�禡
//         });
//     });
// });

// function onSuccess(data){
//     $each(data, function(i){
//         console.log("><><>AAAWWWW");
//         console.log(this.message);
//     });
// }


// $(function () { $('#signin').click(function () { 
//     // alert('ok'); 
//     //����ϥΪ̦W�٩M�K�X: 
//     email = $('#inputEmail').val(); 
//     password = $('#inputPassword').val(); 
//     //rember = $('#rember').val(); 
//     // alert(rember); 
//     $.ajax({ 
//         url:"http://10.118.126.210:8080/api/auth/login", 
//         type:"POST", //����覡 
//         data:{"username":email,"password":password,"remember":0}, 
//         dataType:"json", 
//     }).done(function (data) { 
//         console.log(data)
//         alert( "Data Loaded: " + data );
//         if (data.res==1){ 
//             // alert('username') 
//             location.href="/index" 
//             rel="external nofollow" 
//         }else{ 
//             // alert('username'); 
//             $('.div1').show().html('�ϥΪ̦W�٩αK�X��J���~') 
//         } 
//     }).fail(function(jqXHR, textStaus, erroeThrown){
//         console.log("errorQQQQQ")
//         alert("fail");

//     }).always(function(jqXHR, textStaus){
//         console.log("aaalllwwaayysss")
//         alert("always");
//     });
// }); 
// }); 

axios.get('https://api.nlsc.gov.tw/other/TownVillagePointQuery/120.698659/24.156250/4326')
            .then(function (response) {
                let data = response.data;
                console.log(arguments)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                console.log('finally');
            });
