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

release = dist(config);

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

gulp.task('bump-version', release.bumpVersion);
gulp.task('update-plugin-file-version', release.updateWordPressPluginFile);
gulp.task('make-asset', release.makeReleaseAsset);
gulp.task('deploy-asset', release.deployReleaseAsset);
gulp.task('commit-changes', release.commitAllChanges);
gulp.task('tag-and-push', release.tagAndPush);
