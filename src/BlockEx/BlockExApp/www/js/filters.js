angular.module('app.filters', [])

  .filter('accAlias', function () {
    return function (input, replace) {
      var out = input;
      if (input == null) {
        out = 'external';
      };
      return out;
    };
  })