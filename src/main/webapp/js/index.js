$(document).ready(function() {
	var useremail = getCookie("useremail");
	console.log("useremail : "+useremail);

	if (useremail != null) {
		$("#login_ModDetails_Toggle").hide();
		$("#signup_ModDetails_Toggle").hide();
		$("#addpost_Toggle").show();
		$("#index_logout").show();
		$("#uEMailPane").show();
		$("#uEmail").text(useremail);
        $("#uEmail").show();
	} else {
		$("#login_ModDetails_Toggle").show();
		$("#signup_ModDetails_Toggle").show();
		$("#addpost_Toggle").hide();
		$("#index_logout").hide();
		$("#uEMailPane").hide();
		$("#uEmail").text("");
        $("#uEmail").hide();
	}
});


/*function getCookie(key) {
	if(window.sessionStorage) {
		return sessionStorage.getItem(key);
	}
	return null;
}*/

/*function logout(){
	if(window.sessionStorage) {
		sessionStorage.clear();
	}
    window.location.assign("http://localhost:8080/kbase/login.html");
}*/

/*function blog_fetch() {
	var useremailid;
    if(window.sessionStorage) {
    	useremailid = getCookie("useremail");
    }
    console.log("useremailid: "+useremailid);
  
   	$.get("rest/blogs/"+useremailid, function(data){
		var rowTemplate2 = $("#template_blog_list").html();
		console.log(rowTemplate2);
		for(index in data){
			var row = rowTemplate2.replace("list_id",(index))
			.replace("title",data[index].title);
			$("#BlogList").append(row);
		}
	});


	$.get("rest/blogs/"+useremailid, function(data){
    	var rowTemplate = $("#template_article_list").html();
		console.log(rowTemplate);
		for(index in data){
			var row = rowTemplate.replace("article_title",data[index].title)
			.replace("article_data",data[index].data);
			$("#ArticleList").append(row);
		}
	});
}*/