function logout(){
	console.log("logout");
    if(window.sessionStorage) {
        sessionStorage.clear();
    }
    window.location.assign("login.html");
//    window.location.assign("http://localhost:8080/kbase/login.html");
}
 
function loadUserId(){
	//function myFunction(){
	   console.log("loadUserId()");
	   checkCookie();
}
function setCookie(key, value) {
		if(window.sessionStorage) {
			console.log("key: "+ key+",value:"+value );
			sessionStorage.setItem(key, value);
		}
}

 function getCookie(key) {
	  if(window.sessionStorage) {
	    return sessionStorage.getItem(key);
	  }
	  return null;
}
 
function checkCookie() {
	    var useremail;
	    if(window.sessionStorage) {
	        useremail = sessionStorage.getItem("useremail");
	    }
	    console.log("checkCookie---> User name: "+useremail);
	    if (useremail != "") {
	        $("#uEmail").text(useremail);
	        $("#uEmail").show();
	    }
}

function eraseCookie(name) {
	if(window.sessionStorage) {
		sessionStorage.clear();
	}
}
 function blog_fetch() {
		var useremailid;
	    if(window.sessionStorage) {
	    	useremailid = getCookie("useremail");
	    }
	    console.log("useremailid: "+useremailid);
	  
	   	$.get("rest/blogs/"+useremailid, function(data){
			var rowTemplate2 = $("#template_blog_list").html();
			var rowTemplate = $("#template_article_list").html();
			console.log("data: "+data);
			console.log("data: "+data.length);

			for(var index=data.length-1;index=>0;index--){
				console.log("index: "+index+",Post id: "+data[index].id+",Post Title: "+data[index].title
						+",Post Description: "+data[index].description
						+",Post Author: "+data[index].author
						+",Post Creation Time: "+data[index].creationTime
						+",Post interestType: "+data[index].interestForPost);
				
				var row = rowTemplate2.replace("list_id",data[index].id)
				.replace("title",data[index].title);
				$("#BlogList").append(row);
				
				var row1 = rowTemplate.replace("article_id",data[index].id)
				.replace("article_title",data[index].title)
				.replace("article_data",data[index].description);
				$("#ArticleList").append(row1);
			}
		});

	   	
	   	

		/*$.get("rest/blogs/"+useremailid, function(data){
	    	var rowTemplate = $("#template_article_list").html();
	    	console.log("data: "+data);
			for(index in data){
				var row = rowTemplate.replace("article_id",data[index].id)
				.replace("article_title",data[index].title)
				.replace("article_data",data[index].description);

				console.log("index: "+index+",Post id: "+data[index].id+",Post Title: "+data[index].title
						+",Post Description: "+data[index].description
						+",Post Author: "+data[index].author
						+",Post Creation Time: "+data[index].creationTime
						+",Post interestType: "+data[index].interestForPost);
				$("#ArticleList").append(row);
			}
		});*/
		
		
	   	
	}

