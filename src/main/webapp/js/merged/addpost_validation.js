/* function logout(){
    if(window.sessionStorage) {
        sessionStorage.clear();
    }
    window.location.assign("http://localhost:8080/kbase/login.html");
}

 function getCookie(key) {
	  if(window.sessionStorage) {
	    return sessionStorage.getItem(key);
	  }
	  return null;
}

function submit_user_data() {
    var postTitle = $("#postTitleId").val();
    var postDesc = $("#postDescId").val();
    var creationDate = (new Date()).toString();
    var author =  getCookie("useremail");;
    var interest = $("input:radio[name='interestName']:checked").val();
    
    console.log("addpost --> "+"postTitle: " + postTitle + "postDesc:" + postDesc + ",creationDate: "
        + creationDate + ",author: " + author + ",interest: " + interest);
    
    var data = {
        title : postTitle,
        description : postDesc,
        creationTime : creationDate,
        author : author,
        interestForPost : interest
    };
    $("#message").text("Please Wait. Blog Post is getting saved...");
    $("#message").css('display', 'block');
    if (formValidation()) {
     console.log("adddpost -->"+data );
     $.ajax({
        url : 'rest/blogs/',
        type : 'POST',
        contentType: 'application/json',
        data : JSON.stringify(data),
        success : function(result) { 
           console.log("submit_parent_and_close success ");  
           $("#message").text("Blog Post Saved Properly.");
           $("#postTitleId").text("");
           $("#postDescId").text("");
       },
       error:function(data){
           console.log("Form Submission Failed" +data);
       }
   });
 }
} 

function formValidation() {
  var postTitle = $("#postTitleId");
  var postDesc = $("#postDescId");
  console.log("addpost.formValidation() --> "+"postTitle: " + postTitle.val() + "postDesc:"
    + postDesc.val());
  
  if (validatePostTitle(postTitle)) {
     if (validatePostDesc(postDesc)) {
       return true;
   }
}
}

function validatePostTitle(postTitle) {
  if (postTitle.val() == "") {
     alert("Post Title field is blank!");
     postTitle.focus();
     return false;
 } else {
     return true;
 }
}

function validatePostDesc(postDesc) {
  if (postDesc.val() == "") {
     alert("Post Description field is blank!");
     postDesc.focus();
     return false;
 } else {
     return true;
 }
}

function myFunction(){
   console.log("myFunction()");
   checkCookie();
}

function checkCookie() {
    var useremail;
    if(window.sessionStorage) {
        useremail = sessionStorage.getItem("useremail");
    }
    console.log("checkCookie---> User name: "+useremail);
    if (useremail != "") {
//        $("#paneltitleid").text(useremail +" Update details here.");
        $("#uEmail").text(useremail);
        $("#uEmail").show();
    }
}*/