app.controller("articleDetailController", ['$scope', '$http', 'ArticlesService', '$location', '$rootScope', '$sce', '$routeParams', function ($scope, $http, ArticlesService, $location, $rootScope, $sce, $routeParams) {

    $scope.loading = true;

    // GET =====================================================================

    var init = function () {


        if ($rootScope.data == null || $rootScope.data == undefined) {
            $location.path('/');
        } else {
            $scope.articles = $rootScope.data.articles;
            $scope.categories = $rootScope.data.categories;
            $scope.loading = false;
        }


    };


    //filter by selected categories

    $scope.getHtml = function (html) {
        return $sce.trustAsHtml(html); // the first paragraph only
    };


    // show the selected article only
    $scope.filterSelectedArticle = function (article) {

        //console.log($routeParams.articleId);
        if ($routeParams != null && $routeParams.articleId != null && $routeParams.articleId != undefined) {
            //console.log($routeParams.articleId == article.category);
            if ($routeParams.articleId == article.id) {
                return true;
            }
        }
        return false;
    };


    init();


}]);