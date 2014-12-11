
var fs = require('fs');
var postcss = require('postcss');
var cheerio = require('cheerio');

module.exports = function(options) {

  var options = options || {};
  var result = {};
  var replacementMap = [];
  var report = {};

  if (options.src) {
    options.css = fs.readFileSync(src, 'utf8');
  }

  if (!options.css) {
    console.log('No CSS provided');
    return;
  }

  if (!options.html) {
    console.log('No HTML provided');
  }

  if (!options.utilities) {
    console.log('No utilities provided');
  }

  report.originalSize = Buffer.byteLength(options.css, 'utf8');

  function replaceDeclarations(rule) {
    rule.eachDecl(function(d) {
      options.utilities.forEach(function(u) {
        if (u.property == d.prop && u.value == d.value) {
          replacementMap.push({ className: rule.selector, utility: u });
          //console.log('Replacing ' + d.prop + ': ' + d.value + ' with .' + u.className);
          d.removeSelf();
        }
      });
    });
    return rule;
  }

  function parseUtilities() {
    var root = postcss.parse(options.css);
    root.eachRule(function(rule) {
      rule = replaceDeclarations(rule);
    });
    return root.toResult();
  }

  function replaceClasses() {
    var html = '';
    return html;
  }

  result.css = parseUtilities().css;
  result.html = replaceClasses();
  result.replacementMap = replacementMap;

  report.newSize = Buffer.byteLength(result.css, 'utf8');
  result.report = report;

  return result;

};