function submitBlogPost() {
    var postTitle = $("#postTitleId").val();
    var postDesc = $("#postDescId").val();
//    var creationDate = (new Date()).toString();
    var creationDate = new Date();
    var author =  getCookie("useremail");;
    var interest = $("input:radio[name='interestName']:checked").val();
    
    console.log("submitBlogPost --> "+"postTitle: " + postTitle + "postDesc:" + postDesc + ",creationDate: "
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
    if (formPostValidation()) {
     console.log("submitBlogPost -->"+data );
     $.ajax({
        url : 'rest/blogs/',
        type : 'POST',
        contentType: 'application/json',
        data : JSON.stringify(data),
        success : function(result) { 
           console.log("submitBlogPost submit_parent_and_close success ");  
           $("#message").text("Blog Post Saved Properly.");
           $("#postTitleId").text("");
           $("#postDescId").text("");
       },
       error:function(data){
           console.log("submitBlogPost Form Submission Failed" +data);
       }
   });
 }
} 

function formPostValidation() {
//	function formValidation() {
  var postTitle = $("#postTitleId");
  var postDesc = $("#postDescId");
  console.log("formPostValidation --> "+"postTitle: " + postTitle.val() + "postDesc:"
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





function submitLoginForm() {
	console.log("loginUser");
	var emailId = $("#emailId").val();
	var password = $("#password").val();


	console.log("submitLoginForm login --> " +"emailId: " + emailId + ",password: "
		+ password);

	var data = {
		email : emailId,
		password : password,
		personalInfo : {
			name : "",
			phoneNum : "",
			dob : ""
		},
		userInterestedTopic : ""
	};
	$("#message").text("Please Wait.User Authentication is in progress!!!");
	$
	.ajax({
		url : 'rest/users/login',
		type : "POST",
		contentType : "application/json",
		data : JSON.stringify(data),
		success : function(result) {
			console.log("submitLoginForm ----------success---->>> result: "+ result);
			$("#message").text(
				"User Authentication Sucessfull !!!!.");

			var jsonObj = xml2json(result,"");
			var obj = JSON.parse(jsonObj);
			window.location.assign("http://localhost:8080/kbase/addpost.html");
			console.log("submitLoginForm success----------> jsonObj: "+ jsonObj);
			console.log("submitLoginForm success----------> obj: "+ obj);
			console.log("submitLoginForm success----------> name: "+ obj.appUser.personalInfo.name);
			console.log("submitLoginForm success----------> email: "+ obj.appUser.email);
			
			setCookie("username", obj.appUser.personalInfo.name);
			setCookie("useremail", obj.appUser.email);

		},
		error : function(data) {
			console.log("Form Submission Failed" + data);
			$("#message").text("Entered User credentials are not valid !!!!.");
		}
	});
}

function submitSignupForm() {
	var name = $("#name").val();
	var emailId = $("#emailId").val();
	var password = $("#password").val();
	var phoneNumber = $("#phoneNumber").val();
	var dob = $("#dob").val();
	var interest = $("input:radio[name='interestName']:checked").val();

	console.log("submitSignupForm --> "+"name: " + name + "emailId:" + emailId + ",password: "
		+ password + ",phoneNumber: " + phoneNumber + ",dob: " + dob
		+ ",interest: " + interest);

	var data = {
		email : emailId,
		password : password,
		personalInfo : {
			name : name,
			phoneNum : phoneNumber,
			dob : dob
		},
		userInterestedTopic:interest
	};
	$("#message").text("Please Wait. User data is getting saved...");
	$("#message").css('display', 'block');

	console.log ( 'submitSignupForm  #name: '+name+',phoneNumber: '+phoneNumber+',emailId: '+emailId+',dob: '+dob+',interest: '+interest );
	if (signupFormValidation()) {
		console.log("signup -->"+data );
		$.ajax({
			//url : 'http://localhost:8080/kbase/user/account/adduser',	
			url : 'rest/users',
			type : 'post',
			contentType : "application/json",
			data : JSON.stringify(data),
			success : function(response) {
				console.log("submitSignupForm ----------success---->>> result: "+response);
				$("#message").text("User Data Saved Properly.You are being redirected to login page to login again..");

				window.location.replace("http://localhost:8080/kbase/login.html");
			},
			error : function(data) {
				console.log("submitSignupForm ----------failure---->>> result: "+data);
			}
		});
	}
}

function signupFormValidation() {
	var uname = $("#name");
	var uphonenumber = $("#phoneNumber");
	var uemail = $("#emailId");
	var passid = $("#password");
	var dob = $("#dob");
	console.log("signupFormValidation --> "+"name: " + uname.val() + "uphonenumber:"
		+ uphonenumber.val() + ",uemail: " + uemail.val() + ",passid: "
		+ passid.val() + ",dob: " + dob.val());

	if (validateName(uname)) {
		if (validateEmail(uemail)) {
			if (passid_validation(passid, 7, 12)) {
				if (validateContactNumber(uphonenumber, 10, 6)) {
					if (validatedate(dob)) {
						return true;
					}
				}
			}

		}
	}
}

function validateName(uname) {
	var letters = /^[A-Za-z]+$/;
	if (uname.val().match(letters)) {
		return true;
	} else if (uname.val() == "") {
		alert("Name field is blank!");
		uname.focus();
		return false;
	} else {
		alert('Username must have alphabet characters only');
		uname.focus();
		return false;
	}
}
function validateContactNumber(phonenumber, mx, min) {
	var numbers = /^[0-9]+$/;
	var phonenumber_len = phonenumber.val().length;

	if (phonenumber_len != 0) {
		if (phonenumber.val().match(numbers)) {
			if (phonenumber_len >= min && phonenumber_len <= mx) {
				return true;
			} else {
				alert('Entered Phone Number is not proper!');
				phonenumber.focus();
				return false;
			}

		} else {
			alert('Phone Number must have numeric characters only!');
			phonenumber.focus();
			return false;
		}

	} else {
		alert('Phone Number field is Empty!');
		phonenumber.focus();
		return false;
	}
}

function validateEmail(inputText) {
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (inputText.val().match(mailformat)) {

		inputText.focus();
		return true;
	} else {
		alert("You have entered an invalid email address!");

		inputText.focus();
		return false;
	}
}
function passid_validation(passid, mx, my) {
	var passid_len = passid.val().length;
	if (passid_len == 0 || passid_len >= my || passid_len < mx) {
		alert("Password should not be empty / length be between " + mx
			+ " to " + my);
		passid.focus();
		return false;
	}
	return true;
}

function validatedate(inputText) {
	var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
	if (inputText.val().match(dateformat)) {
		inputText.focus();
		var opera1 = inputText.val().split('/');
		var opera2 = inputText.val().split('-');
		lopera1 = opera1.length;
		lopera2 = opera2.length;
		if (lopera1 > 1) {
			var pdate = inputText.val().split('/');
		} else if (lopera2 > 1) {
			var pdate = inputText.val().split('-');
		}
		var dd = parseInt(pdate[0]);
		var mm = parseInt(pdate[1]);
		var yy = parseInt(pdate[2]);
		var ListofDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
		if (mm == 1 || mm > 2) {
			if (dd > ListofDays[mm - 1]) {
				alert('Invalid date format!');
				return false;
			} else {
				return true;
			}
		}
		if (mm == 2) {
			var lyear = false;
			if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
				lyear = true;
				return true;
			}
			if ((lyear == false) && (dd >= 29)) {
				alert('Invalid date format!');
				return false;
			}
			if ((lyear == true) && (dd > 29)) {
				alert('Invalid date format!');
				return false;
			}
		}
	} else {
		alert("Invalid date format!");
		inputText.focus();
		return false;
	}
}

function submitUpdateDetailsForm() {
	var name = getCookie("username");
	var emailId = getCookie("useremail");
	var password = $("#password").val();
	var phoneNumber = $("#phoneNumber").val();
	var dob = $("#dob").val();
	var interest = $("input:radio[name='interestName']:checked").val();

	console.log("submitUpdateDetailsForm --> "+"name: " + name + "emailId:" + emailId + ",password: "
			+ password + ",phoneNumber: " + phoneNumber + ",dob: " + dob
			+ ",interest: " + interest);

	var data = {
			email : emailId,
			password : password,
			personalInfo : {
				name : name,
				phoneNum : phoneNumber,
				dob : dob
			},

			userInterestedTopic:interest
	};
	$("#message").text("Please Wait. User data is getting saved...");
	$("#message").css('display', 'block');

	console.log ( 'submitUpdateDetailsForm--> #name: '+name+',phoneNumber: '+phoneNumber+',emailId: '+emailId+',dob: '+dob+',interest: '+interest );
	if (updateDetailsFormValidation()) {
		console.log("submitUpdateDetailsForm -->"+data );
		$.ajax({
			url : 'rest/users',
			type : 'put',
			contentType : "application/json",
			data : JSON.stringify(data),
			success : function(response) {
				console.log("submitUpdateDetailsForm ----------success---->>> result: "+response);
				$("#message").text("User Data Saved Properly.You are being redirected to login page to login again..");
				window.location.replace("http://localhost:8080/kbase/login.html");
			},
			error : function(response) {
				console.log("submitUpdateDetailsForm ----------failure---->>> result: "+response);
			}
		});
	}

}

function updateDetailsFormValidation() {
	var uname = getCookie("username");
	var uemail = getCookie("useremail");
	var uphonenumber = $("#phoneNumber");
	var passid = $("#password");
	var dob = $("#dob");
	console.log("updateDetailsFormValidation() --> "+"name: " + uname + "uphonenumber:"
        + uphonenumber.val() + ",uemail: " + uemail + ",passid: "
        + passid.val() + ",dob: " + dob.val());
    if (passid_validation(passid, 7, 12)) {
       if (validateContactNumber(uphonenumber, 10, 6)) {
          if (validatedate(dob)) {
             return true;
         }
     }
 }
}
$("#template_article_list tr").click(function(){
//		   $(this).addClass('selected').siblings().removeClass('selected');    
		   var value=$(this).find('td:first').html();
		   console.log("Id: "+value);
		   alert(value);    
	});

function loadSinglePost(){
	loadUserId();
	setCookie("postId", 1);
	loadPost();
}
function loadPost(){
	var postId;
	if(window.sessionStorage) {
		postId = getCookie("postId");
    }
	$.get("rest/blogs/singlePost/"+postId, function(data){
		console.log("data: "+data);
		blogPostDesc
		$("#blogPostTitle").text(data.title);
		$("#blogPostDesc").text(data.description);
		$("#blogCreationTime").text(data.creationTime);
		$("#blogAuthor").text(data.author);
		
		
			console.log("Post id: "+data.id+",Post Title: "+data.title
					+",Post Description: "+data.description
					+",Post Author: "+data.author
					+",Post Creation Time: "+data.creationTime
					+",Post interestType: "+data.interestForPost);
			

	});
}