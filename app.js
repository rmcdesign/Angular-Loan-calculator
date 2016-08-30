var financeApp = angular.module('financeApp', []);

financeApp.controller('financeController', ['$scope', function($scope) {

  var finance = this;

  $scope.loanAmount = 24000;
  $scope.loanTerm = 43;      
  $scope.creditRating = 'excellent';
  $scope.interestRate;
  $scope.repAprVal;
  $scope.AprPercentage;
  $scope.bestAprVal;
  $scope.monthlyRepaymentExample;
  $scope.totalAmountPayable;
  $scope.totalCostExample;

  finance.calculateRepayments = function() {
    switch($scope.creditRating) {
      case 'bad':
        $scope.interestRate = 0.0415;
        $scope.repAprVal = 33.2;
        $scope.AprPercentage = 0.175;
        $scope.bestAprVal = 8.0;
        break;
      case 'poor':
        $scope.interestRate = 0.0350;
        $scope.repAprVal = 25.6;
        $scope.AprPercentage = 0.1347;
        $scope.bestAprVal = 6.8;
        break;
      case 'average':
        $scope.interestRate = 0.0305;
        $scope.repAprVal = 16.8;
        $scope.AprPercentage = 0.088;
        $scope.bestAprVal = 5.9;
        break;
      case 'good':
        $scope.interestRate = 0.0270;
        $scope.repAprVal = 13.9;
        $scope.AprPercentage = 0.0725;
        $scope.bestAprVal = 5.2;
        break;
      case 'excellent':
        $scope.interestRate = 0.0250;
        $scope.repAprVal = 11.2;
        $scope.AprPercentage = 0.058;
        $scope.bestAprVal = 4.9;
        break;
      default:
        $scope.interestRate = 0.0305; // setting average as default
    }

    $scope.monthlyRepayments = (((parseInt($scope.loanAmount) * $scope.interestRate) * (parseInt($scope.loanTerm) / 12)) + parseInt($scope.loanAmount)) / parseInt($scope.loanTerm);

    finance.updateRepresentativeExample($scope.creditRating, $scope.repAprVal, $scope.AprPercentage);
  };

  finance.updateRepresentativeExample = function(creditRating, repAprVal, AprPercentage) {
    // loan amount and loan term are static here
    $scope.monthlyRepaymentExample = (((7500 * AprPercentage) * (48 / 12)) + 7500) / 48;
    $scope.totalAmountPayable = $scope.monthlyRepaymentExample * 48;
    $scope.totalCostExample = $scope.totalAmountPayable - 7500;
  }

  finance.updateButtonUrl = function() {
    var buttonUrl = 'https://application.zuto.com/apply/?affiliate&campaign=none&vehicleValue=' + $scope.loanAmount + '&repaymentPeriod=' + $scope.loanTerm + '&creditRating=' + $scope.creditRating;
    return buttonUrl;
  }

  finance.calculateRepayments();

}]);


// main app module with sub modules loaded as dependencies ng-app="mainApp"
angular.module("mainApp", 
  [
    "financeApp"
  ]
);

