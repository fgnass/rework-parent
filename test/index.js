var rework = require('rework')
  , clearfix = require('..')
  , fs = require('fs')
  , path = require('path')
  , read = fs.readFileSync
  , readdir = fs.readdirSync

describe('should rework', function() {
  readdir('test/fixture').forEach(function(file) {

    if (~file.indexOf('.out')) return

    var base = path.basename(file, '.css')
      , input = read('test/fixture/' + file, 'utf8')
      , output = read('test/fixture/' + base + '.out.css', 'utf8')

    it(base, function(){
      var css = rework(input)
        .use(clearfix)
        .toString().trim()

      css.should.equal(output.trim())
    })
  })
})
