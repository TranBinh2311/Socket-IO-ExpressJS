var socket = io("http://localhost:3000");

socket.on("server-send-reg-failed", function(){
	alert("Wrong username , Name is exsiting in system");
});

socket.on("server-send-reg-success", function(data){
	
	$("#currentUser").html(data);
	$("#loginForm").hide(2000);
	$("#chatForm").show(1000);
	alert("Welcome " + data + " to my system");
});

socket.on("server-send-list-User", function(data){
	$("#boxContent").html("");
	data.forEach(function(i)
	{
			$("#boxContent").append("<div class= 'user'> " + i + "</div>");
	});
});

socket.on("server-send-message", function(data){
	$("#listMessages").append("<div class='ms'>" + data.un + ":" + data.nd + "</div>" )
});

socket.on("someone_typing", function(data){
	$("#notice").html("");
	$("#notice").html(data);
});

socket.on("someone_stop_type", function(data){
	$("#notice").html("");
});



/*===============================================================*/

$(document).ready(function(){
	$("#loginForm").show();
	$("#chatForm").hide();

	$("#txtMessage").focusin(function(){
		socket.emit("typing");
	});

	$("#txtMessage").focusout(function(){
		socket.emit("stop-type");
	});
	$("#btnRegister").click( function(){
		socket.emit( "client-send-Username", $("#txtUserName").val() );
	});

	$("#btnLogout").click( function(){
		socket.emit( "logout");
		$("#loginForm").show();
		$("#chatForm").hide();

	});

	$("#btnSendMessage").click( function(){
		socket.emit( "user-send-message", $("#txtMessage").val());
	});



});