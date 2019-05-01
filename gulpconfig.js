const src    = 'src/';

const build = 'build/';


const fonts  = 'static/fonts/';

const img    = 'static/img/';

const svg    = 'static/svg/';

const php    = 'static/';


const js     = 'static/js/';

const css    = 'static/scss/';

const html   = 'pug/';

module.exports = {  

  html: {
    src: src + html + '*.pug',
    dest: build,
    watch: src + html + '**/**/**/*.pug',
    params: {
      pretty: true
    }
  },

  css: {
    src: src + css  + '*.scss',
    dest: build,
    watch: src + css + '**/**/**/*.scss',
    params: {
      outputStyle: 'compressed'
    },
    lint: {
      config: '.scss-lint.yml'
    },
    prefix: {
      browsers: ['last 2 version']
    },
    rename: { 
      extname : '.min.css' 
    }
  },

  js: {
    src: src + js + '**/*.js',
    dest: build,
    watch: src + js + '**/*.js',
    babel: {
      presets: ['@babel/env']
    },
    rename: 'common.min.js'
  },

  fonts: {
    src: src + fonts + '**/*.{woff,woff2}',
    dest: build + 'fonts/',
    watch: src + fonts + '**/*.{woff,woff2}'
  },

  img: {
    src: src + img  + '**/**/**/*.{jpg,png}',
    dest: build + 'img/',
    watch: src + img  + '**/**/**/*.{jpg,png}'
  },

  svg: {
    src: src + svg  + '**/*.svg',
    dest: build + 'svg/',
    watch: src + svg + '**/*.svg',
    svgmin: file => {
      return {
        plugins: [{
          cleanupIDs: {
            minify: true
          }   
        }]
      }
    },
    svgstore: {
      inlineSvg: true
    },
    cheerio: {
      run: $ => {
        $('svg').attr('style', 'display:none');
      },
      parserOptions: {
        xmlMode: true
      }
    },
    rename: 'sprite-svg.svg'
  },
  php: {
    src: src + php + '*.php',
    dest: build,
    watch: src + php + '*.php'
  },

  __baseDir: build

}