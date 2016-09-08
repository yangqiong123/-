var app = angular.module('angel', ['ui.router']);
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.when('', '/index/home');
	//设置路由
	$stateProvider
		.state('index', {
			url: '/index',
			templateUrl: 'html/index.html',
			controller: 'indexCtrl'
		})
		.state('index.home', {
			url: '/home',
			templateUrl: 'html/home.html',
			controller: 'homeCtrl'
		})
		.state('index.vip', {
			url: '/vip',
			templateUrl: 'html/vip.html',
			controller: 'vipCtrl'
		})
		.state('index.classification', {
			url: '/classification',
			templateUrl: 'html/classification.html',
			controller: 'classificationCtrl'
		})
		.state('index.info', {
			url: '/info/:mun',
			templateUrl: 'html/info.html',
			controller: 'infoCtrl'
		})
}]);
app.controller('indexCtrl',['$scope',function($scope) {
	$scope.toTop = function(){
		$('body').scrollTop(0);
	}
}]);

//首页控制器

app.controller('homeCtrl',['$scope','$http',function($scope, $http) {
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		slidesPerView: 1,
		speed: 300,
		paginationClickable: true,
		spaceBetween: 0,
		loop: true,
		autoplay: 3000,
		autoplayDisableOnInteraction: false
	});
	$scope.ajax = function() {
		$http.get('http://192.168.8.242:8765/home').success(function(data) {
			//console.log(data);
			$scope.contents = data.datelist
		})
	};
	$scope.ajax();
}]);

//会员控制器
app.controller('vipCtrl', ['$scope','$http',function($scope, $http) {
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		slidesPerView: 1,
		paginationClickable: true,
		spaceBetween: 0,
		loop: true,
		autoplay: 3000
	});
	$scope.ajax = function() {
		$http.get('http://192.168.8.242:8765/vip').success(function(data) {
			//console.log(data);
			$scope.contents = data.datelist
		})
	};
	$scope.ajax();
}]);

//分类控制器
app.controller('classificationCtrl', ['$scope','$http',function($scope, $http) {
	$scope.ajax = function() {
		$http.get('http://192.168.8.242:8765/classification').success(function(data) {
			//console.log(data);
			$scope.contents = data.datelist
		})
	};
	$scope.ajax();
	$scope.show = function() {
		$scope.isShow = !$scope.isShow;
	}
}]);

//页面详情控制器
app.controller('infoCtrl', ['$scope','$stateParams','$http',function($scope,$stateParams,$http) {
	//console.log($stateParams.mun)
	//$scope.id = $stateParams.mun;
	$scope.ajax = function() {
		$http.get('http://192.168.8.242:8765/info?id='+$stateParams.mun)
			.success(function(data) {
				//console.log(data);
				$scope.images = data.images
				$scope.imgsrc = data.imgsrc;
				$scope.nowprice = data.nowprice;
				$scope.oldprice = data.oldprice;
				$scope.saled = data.saled;
				$scope.salednum = data.salednum;
				$scope.winfo = data.winfo;
			//$scope.contents = data.datelist
			})
	};
	$scope.ajax();
}]);

//自定义过滤器
app.filter('tra', function() {
	return function(val) {
		var t = '';
		if(val.indexOf('&yen;') > -1) {
			t = val.replace('&yen;', '￥')
		}
		return t;
	}
});

//定义directive，操作DOM节点 利用zepto的方法
app.directive('changeclass', function() {
	return {
		restrict: 'EMAC',
		link: function(scope, ele, attr) {
			//console.log(ele)
			ele.find('li').bind('click', function() {
				$(this).addClass('active').siblings('li').removeClass('active');
			});
		}
	}
});
app.directive('infochange',function(){
	return {
		restrict: 'EMAC',
		link: function(scope, ele, attr) {
			$('.nav-bar li').bind('click', function() {
				$(this).addClass('active').siblings('li').removeClass('active');
				if($(this).find('a span').html()=='商品详情'){
					$('.c-list').css('display','none');
					$('.d-list').css('display','block');
				}else{
					$('.d-list').css('display','none');
					$('.c-list').css('display','block');
				};
			});
			$('.share-btn').bind('click',function(){
				$('#sharebox').css('display','block');
			});
			$('.s-cancle-btn').bind('click',function(){
				$('#sharebox').css('display','none');
			})
		}
	}
})
/*//定义service，复用一些方法
app.service('infos',['$http',function($http){
	this.ajax = function(id){
		$http.get('http://10.16.155.48:8765/info?id='+id)
			.success(function(data) {
				//console.log(data);
				this.imgsrc = data.imgsrc;
				this.nowprice = data.nowprice;
				this.oldprice = data.oldprice;
				this.saled = data.saled;
				this.salednum = data.salednum;
				this.winfo = data.winfo;
			})
	}
}])*/