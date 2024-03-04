module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), //config inicial
    less: { //configurando do plugin grunt-contrib-less
      development: {
        files: {
          'dev/styles/main.css': 'src/styles/main.less' //arquivo de destino e origem
        }
      },
      production: {
        options: { //arquivo minificado, versão de produção
          compress: true,
        },
        files: {
          'dist/styles/main.min.css': 'src/styles/main.less' //dist de distribuição
        }
      }
    },
    watch: {
      less: {
        files: ['src/styles/**/*.less'], //dois asteriscos é para qlqr pasta, e * é para qlqr arquivo
        tasks: ['less:development']
      },
      html: {
        files: ['src/index.html'],
        tasks: ['replace:dev']
      }
    },
    replace: {
      dev: {
        options: {
          patterns: [
            {
              match: 'ENDERECO_DO_CSS',
              replacement: './styles/main.css'
            },
            {
              match: 'ENDERECO_DO_JS',
              replacement: '../src/scripts/main.js'
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['src/index.html'],
            dest: 'dev/'
          }
        ]
      },
      dist: {
        options: {
          patterns: [
            {
              match: 'ENDERECO_DO_CSS',
              replacement: './styles/main.min.css'
            },
            {
              match: 'ENDERECO_DO_JS',
              replacement: './scripts/main.min.js'
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['prebuild/index.html'],
            dest: 'dist/'
          }
        ]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true, //tira todo comentario
          collapseWhitespace: true //tira todo espaço em branco
        },
        files: {
          'prebuild/index.html': 'src/index.html'
        }
      }
    },
    clean: ['prebuild'], //coloca aqui a pasta que quer deletar
    uglify: {
      target: {
        files: {
          'dist/scripts/main.min.js': 'src/scripts/main.js'
        }
      }
    }
    // sass: {
    //   dist: {
    //     options: { //arquivo minificado, versão de produção
    //       style: 'compressed'
    //     }, 
    //     files: {
    //       'main2.css': 'main.scss'
    //     }
    //   }
    // },
    // concurrent: {
    //   target: ['olaGrunt', 'less', 'sass'] //fazemos isso para a tarefa ola grunt nao segurar as demais no carregamento..executando task de forma paralela
    // }
  })

  // grunt.registerTask('olaGrunt', function() {
  //   const done = this.async();
  //   setTimeout(function() {
  //     console.log('Olá Grunt');
  //     done();
  //   }, 3000);
  // })

  grunt.loadNpmTasks('grunt-contrib-less'); //carregamento deste plugin
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify')
  // grunt.loadNpmTasks('grunt-contrib-sass');
  // grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['watch']); //nesse array conterá o nome de todas as tarefas, dai na hora de rodar no terminal não precisa adc o nome da tarefa
  grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);  //essa task build(construir) o termo que usamos para publicar a nossa aplicação no ambiente produtivo
}