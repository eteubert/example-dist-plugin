var gulp = require('gulp');
var runSequence = require('run-sequence');
var githubConfig = require('github-config');
// var dist = require('br-wordpress-gulp-dist');
var dist = require('/Users/ericteubert/code/br-wordpress-gulp-dist/dist.js');

var config = {
    pluginFile: './plugin.php'
};

gulp.task('default', function() {
    runSequence(
        'bump-version',
        'update-plugin-file-version',
        'make-asset',
        'deploy-asset'
    );
});

gulp.task('bump-version', dist.bumpVersion);
gulp.task('update-plugin-file-version', function(cb) {
    return dist.updateWordPressPluginFile(config.pluginFile, cb);
});
gulp.task('make-asset', dist.makeReleaseAsset);
gulp.task('deploy-asset', function(cb) {

    return dist.deployReleaseAsset({
        manifest: require('./package.json'),
        token: githubConfig().token
    });

    cb();
});
