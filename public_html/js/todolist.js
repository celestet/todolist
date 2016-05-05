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

function Posts(args) {
    args = args || {};
    this.title = args.title || "";
    this.dueDate = args.dueDate || "";
    this.authorEmail = args.authorEmail || "";
}

  $(document).on('click', '.add-blog', function(){
    var addBlogScript = $("#add-blog-template").html();
    var addBlogTemplate = Handlebars.compile(addBlogScript);
    
    $('.main-container').html(addBlogTemplate);
   });

 $(document).on('click', '.blog-post-title', function(){
     var name = $(this).context.innerHTML;
     var whereClause = "title='"+name+"'";
     console.log(whereClause);
     var dataStore = Backendless.Persistence.of(Posts);
     var query={condition: whereClause };
     var tasks=dataStore.find(query).data[0];
     if(tasks["completed"]===true){
         tasks["completed"] = false;
         $(this).css('background', 'orange');
     }else{
         tasks["completed"] = true;
         $(this).css('background', 'gray');
     };
     dataStore.save(tasks);
     console.log(tasks);
 });
 $(document).on('delete', '.blog-post-title', function(event){
    event.preventDefault();
     var name = $(this).context.innerHTML;
     var whereClause = "title='"+name+"'";
     console.log(whereClause);
     var dataStore = Backendless.Persistence.of(Posts);
     var query={condition: whereClause };
     var tasks=dataStore.find(query).data[0];
     if(tasks["deleted"]===true){
         tasks["deleted"] = false;
         $(this).css('background', 'orange');
     }else{
         tasks["deleted"] = true;
         $(this).css('background', 'gray');
     };
    $(this).parent().remove();
 });
 $(document).on('submit', '.form-add-blog', function(event){
       if(title === ""){
        Materialize.toast('No title', 4000);
       }
       else if(dueDate === ""){
          Materialize.toast('No date', 4000); 
       }
             else{
       event.preventDefault();
       var data = $(this).serializeArray(),
           title = data[0].value,
           dueDate  = data[1].value;

       var dataStore = Backendless.Persistence.of(Posts);
       
       var postObject = new Posts({
           title: title,
           authorEmail: Backendless.UserService.getCurrentUser().email,
           dueDate:  dueDate
       });
     
       //dataStore.save(postObject);
       this.title.value = "";
   
           var taskStorage = Backendless.Persistence.of(Posts);
    var dataQuery = {
         condition: "author = " + ("YOUR_ID_HERE")
    };
//    var myTasks = taskStorage.find( dataQuery );
       }
   });
   
   

