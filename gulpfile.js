var gulp = require('gulp');
var runSequence = require('run-sequence');
var githubConfig = require('github-config');
// var dist = require('br-wordpress-gulp-dist');
var dist = require('/Users/ericteubert/code/br-wordpress-gulp-dist/dist.js');
var path = require('path');

var config = {
    pluginFile: './plugin.php',
    manifest: path.resolve('./package.json'),
    token: githubConfig().token
};

gulp.task('release', function() {
    runSequence(
        'bump-version',
        'update-plugin-file-version',
        'commit-changes',
        'tag-and-push',
        'make-asset',
        'deploy-asset'
    );
});

gulp.task('bump-version', dist.bumpVersion);
gulp.task('update-plugin-file-version', function() {
    return dist.updateWordPressPluginFile(config);
});
gulp.task('make-asset', dist.makeReleaseAsset);
gulp.task('deploy-asset', function() {
    return dist.deployReleaseAsset(config);
});
gulp.task('commit-changes', dist.commitAllChanges);
gulp.task('tag-and-push', dist.tagAndPush);
