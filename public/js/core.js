var app = angular.module("articlesApp", ["ngRoute",'ngSanitize']);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "articles.html",
            controller: "articleController"
        })
        .otherwise({
            redirectTo: '/'
        });
});