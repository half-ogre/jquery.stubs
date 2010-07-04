jquery.stubs - A jQuery plugin for stubbing jQuery, to make unit testing jQuery less painful
============

How to use jquery.stubs
-----------------------
Let's say you want to unit test the following code: 

    $(#theForm).submit(function() {
      return false;
    });

With jquery.stubs, your unit test might look like:

    test("will prevent the form from submitting", function() {
      // arrange
      var actual = null;
      $.stubs.addForSelector("#theForm", function(stub) {
        stub.submit = function(handler) {
          actual = handler();
        }
      });
  
      // act
      $(#theForm).submit(function() {
        return false;
      });
  
      // assert
      equals(actual, false);
    });

You can also stub jQuery functions (like `$.ajax()`) using `$.stubs.addForFunction`, and you can remove all stubs with `$.stubs.removeAll()`. For further examples of how to use jquery.stubs, see its spec (/spec/spec.html).
