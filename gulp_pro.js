/* 生产环境做的事 */
console.log("======生产环境做的事======");
// 1. 先删除旧的文件 
// 2. 要编译less文件 
// 3. 要给css添加对应的浏览器前缀
// 3.5 压缩css代码 
// 4. 将es6的语法编译成 es5语法
// 5. 要丑化或者混淆就是代码
// 6. 要实现标签文件的组件化功能
// 7. 要添加静态资源指纹的功能 
// 8. 复制第三方的插件资源到 dist目录下 


const gulp = require("gulp");
const del = require("del");
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require('gulp-cssmin');
const babel = require("gulp-babel");
const uglify=require("gulp-uglify");
const fileInclude = require("gulp-file-include");
const rev=require("gulp-rev");
const revCollector=require("gulp-rev-collector");

gulp.task("del", () => {
  return del(["./dist"]);
});

// 3 处理css 任务
gulp.task("css", () => {
  return gulp
      .src("./src/css/*.less")
      .pipe(less())
      .pipe(
        autoprefixer({
          browsers: ["last 2 versions"]
        })
      )
      .pipe(cssmin())
      .pipe(rev())
      .pipe(gulp.dest("./dist/css/"))
      .pipe(rev.manifest({
        path:"rev-css.json"
      }))
      .pipe(gulp.dest("./rev/"));
});

// 4 处理js
gulp.task("js",()=>{
  return  gulp.src("./src/js/*.js")
  .pipe(babel())
  .pipe(uglify( { mangle: { toplevel: true } } ))
  .pipe(rev())
  .pipe(gulp.dest("./dist/js/"))
  .pipe(rev.manifest({
    path:"rev-js.json"
  }))
  .pipe(gulp.dest("./rev/"));
});

// 5 处理html 任务
gulp.task("html",()=>{
  return gulp
  .src(["src/*.html","./rev/*.json"])
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "src/components/",
      })
    )
    .pipe(revCollector())
    .pipe(gulp.dest("dist/"));
});

// 6 执行 负责第三方插件 任务
gulp.task("lib",()=>{
  return  gulp.src("./src/lib/**")
  .pipe(gulp.dest("./dist/lib/"));
});

gulp.task("default", gulp.series(["del","css","js","html","lib"]));