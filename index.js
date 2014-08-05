// example extractor that returns the number of bytes in the app's index page
var HttpClient = require("httpclient").HttpClient;

var extract = module.exports = function(app) {
  return new HttpClient({url:app.url}).finish().body.read().length;
};

if (require.main === module) {
  console.log(extract(require('./app.json')));
}
