

/*function submit_user_data() {
	console.log("loginUser");
	var emailId = $("#emailId").val();
	var password = $("#password").val();


	console.log("login --> " +"emailId: " + emailId + ",password: "
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
			console.log("login ----------success---->>> result: "+ result);
			console.log("submit_parent_and_close success ");
			$("#message").text(
				"User Authentication Sucessfull !!!!.");

			var jsonObj = xml2json(result,"");
			var obj = JSON.parse(jsonObj);
			window.location.assign("http://localhost:8080/kbase/addpost.html");
			console.log("login success----------> jsonObj: "+ jsonObj);
			console.log("login success----------> obj: "+ obj);
			console.log("login success----------> name: "+ obj.appUser.personalInfo.name);
			console.log("login success----------> email: "+ obj.appUser.email);
			
			setCookie("username", obj.appUser.personalInfo.name);
			setCookie("useremail", obj.appUser.email);

		},
		error : function(data) {
			console.log("Form Submission Failed" + data);
			$("#message").text("Entered User credentials are not valid !!!!.");
		}
	});
}*/

/*function setCookie(key, value) {
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
	var user=getCookie("useremail");
	console.log("checkCookie---> User email: "+user);
	if (user == null) {
		return false;
	}
	return true;
}

function eraseCookie(name) {
	if(window.sessionStorage) {
		sessionStorage.clear();
	}
}*/