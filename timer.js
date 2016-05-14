var Timer = function() {
  var self = this;
  
  self.startTime = Date.now();
  self.value = 0;
  
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting == "hello" && sender.tab)
        sendResponse({farewell: "goodbye"});
    });
}

Timer.prototype.start = function() {
  var self = this;
  
  self.value = 0;
  self.interval = setInterval(Timer.increment, 1000);
  return self.interval
}

Timer.prototype.stop = function() {
  var self = this;
  
  clearInterval(self.interval);
}

Timer.prototype.resume = function() {
  var self = this;
  
  self.interval = setInterval(Timer.increment, 1000);
  return self.interval
}

Timer.prototype.increment = function() {
  var self = this;
  self.value++;
}