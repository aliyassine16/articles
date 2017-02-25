app.controller("articleController", ['$scope', '$http', 'ArticlesService', '$location', '$rootScope', '$sce', function ($scope, $http, ArticlesService, $location, $rootScopes, $sce) {

    $scope.loading = true;


    var listSize = 4;


    var gridDisplay = ['col-xs-12', 'col-sm-12', 'col-md-3', 'col-lg-3'];
    var defaultDisplay = ['col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12'];

    $scope.displayClass = defaultDisplay;

    $scope.displayMode = "";

    $scope.sortingCriteria = "timestamp";


    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    // GET =====================================================================

    var init = function () {
        ArticlesService.get()
            .success(function (response) {
                $scope.articles = response.data.articles;
                $scope.categories = response.data.categories;
                $scope.loading = false;
                $scope.articles.sort(custom_sort_by_timestamp);
                $scope.bunchOfArticles = arrayChunck($scope.articles, listSize);
            });
    };


    var arrayChunck = function (arr, len) {

        var chunks = [],
            i = 0,
            n = arr.length;

        while (i < n) {
            chunks.push(arr.slice(i, i += len));
        }

        return chunks;
    }

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


    $scope.sortArticles = function () {
        if ($scope.sortingCriteria == "timestamp") {
            $scope.articles = $scope.articles.sort(custom_sort_by_timestamp);
        } else {
            $scope.articles = $scope.articles.sort(custom_sort_by_score);
        }


        $scope.bunchOfArticles = arrayChunck($scope.articles, listSize);


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

    function selectionFilter(article) {
        if ($scope.selection.length == 0) {
            return true; // always return true

        }
        return $scope.selection.indexOf(article.category) >= 0;
    }

    $scope.getHtmlFirstParagraph = function (html) {
        return $sce.trustAsHtml(html.substring(0, html.indexOf('</p>'))); // the first paragraph only
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
        console.log($scope.selection);


        // apply ghe filters

    };


    init();


}]);