var express= require("express");
var app = express();


app.use(express.static("public"));              // all message from client willk be allocated in here
app.set("view engine", "ejs")  ;                // type of file in Client is file .ejs
app.set("views", "./views");                    // understand

var server = require("http").Server(app);       // get http module for app 
var io = require("socket.io")(server);          // get socket.io module
server.listen(3000)                             //open port 3000 for Clients

/////////////////////////////////////////////////////

var arrayUsers = [];

io.on("connection", function(socket){
	console.log("Co nguoi ket noi" + socket.id);

	socket.on("client-send-Username", function(data){

		if( arrayUsers.indexOf(data) >=0)
		{
			socket.emit("server-send-reg-failed");
		}
		else
		{
			arrayUsers.push(data);
			socket.username = data;
			socket.emit("server-send-reg-success", data);
			io.sockets.emit("server-send-list-User", arrayUsers);
		}
		//console.log(data);
	});

	socket.on("logout", function(){

		arrayUsers.splice(
			arrayUsers.indexOf(socket.username) , 1
		);
		socket.broadcast.emit("server-send-list-User",arrayUsers);
	});

	socket.on("user-send-message", function(data){
		io.sockets.emit("server-send-message", {un:socket.username, nd:data} );
	});

	socket.on("typing",function()
	{
		var s = socket.username + " dang nhap ...";
		io.sockets.emit("someone_typing", s);
	});

	socket.on("stop-type",function()
	{
		var s = socket.username + " khong go nua";
		io.sockets.emit("someone_stop_type", s);
	});

});

app.get("/", function(req, res){
	res.render("trangchu");
});


