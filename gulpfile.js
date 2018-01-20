var gulp = require("gulp"); 
var connect = require("gulp-connect");
var less = require("gulp-less");

//转换HTML文件路径位置   流媒体播放
gulp.task("html",function(){
    gulp.src("./src/index.html")    //读文件 html文件变为流文件
        .pipe(connect.reload("./src/index.html")) 
        .pipe(gulp.dest("./dist")) //通过管道传输流文件   dest变为以前的文件形式 dist变为服务器下的文件夹
});

//转换less语法
gulp.task("less",function(){
    gulp.src("./src/css/*.less")
        .pipe(less())
        .pipe(connect.reload("./src/css/*.less"))
        .pipe(gulp.dest("./dist/css"))//自动生成css文件夹
})

//开服务器
gulp.task("server",function(){
    connect.server({
        port:8090, //不写的时候默认为8080  写的话可以写8090，写其他的也可以
        root:"./dist",
        livereload:{
            port:35728
        }
    })
})

//监听文件
gulp.task("watch",function(){
    gulp.watch("./src/index.html",["html"]);
    gulp.watch("./src/css/*.less",["less"]);
    gulp.watch("./src/js/*.js",["js"]);
})

//转移js文件
gulp.task("js",function(){
    gulp.src("./src/js/*.js")
        .pipe(connect.reload("./src/js/*.js"))
        .pipe(gulp.dest("./dist/js"))
})

gulp.task("default",["html","server","less","js","watch"]);