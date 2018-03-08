$(document).ready(function(){
	
	$('.sidenav').sidenav();
	$('.dropdown-trigger').dropdown();
    $('.fixed-action-btn').floatingActionButton();
    $('.modal').modal();
    $('.materialboxed').materialbox();


    // POST MODAL -------------------------------
    $("#post-submit").on("click",function(event){
    	event.preventDefault();
    	var newPost = {
    		userID: this.userID,
    		postTitle: $("#postModalTitle").val().trim(),
    		postBody: $("#postModalBody").val().trim(),
    		link: $("#postModalLink").val().trim(),
    		category: $("#postModalCategory").val().trim(), 
    	};
    	console.log(newPost);
    })

});