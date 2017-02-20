function logout(){
  if(window.sessionStorage) {
        sessionStorage.clear();
    }
    window.location.assign("http://localhost:8080/kbase/login.html");
/*       var name = getCookie("username");
       var emailId = getCookie("useremail");
       var password = $("#password").val();
       var phoneNumber = $("#phoneNumber").val();
       var dob = $("#dob").val();
       var interest = $("input:radio[name='interestName']:checked").val();

       console.log("logout --> "+"name: " + name + "emailId:" + emailId + ",password: "
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
    $("#message").text("Please Wait, "+name+" is logging out...");
    $("#message").css('display', 'block');
    
    console.log ( 'logout--> #name: '+name+',phoneNumber: '+phoneNumber+',emailId: '+emailId+',dob: '+dob+',interest: '+interest );
    if (formValidation()) {
     console.log("logout -->"+data );
     $.ajax({
        url : 'http://localhost:8080/blog/user/account/logout',
        type : 'delete',
        contentType : "application/json",
        data : JSON.stringify(data),
        success : function(response) {
           console.log("updatedetails ----------success---->>> result: "+response);
           console.log("submit_parent_and_close success ");
           $("#message").text("User Logged out properly.You are being redirected to login page.");
           window.location.replace("http://localhost:8080/blog/login.html");
       },
       error : function(data) {
           console.log("logout ----------failure---->>> result: "+response);
           console.log("logout Form Submission Failed" + data);
       }
   });
 }*/


}

function submit_user_data() {
  var name = getCookie("username");
  var emailId = getCookie("useremail");
  var password = $("#password").val();
  var phoneNumber = $("#phoneNumber").val();
  var dob = $("#dob").val();
  var interest = $("input:radio[name='interestName']:checked").val();

  console.log("updatedetails --> "+"name: " + name + "emailId:" + emailId + ",password: "
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

            		console.log ( 'updatedetails--> #name: '+name+',phoneNumber: '+phoneNumber+',emailId: '+emailId+',dob: '+dob+',interest: '+interest );
            		if (formValidation()) {
            			console.log("updatedetails -->"+data );
            			$.ajax({
            				url : 'rest/users',
            				type : 'put',
            				contentType : "application/json",
            				data : JSON.stringify(data),
            				success : function(response) {
            					console.log("updatedetails ----------success---->>> result: "+response);
            					console.log("submit_parent_and_close success ");
            					$("#message").text("User Data Saved Properly.You are being redirected to login page to login again..");
            					window.location.replace("http://localhost:8080/kbase/login.html");
            				},
            				error : function(response) {
            					console.log("updatedetails ----------failure---->>> result: "+response);
            					console.log("updatedetails Form Submission Failed" + data);
            				}
            			});
            		}

            	}
            	function formValidation() {
            		var uname = getCookie("username");
            		var uemail = getCookie("useremail");
            		var uphonenumber = $("#phoneNumber");
            		var passid = $("#password");
            		var dob = $("#dob");
            		console.log("updatedetails.formValidation() --> "+"name: " + uname + "uphonenumber:"
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
  console.log("email id --> "+inputText);
  if (inputText.match(mailformat)) {
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




function myFunction(){
   console.log("myFunction()");
   
   var useremail = getCookie("useremail");
   
   console.log("myFunction---> useremail: "+useremail);
   if (useremail != "") {
       //$("#paneltitleid").text("Update details here.");
       $("#uEmail").text(useremail);
       $("#uEmail").show();
   }
   
   
   $("#emailId").text =useremail;
  // $("#name").text = userInfoJson.appUser.personalInfo.name;
  // $("#emailId").text = userInfoJson.appUser.email;
  // console.log("myFunction---> email: "+userInfoJson.appUser.email);
 //  $("#phoneNumber").text = userInfoJson.appUser.personalInfo.phoneNum;
   //$("#dob").text = userInfoJson.appUser.personalInfo.dob;
 //  $("#interest").text = userInfoJson.appUser.userInterestedTopic;
  // console.log("myFunction---> userInterestedTopic: "+userInfoJson.appUser.userInterestedTopic);
  
}

function setCookie(key, value) {
  if(window.sessionStorage) {
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
}
