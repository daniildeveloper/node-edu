module.exports = function (grunt) {
    //load plugins
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec'
    ].forEach(function (task) {
        grunt.loadNpmTasks(task);
    });
    
    //customize plugins
    grunt.initConfig({
        cafemocha: {
            all: {
                src: 'public/qa/tests-*.js',
                options: {
                    ui: 'tdd'
                }
            }
        },
        jshint: {
            app: ['meadowlark.js', 'public/js/**/*.js', 'lib/**/*.js'],
            qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js']
        },
        exec: {
            linkchecker: {
                cmd: 'linkchecker http://localhost:3000'
            }
        }
    });
    
    //register tasks
    grunt.registerTask('default', ['cafemocha', 'jshint', 'exec']);
};