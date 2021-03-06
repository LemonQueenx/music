(function($ , root){
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var lastPercentage = 0;
    var startTime;
    function format(duration){
       duration = Math.round(duration);
       var minute = Math.floor(duration / 60);
       var second = duration - minute * 60;
       if(minute < 10){
           minute = "0" + minute;
       }
       if(second < 10){
           second = "0" + second;
       }
       return minute + ":" + second;
    }
    function renderTime(duration){
       curDuration = duration;
       lastPercentage = 0;
       updata(0);
       var allTime = format(duration);
       $scope.find(".all-time").html(allTime);
    }
    function processorRender(percentage){
        var percent = (percentage - 1) * 100 +"%";
        $scope.find(".pro-top").css({
            transform : "translateX("+percent+")"
        })
    }
    function updata(percentage){
        var time = percentage * curDuration ;
        time = format(time);
        $scope.find('.cur-time').html(time);
        processorRender(percentage);    
    }
    function start(percent){
        lastPercentage = percent === undefined ? lastPercentage : percent;
        cancelAnimationFrame(frameId); 
        startTime = new Date().getTime();
        function frame(){
           var curTime = new Date().getTime();
           var percentage = lastPercentage + ( curTime - startTime) / ( curDuration * 1000 );
        //    console.log(percentage);
           if(percentage < 1){
               updata(percentage);
               frameId = requestAnimationFrame(frame); 
           }else{
               cancelAnimationFrame(frameId);
           }
        }
        frame();
    }
    function stop(){
        var stopTime = new Date().getTime();
        lastPercentage = lastPercentage + (stopTime - startTime)/( curDuration * 1000 )
        cancelAnimationFrame(frameId);

    }
    root.processor = {
        renderTime : renderTime,
        start : start,
        stop : stop,
        updata :updata
    };
}(window.Zepto , window.player || (window.player = {})))