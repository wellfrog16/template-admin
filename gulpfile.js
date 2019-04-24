let gulp = require('gulp');
let sftp = require('gulp-sftp');
gulp.task('default', () => {
    return gulp.src('./dist/**/*').pipe(sftp({
        host: '172.25.61.103',
        port: '22',
        user: 'root', // app // root
        pass: 'soho&123', // app // soho&123
        remotePath: '/usr/local/tomcat/apache-tomcat-8.5.27/webapps/app'
    }));
});
