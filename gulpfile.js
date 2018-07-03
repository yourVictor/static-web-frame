/**
 * Created by mole【731913218@qq.com】 on 2018/5/11 下午5:12.
 * @Name: gulpfile
 * @description: gulp配置文件
 */

(function () {
	'use strict';

	let gulp = require('gulp'),
		watch = require('gulp-watch'),
		batch = require('gulp-batch'),
		rev = require('gulp-rev'),                     //版本号
		revCollector = require('gulp-rev-collector'),  //版本号
		sass = require('gulp-sass'),                   //编译sass
		autoPrefix = require('gulp-autoprefixer'),     //自动加前缀;
		compressCss = require('gulp-clean-css'),       //压缩CSS
		jshint = require('gulp-jshint'),               //js代码校验
		babel = require('gulp-babel'),                 //es6转es5
		compressJs = require('gulp-uglify'),           //压缩js
		replace = require('gulp-replace'),             //合并文件
		compressImg = require('gulp-imagemin'),        //图片压缩
		ejs = require('gulp-ejs'),                     //ejs to html
		compressHtml = require('gulp-htmlmin'),        //html压缩
		del = require('del'),                          //删除文件
		notify = require("gulp-notify"),               //handle error
		gulpSequence = require('gulp-sequence');       //顺序执行任务

    let projectConfig = require("./projectConfig"),
		currentProject = 'admin',
        viewState = false;

    let cssRev,jsRev,imgRev,revJson;
    let dist,cssDist,jsDist,imgDist,pluginsDist,htmlDist;
    let src,cssSrc,jsSrc,htmlSrc;
    let scssFile,srcCssFile,distCssFile,srcJsFile,srcJsES5ES6File,distJsFile,imgFile,pluginsFile,ejsFile,revFile,srcHtmlFile,distHtmlFile;

    //set path task
    gulp.task('set-path', function (cb) {
        dist = viewState?`dist/${projectConfig.projectName}-${currentProject}-view`:`dist/${projectConfig.projectName}-${currentProject}`;
        src = `src/project-${currentProject}`;

        revJson = `${src}/rev/**/*.json`;
        cssRev = `${src}/rev/css`;
        jsRev = `${src}/rev/js`;
        imgRev = `${src}/rev/img`;

        cssDist = `${dist}/css`;
        jsDist = `${dist}/js`;
        imgDist = `${dist}/img`;
        pluginsDist = `${dist}/plugins`;
        htmlDist = dist;

        cssSrc = `${src}/css`;
        jsSrc = `${src}/js`;
        htmlSrc = src;

        scssFile = [`${src}/_temporary/scss/*.scss`,`${src}/_temporary/scss/page/*.scss`];
        srcCssFile = `${src}/css/**/*.css`;
        distCssFile = `${dist}/css/**/*.css`;
	    srcJsES5ES6File = `${src}/_temporary/js_es5_es6/**/*.js`;
        srcJsFile = `${src}/js/**/*.js`;
        distJsFile = `${dist}/js/**/*.js`;
        imgFile = `${src}/img/**/*`;
        pluginsFile = `${src}/plugins/**/*`;
        ejsFile = `${src}/_temporary/ejs/pages/**/*.ejs`;
        srcHtmlFile = `${src}/**/*.html`;
        distHtmlFile = `${dist}/**/*.html`;
        revFile = `${src}/rev/**/*`;

	    return del([`${dist}/**/*`, revFile, srcHtmlFile], cb);
    });

	let handleErrors = function () {
		let args = Array.prototype.slice.call(arguments);

		notify.onError({
			title: 'build error',
			message: '<%=error.message %>'
		}).apply(this, args);//替换为当前对象

		this.emit("end");//提交
	};

    //build plugins task
    gulp.task('plugins', function () {
        return gulp.src(pluginsFile)
            .pipe(gulp.dest(pluginsDist));
    });

    //build sass task
    gulp.task('sass', function () {
        return gulp.src(scssFile)
	        .pipe(sass().on('error', handleErrors))
            .pipe(gulp.dest(cssSrc));
    });
    gulp.task('cssOperate', function () {
        let cssConfig = projectConfig[currentProject].css;
        let cv = (cssConfig.compress?"1":"0")+(cssConfig.version?"1":"0");
        switch (cv) {
            case '00':
                return gulp.src(srcCssFile)
                    .pipe(autoPrefix())
                    .pipe(gulp.dest(cssDist));
            case '01':
                return gulp.src(srcCssFile)
                    .pipe(autoPrefix())
                    .pipe(rev())
                    .pipe(gulp.dest(cssDist))
                    .pipe(rev.manifest())
                    .pipe(gulp.dest(cssRev));
            case '10':
                return gulp.src(srcCssFile)
                    .pipe(autoPrefix())
                    .pipe(compressCss())
                    .pipe(gulp.dest(cssDist));
            case '11':
                return gulp.src(srcCssFile)
                    .pipe(autoPrefix())
                    .pipe(compressCss())
                    .pipe(rev())
                    .pipe(gulp.dest(cssDist))
                    .pipe(rev.manifest())
                    .pipe(gulp.dest(cssRev));

        }
    });
    gulp.task('revCollectorCss', function () {
        return gulp.src([revJson, distCssFile])
            .pipe(revCollector())
            .pipe(gulp.dest(cssDist));
    });

    //build js task
	gulp.task('jsBabel', function () {
		return gulp.src(srcJsES5ES6File)
			.pipe(babel({
				presets: ['env'],
				plugins: ["transform-remove-strict-mode"]
			}))
			.pipe(gulp.dest(jsSrc));
	});
    gulp.task('jshint', function () {
        return gulp.src(srcJsFile)
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });
    gulp.task('jsOperate', function () {
        let jsConfig = projectConfig[currentProject].js;
        let cv = (jsConfig.compress?"1":"0")+(jsConfig.version?"1":"0");
        switch (cv) {
            case '00':
                return gulp.src(srcJsFile)
                    .pipe(gulp.dest(jsDist));
            case '01':
                return gulp.src(srcJsFile)
                    .pipe(rev())
                    .pipe(gulp.dest(jsDist))
                    .pipe(rev.manifest())
                    .pipe(gulp.dest(jsRev));
            case '10':
                return gulp.src(srcJsFile)
                    .pipe(compressJs())
                    .pipe(gulp.dest(jsDist));
            case '11':
                return gulp.src(srcJsFile)
                    .pipe(compressJs())
                    .pipe(rev())
                    .pipe(gulp.dest(jsDist))
                    .pipe(rev.manifest())
                    .pipe(gulp.dest(jsRev));
        }
    });
    gulp.task('revCollectorJs', function () {
        return gulp.src([revJson, distJsFile])
            .pipe(replace("../js/common", "../js/common.js"))       //此处特殊（加了[.js]后缀）,编译后会自动删除后缀
            .pipe(revCollector())
            .pipe(replace(".js", ""))
            .pipe(gulp.dest(jsDist));
    });

    //build img task
    gulp.task('imgOperate', function () {
        let imgConfig = projectConfig[currentProject].img;
        let cv = (imgConfig.compress?"1":"0")+(imgConfig.version?"1":"0");
        switch (cv) {
            case '00':
                return gulp.src(imgFile)
                    .pipe(gulp.dest(imgDist));
            case '01':
                return gulp.src(imgFile)
                    .pipe(rev())
                    .pipe(gulp.dest(imgDist))
                    .pipe(rev.manifest())
                    .pipe(gulp.dest(imgRev));
            case '10':
                return gulp.src(imgFile)
                    .pipe(compressImg())
                    .pipe(gulp.dest(imgDist));
            case '11':
                return gulp.src(imgFile)
                    .pipe(compressImg())
                    .pipe(rev())
                    .pipe(gulp.dest(imgDist))
                    .pipe(rev.manifest())
                    .pipe(gulp.dest(imgRev));
        }
    });

    //build html task
    gulp.task('ejs', function () {
        return gulp.src(ejsFile)
	        .pipe(ejs({}, {}, {ext: '.html'}).on('error', handleErrors))
            .pipe(gulp.dest(htmlSrc));
    });
    gulp.task('htmlOperate', function () {
        let htmlConfig = projectConfig[currentProject].html;
        if(viewState){
	        return gulp.src(srcHtmlFile)
		        .pipe(compressHtml({
			        collapseWhitespace: htmlConfig.compress,
			        minifyCSS: htmlConfig.compressCss,
			        minifyJS: htmlConfig.compressJs,
			        removeComments: false
		        }))
		        .pipe(gulp.dest(htmlDist));
        }
	    return gulp.src(srcHtmlFile)
		    .pipe(replace(/("\.\.\/plugins")|("plugins")/, projectConfig[currentProject].pluginsPath))
		    .pipe(compressHtml({
			    collapseWhitespace: htmlConfig.compress,
			    minifyCSS: htmlConfig.compressCss,
			    minifyJS: htmlConfig.compressJs,
			    removeComments: true
		    }))
		    .pipe(gulp.dest(htmlDist));

    });
    gulp.task('revCollectorHtml', function () {
        return gulp.src([revJson, distHtmlFile])
            .pipe(revCollector())
            .pipe(gulp.dest(htmlDist));
    });

    //start build task
    gulp.task('build',function (cb) {
        gulpSequence(
	        ['set-path'],
            ['sass','jsBabel','plugins','ejs'],
            ['jshint'],
            ['cssOperate','jsOperate','imgOperate','htmlOperate'],
            ['revCollectorCss','revCollectorJs'],
            ['revCollectorHtml'],
            cb
        )
    });

	gulp.task('build-admin', function (cb) {
        currentProject = 'admin';
        viewState = false;
		gulpSequence(
            ['build'],
            cb
        );
    });
	gulp.task('build-admin-view', function (cb) {
        currentProject = 'admin';
        viewState = true;
		gulpSequence(
            ['build'],
            cb
        );
    });
	gulp.task('build-pc', function (cb) {
        currentProject = 'pc';
		viewState = false;
        gulpSequence(
            ['build'],
            cb
        );
	});
	gulp.task('build-pc-view', function (cb) {
        currentProject = 'pc';
		viewState = true;
        gulpSequence(
            ['build'],
            cb
        );
	});
	gulp.task('build-m', function (cb) {
        currentProject = 'm';
		viewState = false;
        gulpSequence(
            ['build'],
            cb
        );
	});
	gulp.task('build-m-view', function (cb) {
        currentProject = 'm';
		viewState = true;
        gulpSequence(
            ['build'],
            cb
        );
	});

	gulp.task('default', function (cb) {
		switch (process.argv[4]){
			case 'admin':
				gulpSequence(
					['build-admin'],
					['build-admin-view'],
					cb
				);
				break;
			case 'pc':
				gulpSequence(
					['build-pc'],
					['build-pc-view'],
					cb
				);
				break;
			case 'm':
				gulpSequence(
					['build-m'],
					['build-m-view'],
					cb
				);
				break;
			default:
				gulpSequence(
					['build-admin'],
					['build-admin-view'],
					['build-pc'],
					['build-pc-view'],
					['build-m'],
					['build-m-view'],
					cb
				);
		}
	});

	//run develop mode
	gulp.task('run-dev', function () {
		watch([`src/project-admin/_temporary/scss/**/*.scss`,
			`src/project-admin/_temporary/ejs/**/*.ejs`,
			`src/project-admin/_temporary/js_es5_es6/**/*.js`
		], batch(function (events, done) {
			console.log("");
			console.log("start run project-admin:");
			currentProject = 'admin';
			gulpSequence(
				['set-path'],
				['jsBabel'],
				['sass'],
				['ejs'],
				done
			);
		}));
		watch([`src/project-pc/_temporary/scss/**/*.scss`,
			`src/project-pc/_temporary/ejs/**/*.ejs`,
			`src/project-pc/_temporary/js_es5_es6/**/*.js`], batch(function (events, done) {
			console.log("");
			console.log("start run project-pc:");
			currentProject = 'pc';
			gulpSequence(
				['set-path'],
				['jsBabel'],
				['sass'],
				['ejs'],
				done
			);
		}));
		watch([`src/project-m/_temporary/scss/**/*.scss`,
			`src/project-m/_temporary/ejs/**/*.ejs`,
			`src/project-m/_temporary/js_es5_es6/**/*.js`], batch(function (events, done) {
			console.log("");
			console.log("start run project-m:");
			console.log("---------------------------");
			currentProject = 'm';
			gulpSequence(
				['set-path'],
				['jsBabel'],
				['sass'],
				['ejs'],
				done
			);
		}));

		setTimeout(function () {
			console.log("--------------------------------------------");
			console.log('admin: http://localhost:8080/static-web-frame/src/project-admin/index.html');
			console.log('pc:    http://localhost:8080/static-web-frame/src/project-pc/index.html');
			console.log('m:     http://localhost:8080/static-web-frame/src/project-m/index.html');
			console.log("--------------------------------------------");
		},300);

	});
}());