var app = angular.module('starter', ['ionic']);

app.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// Persist data between states.
var bookingInfo = {
  'checkinDate': '',
  'checkoutDate': '',
  'numAdults': '',
  'numChildren': '',
  'firstName': '',
  'surName': '',
  'email': '',
  'phone': '',
  'room': '',
  'price': '',
};

app.controller('accommodationController', function ($scope, $http, $state) {

  // Read from JSON file.
  $http.get('js/rooms.json').success(function (response) {
    $scope.rooms = response.rooms;
  })

  // Initialize reservation data.
  $scope.reservation = bookingInfo;

  // Initialize room not selected.
  $scope.roomNotSelected = true;

  // Retrieve checkinDate, checkoutDate, numAdults and numChildren.
  $scope.startForm = function (reservation) {
    $state.go('rooms');
  }

  // Retrieve room name and price
  $scope.getRoomObject = function (room) {
    bookingInfo.room = room.name;
    bookingInfo.price = room.price;
    $scope.roomNotSelected = false; // room now selected
  }

  // Room chosen
  $scope.roomForm = function () {
    $state.go('details');
  }

  // Retrieve firstName, lastName, email and phone number
  $scope.detailForm = function (reservation) {
    $state.go('receipt');
  }
})

app.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'accommodationController'
  });

  $stateProvider.state('rooms', {
    url: '/rooms',
    templateUrl: 'templates/rooms.html',
    controller: 'accommodationController'
  });

  $stateProvider.state('details', {
    url: '/details',
    templateUrl: 'templates/details.html',
    controller: 'accommodationController'
  });

  $stateProvider.state('receipt', {
    url: '/receipt',
    templateUrl: 'templates/receipt.html',
    controller: 'accommodationController'
  });

  $urlRouterProvider.otherwise('/home');
})

