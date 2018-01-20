(function($,root){
    function controlManager(length){
        this.index = 0;
        this.length = length;
    }
    controlManager.prototype = {
        prev:function(){
            return this.getIndex(-1);
        },
        next:function(){
            return this.getIndex(1);
        },
        getIndex:function(val){
             var index = this.index;
             var length = this.length;
             var curIndex = (index + val + length) % length;
             this.index  = curIndex;
             return this.index;
        }
    }
    root.controlManager = controlManager;
}(window.Zepto , window.player || (window.play = {})))