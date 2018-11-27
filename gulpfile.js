let gulp = require('gulp');
let sftp = require('gulp-sftp');
gulp.task('default', () => {
    return gulp.src('./dist/**/*').pipe(sftp({
        host: '',
        port: '',
        user: '',
        pass: '',
        remotePath: ''
    }));
});