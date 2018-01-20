(function($,root){
   var $scope = $(document.body);
   var controlManager;
   var $playList = $("<div class='play-list'>"+
                       "<div class='list-header'>播放列表</div>"+
                       "<ul class='list-wrapper'></ul>"+
                       "<div class='close-btn'>关闭</div>"+
                     "</div>");
   function render(data){
       var html = "";
       for(var i = 0 ; i < data.length ; i++){
           html += "<li><h3>" + data[i].song + "-<span>"+data[i].singer+"</span></h3></li>";
       }
       $playList.find(".list-wrapper").html(html);
       $scope.append($playList);
       bindEvent();
   }
   function bindEvent(){
       $playList.find(".close-btn").on("click",function(){
           $playList.removeClass("show");
       });
       $playList.find("li").on("click",function(){
           var index = $(this).index();
           singsong(index);
           controlManager.index = index;
           $scope.trigger("play:change",[index,true]);
           setTimeout(function(){
              $playList.removeClass("show");
              $scope.find(".play-btn").addClass("playing");
           },1100);
       })
   }
   function show(controlmanager){
       controlManager = controlmanager;
       var index = controlmanager.index;
    //    console.log(controlManager.haha);
        $playList.addClass("show");
        singsong(index);
   }
   function singsong(index){
       $playList.find(".playing").removeClass("playing");
       $playList.find("li").eq(index).addClass("playing");
   }
   root.playlist = {
       render:render,
       show:show
   }
}(window.Zepto,window.player || (window.player = {})))