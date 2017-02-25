app.factory('ArticlesService', ['$http', function ($http) {
    return {
        get: function () {
            return $http.get('/api/listArticles');
        }
    }
}]);