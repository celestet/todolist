$(function (){
    var APPLICATION_ID = "5768B553-43B4-BD48-FFA8-4AF317FAC300",
        SECRET_KEY = "483EAB68-8297-A8CC-FF92-985848D00C00",
        VERSION = "v1";
        
        Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);

var postCollection = Backendless.Persistence.of(Posts).find();
});

function Posts(args) {
	args = args || {};
	this.title = args.title || "";
	this.authorEmail = args.authorEmail || "";
	this.content = args.content || "";
}


