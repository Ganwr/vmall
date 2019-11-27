
const { src, dest, parallel, series, watch } = require('gulp');
const clean=require('gulp-clean');
const fileinclude=require('gulp-file-include')
const sass=require('gulp-sass');
const webserver=require('gulp-webserver')


function cleanTask(){
    return src('./dist',{allowEmpty:true})
    .pipe(clean());
}

function viewsTask(){
    return src('./src/views/**')
    .pipe(fileinclude({
        prefix:'@',
        basepath:'./src/views/templates'
    })).pipe(dest('./dist/views'));
}
function cssTask(){
    return src('./src/css/all.scss')
    .pipe(sass())
    .pipe(dest('dist/css'));
}
function libTask(){
    return src('./src/lib/**')
    .pipe(dest('./dist/lib'))
}
function mockTask(){
    return src('./src/mock/**')
    .pipe(dest('./dist/mock'))
}
function staticTask(){
    return src('./src/static/**')
    .pipe(dest('./dist/static'))
}
function serverTask(){
    return src('./src/server/**')
    .pipe(dest('./dist/server'))
}
function jsTask(){
    return src('./src/js/**')
    .pipe(dest('./dist/js'))
}
// function fontTask(){
//     return src('./src/font/**')
//     .pipe(dest('./dist/font'))
// }
function watchTask(){
    watch('./src/css/**',cssTask);
    watch('./src/js/**',jsTask);
    watch('./src/lib/**',libTask);
    watch('./src/views/**',viewsTask);
    watch('./src/mock/**',mockTask);
    watch('./src/server/**',serverTask);
    watch('./src/static/**',staticTask);
}
function webserverTask(){
    return src('./dist')
    .pipe(webserver({
        host:'localhost',
        port:3000,
        open:'./views/index.html',
        liverload:true
    }))
}
module.exports={
    dev:series(cleanTask,parallel(cssTask,jsTask,libTask,mockTask,staticTask,serverTask,viewsTask),
    parallel(webserverTask,watchTask))
}