var entries = (function(){

  var 
    formatSize = function(number) {
    return numeral(number).format('0.00 b')
  },

  totalSize = function(entries) {

    if (entries && entries.length === 1) {

      var size = entries[0].response.content.size;
      return formatSize(size);

    } else if (entries && entries.length > 0) {
      
      var size = entries.reduce(function(previous, currentEntry, index, array) {
        if (index === 1) {
          return previous.response.content.size + currentEntry.response.content.size;
        } else {
          return previous + currentEntry.response.content.size;
        }
      });
      return formatSize(size);

    } else {
      return formatSize(0);
    }

  };
  
  return {
    totalSize: function(entries) {
      return totalSize(entries);
    },
    formatSize: function(size) {
      return formatSize(size);
    }
  }

}());
