var companyService = (function(){

  return {
    getName: function(url){
      switch (true){
        case (url.search(/doubleclick/) != -1):
          return 'DoubleClick';
          break; 
        case (url.search(/2mdn/) != -1):
          return 'DoubleClick';
          break;
        case (url.search(/googleadservices/) != -1):
          return 'DoubleClick for Publishers';
          break;
        case (url.search(/google/) != -1):
          return 'Google';
          break;
        case (url.search(/facebook/) != -1):
          return 'Facebook';
          break;
        case (url.search(/spongecell/) != -1):
          return 'Spongecell';
          break;
        case (url.search(/doubleverify/) != -1):
          return 'DoubleVerify';
          break;
        case (url.search(/tdmt/) != -1):
          return 'Atlas Solutions';
          break;
        case (url.search(/BurstingPipe/) != -1):
          return 'Sizmek';
          break;
        case (url.search(/displayadtech/) != -1):
          return 'Display AdTech';
          break;
        case (url.search(/pointroll/) != -1):
          return 'PointRoll';
          break;
        case (url.search(/intregral/) != -1):
          return 'Integral Ad Science';
          break;
        default: 
        return false;
      }
    },
    getInfo: function(name, url, callback) {
      $.ajax({
        url: 'http://www.displayadtech.com/api/companies?name='+name,
        context: document.body
      }).done(function(data) {
        callback(data);
      });
    }
  }
}());