app.controller("articleController", ['$scope', '$http', 'ArticlesService', '$location', '$rootScope', '$sce', '$routeParams', function ($scope, $http, ArticlesService, $location, $rootScope, $sce, $routeParams) {

    $scope.loading = true;


    // css defined classes
    var gridDisplay = ['articleGridDisplay'];

    var defaultDisplay = ['articleListDisplay'];

    $scope.displayClass = defaultDisplay;


    //default soting criteria
    $scope.sortingCriteria = "timestamp";


    // GET =====================================================================

    var init = function () {
        ArticlesService.get()
            .success(function (response) {

                // save the articles in the root scope
                $rootScope.data = response.data;

                $scope.articles = response.data.articles;
                $scope.categories = response.data.categories;
                $scope.loading = false;
                $scope.articles.sort(custom_sort_by_timestamp);

            });
    };


    $scope.getCategoryById = function (categoryId) {
        var len = $scope.categories.length;
        for (var i = 0; i < len; i++) {
            var categoryObject = $scope.categories[i];
            if (categoryObject.id === categoryId) {
                return categoryObject;
            }
        }
        return null;
    };


    // sort articles by date or score
    $scope.sortArticles = function () {
        if ($scope.sortingCriteria == "timestamp") {
            $scope.articles = $scope.articles.sort(custom_sort_by_timestamp);
        } else {
            $scope.articles = $scope.articles.sort(custom_sort_by_score);
        }

    }


    // sort by score
    var custom_sort_by_score = function (a, b) {
        a = a.score;
        b = b.score;
        return a > b ? -1 : a < b ? 1 : 0;

    };
    //sort by timestamp
    var custom_sort_by_timestamp = function (a, b) {

        a = new Date(a.timestamp);
        b = new Date(b.timestamp);
        return a > b ? -1 : a < b ? 1 : 0;

    };

    //filter by selected categories


    $scope.getHtmlFirstParagraph = function (html) {
        return $sce.trustAsHtml(html.substring(0, html.indexOf('</p>'))); // the first paragraph only
    };
    $scope.getHtml = function (html) {
        return $sce.trustAsHtml(html); // the first paragraph only
    };


    $scope.displayGrid = function () {

        $scope.displayClass = gridDisplay;

    };
    $scope.displayList = function () {

        $scope.displayClass = defaultDisplay;


    };


    // Selected fruits
    $scope.selection = [];

    // Toggle selection for a given fruit by name
    $scope.toggleSelection = function toggleSelection(categoryId) {
        var idx = $scope.selection.indexOf(categoryId);

        // Is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }

        // Is newly selected
        else {
            $scope.selection.push(categoryId);
        }
        //console.log($scope.selection);


        // apply ghe filters

    };

    $scope.filterSelection = function (article) {
        if ($scope.selection.length == 0) {
            // no filter selection
            return true;
        }
        //console.log($scope.selection.indexOf(article.category));
        if ($scope.selection.indexOf(article.category) >= 0) {
            return true;
        }
        return false;
    };


    // show the selected article only
    $scope.filterSelectedArticle = function (article) {

        console.log($routeParams.articleId);
        if ($routeParams != null && $routeParams.articleId != null && $routeParams.articleId != undefined) {

            if ($routeParams.articleId == article.category) {
                return true;
            }
        }
        return false;
    };


    init();


}]);