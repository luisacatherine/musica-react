$.ajax("http://localhost:5000/login",{
    type: "POST",
    success: function(data){
        console.log(data);
    },
    error: function(e){
        console.log(e);
    }
})