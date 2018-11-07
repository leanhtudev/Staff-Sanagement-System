function a(){
    
    var ngay =document.getElementById("dob").value;
    var new_ngay=parseInt(ngay.slice(8,10));
    console.log(new_ngay);
    var today=new Date();
    var day_ofToday=today.getDate();
    console.log(day_ofToday);

}   