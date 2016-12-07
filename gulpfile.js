var gulp = require('gulp');
var runSequence = require('run-sequence');
var githubConfig = require('github-config');
var dist = require('br-wordpress-gulp-dist');
// var dist = require('/Users/ericteubert/code/br-wordpress-gulp-dist/dist.js');
var path = require('path');

var config = {
    pluginFile: path.resolve('./plugin.php'),
    manifest:   path.resolve('./package.json'),
    token:      githubConfig().token
};

var release = dist(config);
 
gulp.task('release', function() {
    runSequence(
        'bump-version',
        'update-plugin-file-version',
        'commit-changes',
        'push',
        'make-asset',
        'github-release-with-asset'
    );
});
 
gulp.task('bump-version', release.bumpVersion);
gulp.task('update-plugin-file-version', release.updateWordPressPluginFile);
gulp.task('make-asset', release.makeReleaseAsset);
gulp.task('github-release-with-asset', release.deployReleaseAsset);
gulp.task('commit-changes', release.commitAllChanges);
gulp.task('push', release.push);
