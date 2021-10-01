function createXMLHttpRequest(){
    // not IE
    try{
        var XHR = new XMLHttpRequest();
    }
    // is IE
    catch(e1){
        // IE6+
        try{
            var XHR = new ActiveXObject("Msxml2.XMLHTTP");
        }
        // not IE6+
        catch(e2){
            // IE5
            try{
                var XHR = new ActiveXObject("Microsoft.XMLHTTP");
            }
            // user not suport Ajax
            catch(e3){
                XHR = false;
            }
        }
    }
    return XHR;
}   