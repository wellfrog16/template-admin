let gulp = require('gulp');
let sftp = require('gulp-sftp');
gulp.task('default', () => {
    return gulp.src('./dist/**/*').pipe(sftp({
        host: '172.25.61.96',
        port: '22',
        user: 'app',
        pass: 'app',
        remotePath: '/usr/local/tomcat/apache-tomcat-8.5.27/webapps/app'
    }));
});