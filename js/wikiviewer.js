var classApp = angular.module('wikiApp', []);

classApp.controller("wikiCtrl", function($scope, $http) {
 // angular.element(document).ready(function () {  
  $scope.wikiInfo = {
    heading: "Wikipedia Search",
    appInfo: "A simple wikipedia app that displays that lets you search information using the search input.",
    subHeading2: {
      githubprofile: "https://github.com/Yacub93",
      linkedinprofile: "https://uk.linkedin.com/in/yacub-ali-4898b9103"
    }
  };


  $scope.results = [];

      $scope.reset = function() {
        if($scope.formData.searchTerm) $scope.formData.searchTerm = '';
        if($scope.results) $scope.results = '';
    };


  $scope.search = function(value) {
    if (typeof value == 'undefined' || value == null || value == "") {
      console.log("searchTerm " + value);
      alert("Please Enter a Search Term!");
    } 
    else {

    $scope.results = [];

    var title = $scope.formData.searchTerm;
    var wikiURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=20&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb = '&callback=JSON_CALLBACK';
    var page = 'https://en.wikipedia.org/?curid=';

   
    // Use jsonp for cross-site requests to bypass the HTTP access control (CORS)
    $http.jsonp(wikiURL + title + cb)
    .success(function(data) {
      // if (typeof data == 'undefined' || data == null) {
      // console.log(data);
      // alert("No Search results found!");
    // } 
      var results = data.query.pages;

        angular.forEach(results, function(value, key) {
        $scope.results.push({title: value.title, 
        					 body: value.extract,
        					 page: page + value.pageid,
        					 // image: value.thumbnail.source
        					 });

        // console.log($scope.results);

    	  });
    	});
    } //.Close check searchTerm
  } //.Close search function
  // });//document.ready

}); //.Close controller         
    

     
 
  