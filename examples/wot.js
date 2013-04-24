// http://www.mywot.com/wiki/API
var HttpClient = require("httpclient").HttpClient;

function get(url) {
  return new HttpClient({ url: app.url }).finish().body.read();
}

var extract = module.exports = function(app) {
  var result = JSON.parse(get("http://api.mywot.com/0.4/public_link_json?hosts=" + encodeURIComponent(app.url) + "/").content);
  for (var key in result) {
    result = result[key];
    break;
  }
  if (result && result[0]) {
    return {
      trust:result[0] ? result[0][0] : undefined,
      reliability:result[1] ? result[1][0] : undefined,
      privacy:result[2] ? result[2][0] : undefined
    };
  }
};

if (require.main === module) {
  console.log(extract({url:process.argv[2]}));
}
