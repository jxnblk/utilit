
var fs = require('fs');
var path = require('path');
var utilit = require('..');

var Humanize = require('humanize-plus');

var bs = fs.readFileSync(path.join(__dirname, './css/bootstrap.css'), 'utf8');

var prefix = 'u-';
var utilities = [
  { property: 'display', value: 'block', className: 'block' },
  { property: 'display', value: 'inline-block', className: 'inline-block' },
  { property: 'display', value: 'inline', className: 'inline' },
  { property: 'display', value: 'table', className: 'display-table' },
  { property: 'float', value: 'left', className: 'left' },
  { property: 'float', value: 'right', className: 'right' }
];

var result = utilit({
  css: bs,
  utilities: utilities
});

//console.log(result);
fs.writeFileSync(path.join(__dirname, './result.json'), JSON.stringify(result, null, 2));
fs.writeFileSync(path.join(__dirname, './result.css'), result.css);

console.log('Test results saved');
console.log('Original size: ' + Humanize.fileSize(result.report.originalSize), 'New size: ' + Humanize.fileSize(result.report.newSize));

