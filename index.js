// example extractor that returns the number bytes in the app's index page
var get = require("ringo/httpclient").get;

var extract = module.exports = function(app) {
  return get(app.url).content.length;
};

if (require.main === module) {
  console.log(extract({url:process.argv[2]}));
}
