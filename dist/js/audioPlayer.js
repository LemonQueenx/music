(function($ , root){
    var $scope = $(document.body);
    function audioPlayer(){
        this.audio = new Audio();
        this.status = "pause";
        this.bindEvent();
    }
    audioPlayer.prototype = {
        bindEvent : function(){
            $(this.audio).on("ended",function(){
                 $scope.find(".next-btn").trigger("click");
            })
        },
        play:function(){
            this.audio.play();
            this.status = "play";
        },
        pause:function(){
            this.audio.pause();
            this.status = "pause";
        },
        setAudioSource:function(src){
            this.audio.src = src;
            this.audio.load();
        },
        jumpToPlay : function(time){
            this.audio.currentTime = time;
            this.play();
        }
    }
    root.audioPlayer = audioPlayer;
}(window.Zepto , window.player || (window.player = {})))