var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var render = root.render;
var songList;
var controlManager = root.controlManager;
var contolmanager;
var audioplayer = new root.audioPlayer();
var processor = root.processor;
var x = 0;
var playlist = root.playlist;
// var index = 0; 

$scope.on("play:change",function(event,index,flag){
    var curSong = songList[index];
    x = index;
    render(curSong);
    audioplayer.setAudioSource(curSong.audio);
    if(audioplayer.status == "play" || flag){
        audioplayer.play();
        processor.start();
    }
    processor.renderTime(curSong.duration);
})
$scope.find(".like-btn").on("click",function(){
    // if(index === 0){index = songList.length - 1;}else{index--;}
    songList[x].isLike = !songList[x].isLike;
    render(songList[x]);

})
$scope.find(".prev-btn").on("click",function(){
    // if(index === 0){index = songList.length - 1;}else{index--;}
    var index = controlmanager.prev();
    $scope.trigger("play:change",index);
})
$scope.find(".next-btn").on("click",function(){
    // if(index === songList.length - 1){index = 0;}else{index++;}
    var index = controlmanager.next();
    $scope.trigger("play:change",index);
})
$scope.find(".play-btn").on("click",function(){
    $(this).toggleClass("playing");
    if(audioplayer.status == "pause"){
        audioplayer.play();
        processor.start();
        // $(this).addClass("playing");
    }else{
        audioplayer.pause();
        processor.stop();
        // $(this).removeClass("playing");
    }
})
$scope.find(".list-btn").on("click",function(){
    playlist.show(controlmanager);
})

function bindTouch(){
    var $sliderPoint = $scope.find(".slider-point");
    var offset = $scope.find(".pro-wrapper").offset();
    var left = offset.left;
    var width = offset.width;
    $sliderPoint.on("touchstart",function(e){
        processor.stop();
    }).on("touchmove",function(e){
        var x = e.changedTouches[0].clientX;
        var percentage = ( x - left)/width;
        if(percentage > 1 || percentage < 0 ){
            percentage = 0;
        }
        processor.updata(percentage);
    }).on("touchend",function(e){
        var x = e.changedTouches[0].clientX;
        var percentage = ( x - left)/width;
        if(percentage > 1 || percentage <0){
            percentage = 0;
        }
        processor.updata(percentage);
        var index = controlmanager.index;
        var curDuration = songList[index].duration;
        var duration = curDuration * percentage;
        audioplayer.jumpToPlay(duration);
        processor.start(percentage);
        // processor.start();
        $scope.find(".play-btn").addClass("playing");
    })
}

function getData(url,cb){
    $.ajax({
        url:url,
        type:"GET",
        success:cb,
        error:function(e){
            console.log(e);
        }
    })
}
function successCb(data){
    controlmanager = new controlManager(data.length);
    songList = data;
    $scope.trigger("play:change",0);
    playlist.render(data);
    bindTouch();
}

getData("./mock/data.json",successCb);