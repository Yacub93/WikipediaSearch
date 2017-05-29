var classApp = angular.module('wikiApp', []);

classApp.controller("wikiCtrl", function($scope, $http) {

  $scope.wikiInfo = {
    heading: "Wikipedia Search",
    appInfo: "A simple wikipedia app that displays that lets you search information using the search input.",
    subHeading2: {
      githubprofile: "https://github.com/Yacub93",
      linkedinprofile: "https://uk.linkedin.com/in/yacub-ali-4898b9103"
    }
  };


$scope.results = [];

  $scope.search = function() {
    $scope.results = [];
    var title = $scope.formData.searchTerm;
    var wikiURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb = '&callback=JSON_CALLBACK';
    var page = 'https://en.wikipedia.org/?curid=';
    
    // use jsonp to bypass the HTTP access control (cors)
    $http.jsonp(wikiURL + title + cb)
    .success(function(data) {
    	// console.log(data);
      var results = data.query.pages;
      // console.log(results);
      	

        angular.forEach(results, function(value, key) {
        $scope.results.push({title: value.title, 
        					 body: value.extract,
        					 page: page + value.pageid
        					 });

        // console.log("value= " + v + "key= " + k);
        console.log($scope.results);
      });
    });
  }

}); //.Close controller         
    

     
 
  