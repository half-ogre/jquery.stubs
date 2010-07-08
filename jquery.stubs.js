/*
 * jquery.stubs - A jQuery plugin for stubbing jQuery, to make unit testing jQuery less painful
 * 
 * http://github.com/anglicangeek/jquery.stubs
 *
 * Copyright (c) 2010 Andrew Miller <ego@anglicangeek.com>
 * Licensed under the MIT (LICENSE.txt) licenses.
 */
 
(function($) {
  
  var _init = $.fn.init,
      selectorStubs = [],
      functionStubs = [];
      
  $.fn.init = function(selector, context) {
    for (var n = 0; n < selectorStubs.length; n++) {
      var selectorStub = selectorStubs[n];
      if (selectorStub.selector === selector && selectorStub.context === context) {
        var stub = { };
        selectorStub.callback(stub);
        return stub;
      }
    }

    return new _init(selector, context);
  };
  
  $.stubs = { 
    addForSelector: function() { 
      var callback = arguments[arguments.length - 1],
          selector = arguments[0],
          context;
          
      if (arguments.length > 2) {
        context = arguments[1];
      }
      
      selectorStubs.push({
        selector: selector,
        context: context,
        callback: callback
      });
    },
    addForFunction: function(name, stub) {
      var real = $[name];
      $[name] = stub;
      functionStubs.push({
        name: name,
        real: real
      });
    },
    removeAll: function() {
      selectorStubs = [];
      for (var n = 0; n < functionStubs.length; n++) {
        var functionStub = functionStubs[n];
        $[functionStub.name] = functionStub.real; 
      }
    }
  };
  
})(jQuery);