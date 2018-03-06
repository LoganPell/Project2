$(document).ready(function(){
	
	$('.sidenav').sidenav();
	$('.dropdown-trigger').dropdown();
    $('.fixed-action-btn').floatingActionButton();
    $('.modal').modal();


//------------- render the front page --------------------
	// $.ajax({
	// 	method: "GET",
	// 	url: "/",
	// 	data: 
	// });

// ------ USER REGISTRATION ---------------------------
	// $("#formSubmit").on("click", function (event) {
	// 	event.preventDefault();
	// 	//code to capture form input data
	// 	var data = {};

	// 	$.ajax({
	// 		method: "POST", 
	// 		url: "/register"
	// 		// data: data
	// 		// console.log(data);
	// 	}).then(function (response){
	// 		if(response.error) {
	// 			alert(response.error);
	// 		}
	// 	})
	// });


});