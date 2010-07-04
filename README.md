jquery.stubs
============
_A jQuery plugin for stubbing jQuery, to make unit testing jQuery less painful_

How to use jquery.stubs
-----------------------
Let's say you want to unit test the following code: 

    function preventFormSubmit() {
      $("#theForm").submit(function() {
        return false;
      });
    }

With jquery.stubs, your unit test might look like:

    test("the preventFormSubmit() method will prevent the form from submitting", function() {
      // arrange
      var actual = null;
      $.stubs.addForSelector("#theForm", function(stub) {
        stub.submit = function(handler) {
          actual = handler();
        }
      });
  
      // act
      preventFormSubmit();
      
      // assert
      equals(actual, false);
    });

You can also stub jQuery functions (like `$.ajax()`) using `$.stubs.addForFunction`, and you can remove all stubs with `$.stubs.removeAll()`. For further examples of how to use jquery.stubs, see [its spec](http://github.com/anglicangeek/jquery.stubs/blob/master/spec/spec.html).
