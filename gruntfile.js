"use strict";

module.exports = function(grunt) {
    // setup configuration options
    grunt.initConfig({
        browserify: {
            app: {
                src: 'src/js/app.js',
                dest: 'dist/js/app.bundle.js',
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                }
            },
            test: {
                src: 'spec/**/*.spec.js',
                dest: 'tmp/spec.bundle.js',
                options: {
                    browserifyOptions: {
                        debug: true,
                        plugin: 'proxyquireify/plugin'
                    }
                }
            }
        },
        watch: {
            app: {
                files: ['src/js/**/*.js'],
                tasks: ['browserify'],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            app: {
                options: {
                    port: 9001,
                    base: './dist',
                    middleware: function(connect, options, middlewares) {
                        middlewares.unshift(require('connect-livereload')());
                        return middlewares;
                    }
                }
            }
        },
        jasmine: {
            app: {
                options: {
                    specs: 'tmp/spec.bundle.js'
                }
            }
        }

    });

    // load addiotnal modules / plugins
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // define tasks
    grunt.registerTask('default', ['browserify']);
    grunt.registerTask('serve', ['browserify:app', 'connect:app', 'watch:app']);
    grunt.registerTask('test', ['browserify:test', 'jasmine']);
}