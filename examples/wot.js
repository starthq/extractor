// http://www.mywot.com/wiki/API
var HttpClient = require("httpclient").HttpClient;

function get(url) {
  return new HttpClient({
    url:url,
    headers:{
      'User-Agent':userAgent || 'Mozilla/5.0 (Linux) AppleWebKit/537.22 (KHTML, like Gecko)'
    },
    timeout:15000,
    agent:false
  }).finish();
}

function queryUrl(key, url) {
  return 'http://api.mywot.com/0.4/public_link_json2?key=' + key + '&hosts=' + encodeURIComponent(url) + '/';
}

var extract = module.exports = function(app, key) {
  var response = get(queryUrl(key, app.url));
  var reply = JSON.parse(response.body.read().decodeToString());
  response.body.close();
  for (var key in reply) {
    var data = reply[key];
    var result = {};
    ['trust', 'reliability', 'privacy'].forEach(function(name, index) {
      if (data[index][0]) {
        result[name] = data[index][0];
      }
    });
    return result;
  }
};

if (require.main === module) {
  console.log(extract({url:process.argv[2]}, 'Your API key'));
}