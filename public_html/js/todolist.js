$(function () {
    var APPLICATION_ID = "5768B553-43B4-BD48-FFA8-4AF317FAC300",
        SECRET_KEY = "483EAB68-8297-A8CC-FF92-985848D00C00",
        VERSION = "v1";

    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
    
    
    var postsCollection = Backendless.Persistence.of(Posts).find();

    console.log(postsCollection);
    
    var wrapper = {
        posts: postsCollection.data
    };
   
    Handlebars.registerHelper('format', function (time){
        return moment (time).format("dddd, MMMM, Do, YYYY");
    });
    
    var blogScript = $("#blogs-template").html();
    var blogTemplate = Handlebars.compile(blogScript);
    var blogHTML = blogTemplate(wrapper);
    
    $('.main-container').html(blogHTML);
    

});

function Posts (args) {
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
}

 $(document).on('submit', '.form-add-new-task', function(event){
       if("empty"){
        Materialize.toast('No title or content', 4000);   
       }
       event.preventDefault();
       var data = $(this).serializeArray(),
           title = data[0].value,
           content = data[1].value;

       
       var dataStore = Backendless.Persistence.of(Posts);
       
       var postObject = new Posts({
           title: title,
           content:  content,
           authorEmail: Backendless.UserService.getCurrentUser().email
       
       });
       dataStore.save(postObject);
       
       this.title.value = "";
       this.content.value = "";
   });






