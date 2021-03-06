var app = angular.module('angel', ['ui.router', 'ngCookies']);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('', '/index/home');
	//设置路由
	$stateProvider
		.state('index', {
			url: '/index',
			templateUrl: 'html/index.html ',
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
		.state('register', {
			url: '/register',
			templateUrl: 'html/register.html',
			controller: 'registerCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'html/login.html',
			controller: 'loginCtrl'
		})
		.state('index.car', {
			url: '/car',
			templateUrl: 'html/car.html',
			controller: 'carCtrl'
		})
		.state('index.mine', {
			url: '/mine',
			templateUrl: 'html/mine.html',
			controller: 'mineCtrl'
		})
}]);
//最外层的index页面控制器
app.controller('indexCtrl', ['$scope', '$cookieStore', '$rootScope', function($scope, $cookieStore, $rootScope) {
	$('body').css('backgroundColor', '#f2f2f2');
	//创建一个全局对象，将商品存入对象中，进入购物车时再进行渲染商品列表
	$rootScope.goodnum = 0;
	$rootScope.goodlistObj = {
			goodlist: []
		}
		//点击按钮时，让body的scrollTop==0；
	$scope.toTop = function() {
		$('body').scrollTop(0);
	};
	//进入页面时判断cookie中的localhostuser有没有
	var localhostuser = $cookieStore.get('localhostuser')
	$scope.car = function() {
		if(localhostuser != null) {
			//window.location.href = ''
		} else {
			//console.log(localhostuser)
			window.location.href = '#/login'
		}
	};
}]);
//首页控制器
app.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {
	//进入路由重置样式
	$('body').css('backgroundColor', '#f2f2f2');
	$('#toTop').css('display', 'block');
	$('.icon-4').addClass('active').siblings('li').removeClass('active');
	//利用swiper插件，实现轮播图
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
	//发送ajsx请求，拿到数据并把数据存入定义的变量中，并在页面中渲染数据
	$scope.ajax = function() {
		$http.get('http://10.16.155.48:8765/home').success(function(data) {
			//console.log(data);
			$scope.contents = data.datelist
		})
	};
	$scope.ajax();
}]);
//会员控制器
app.controller('vipCtrl', ['$scope', '$http', function($scope, $http) {
	//进入路由重置样式
	$('body').css('backgroundColor', '#f2f2f2');
	$('#toTop').css('display', 'block');
	$('.icon-3').addClass('active').siblings('li').removeClass('active');
	//利用swiper插件，实现轮播图
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		slidesPerView: 1,
		paginationClickable: true,
		spaceBetween: 0,
		loop: true,
		autoplay: 3000
	});
	//发送ajsx请求，拿到数据并把数据存入定义的变量中，并在页面中渲染数据
	$scope.ajax = function() {
		$http.get('http://10.16.155.48:8765/vip').success(function(data) {
			//console.log(data);
			$scope.contents = data.datelist
		})
	};
	$scope.ajax();
}]);
//分类控制器
app.controller('classificationCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
	//重置样式
	$('#toTop').css('display', 'block');
	$('body').css('backgroundColor', '#f2f2f2');
	$('.icon-2').addClass('active').siblings('li').removeClass('active');
	//发送ajsx请求，拿到数据并把数据存入定义的变量中，并在页面中渲染数据
	$scope.ajax = function() {
		$http.get('http://10.16.155.48:8765/classification').success(function(data) {
			//console.log(data);
			$scope.contents = data.datelist;
			$scope.contents.forEach(function(data){
				data.dPrice = Number(data.dPrice)
			});
			//console.log($scope.contents)
		})
	};
	$scope.ajax();
	$scope.show = function() {
		$scope.isShow = !$scope.isShow;
	}
	$scope.orderby = function(){
		$('.price').css('color','#f39612');
		if($('.price span').html()=='价格从高到低'){
			$scope.contents = $filter('orderBy')($scope.contents,'dPrice','true');
			$('.price span').html('价格从低到高')
		}else{
			$scope.contents = $filter('orderBy')($scope.contents,'dPrice');
			$('.price span').html('价格从高到低')
		}
	}
}]);
//页面详情控制器
app.controller('infoCtrl', ['$scope', '$stateParams', '$http', '$cookieStore', '$rootScope', function($scope, $stateParams, $http, $cookieStore, $rootScope) {
	//console.log($stateParams.mun)
	//$scope.id = $stateParams.mun;
	//重置样式
	$('#toTop').css('display', 'block');
	$('body').css('backgroundColor', '#f2f2f2');
	$scope.ajax = function() {
		//发送ajsx请求，拿到数据并把数据存入定义的变量中，并在页面中渲染数据
		$http.get('http://10.16.155.48:8765/info?id=' + $stateParams.mun).success(function(data) {
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
	//加入购物车，将商品信息存入全局的goodlistObj对象中；
	$scope.addcar = function() {
		//console.log($rootScope.goodnum)
		$rootScope.goodnum++;
		//console.log($rootScope.goodnum)
		var goodsObj = {};
		goodsObj.picsrc = $('.pic-wrap img').attr('src');
		goodsObj.goodinfo = $('.w-info h2').html();
		goodsObj.nprice = $('.nowPrice span').html();
		goodsObj.oprice = $('.oldPrice span').html();
		//$cookieStore.put('goods', goodsObj);
		//var goods = $cookieStore.get('goods');
		$rootScope.goodlistObj.goodlist.push(goodsObj);
		//console.log($rootScope.goodlistObj);
	};
	//进入购物车结算 若登录过则进入购物车，若没有登录则进入登录界面
	$scope.checkout = function() {
		var localhostuser = $cookieStore.get('localhostuser');
		if(localhostuser == null) {
			window.location.href = '#/login';
		} else {
			window.location.href = '#/index/car';
			$('.icon-5').addClass('active').siblings().removeClass('active');
		}
	}
}]);
//注册页面控制器
app.controller('registerCtrl', ['$scope', '$cookieStore', function($scope, $cookieStore) {
	//console.log($cookieStore)
	//重置样式
	$('body').css('backgroundColor', '#f2f2f2');
	$scope.register = function() {
		if(!(/^1[3|4|5|7|8]\d{9}$/.test($scope.phone))) {
			alert('手机号码有误');
			return false;
		} else if($scope.password == '') {
			alert('密码不能为空');
			return false;
		} else if($scope.password != $scope.repassword) {
			alert('两次输入密码不一致');
			return false;
		} else {
			alert('您注册成功');
			//console.log($cookieStore)
			//当密码和手机号格式正确时，存进cookie中的user
			$cookieStore.put('user', {
					'phone': $scope.phone,
					'password': $scope.password
				})
				//console.log($cookieStore.get('user'))
				//存入cookie中时进行路由切换，进入登录界面
			window.location.href = '#/login';
		}
	}
}]);
//登录页面控制器
app.controller('loginCtrl', ['$scope', '$cookieStore', function($scope, $cookieStore) {
	//重置样式
	$('body').css('backgroundColor', '#f2f2f2');
	$scope.login = function() {
		//判断有没有注册页面存的cookie， 得到之前注册时的帐号密码（从cookie：user中获取）
		var user = $cookieStore.get('user');
		//console.log(user) 
		if(user != null) {
			//输入框中的username,password和cookie中的phone，password一一对应则进行一下操作
			if($scope.username == user.phone && $scope.password == user.password) {
				//若一致则把数据存入cookie中的localhostuser中，然后进行首页跳转
				$cookieStore.put("localhostuser", {
					username: $scope.username,
					userpassword: $scope.password
				});
				window.location.href = '#/index/home'
			} else {
				//console(1)
				alert('亲，你的帐号密码输入有误！')
				return false;
			}
		} else {
			alert('亲，你还没有注册');
			return false;
		}
	}
}]);
//购物车
app.controller('carCtrl', ['$scope', '$cookieStore', '$rootScope', function($scope, $cookieStore, $rootScope) {
	var localhostuser = $cookieStore.get('localhostuser');
	if(localhostuser == null) {
		//判断若没有登录则进入登录页面
		window.location.href = '#/login';
	} else {
		//重置样式
		$('body').css('backgroundColor', '#fff');
		$('#toTop').css('display', 'none');
		$('.icon-5').addClass('active').siblings('li').removeClass('active');
		$scope.goodinlist = $rootScope.goodlistObj;
		//console.log($scope.goodinlist);
	}
}]);
//个人信息控制器
app.controller('mineCtrl', ['$scope', '$cookieStore', '$rootScope', function($scope, $cookieStore, $rootScope) {
	var localhostuser = $cookieStore.get('localhostuser');
	if(localhostuser == null) {
		//判断若没有登录则进入登录页面
		window.location.href = '#/login';
	} else {
		//重置样式
		$('#toTop').css('display', 'none');
		$('body').css('backgroundColor', '#f2f2f2');
		$('.icon-1').addClass('active').siblings('li').removeClass('active');
	}

}]);

//自定义过滤器，将字符串中的&yen;转换为￥字符
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
app.directive('infochange', function() {
	return {
		restrict: 'EMAC',
		link: function(scope, ele, attr) {
			$('.nav-bar li').bind('click', function() {
				$(this).addClass('active').siblings('li').removeClass('active');
				if($(this).find('a span').html() == '商品详情') {
					$('.c-list').css('display', 'none');
					$('.d-list').css('display', 'block');
				} else {
					$('.d-list').css('display', 'none');
					$('.c-list').css('display', 'block');
				};
			});
			$('.share-btn').bind('click', function() {
				$('#sharebox').css('display', 'block');
			});
			$('.s-cancle-btn').bind('click', function() {
				$('#sharebox').css('display', 'none');
			})
		}
	}
});
app.directive('choose', function() {
	return {
		restrict: 'EMAC',
		link: function(scope, ele, attr) {
			//当数据ng-repeat渲染完数据后在绑定事件
			if(scope.$last) {
				$('.list-items').bind('click', function() {
					var totalnum = 0;
					var total = 0;
					$(this).find('span').toggleClass('changecolor');
					//对选中的商品进行遍历，然后把数量和综合进行乘法和加法的运算
					for(var i = 0; i < $('.changecolor').length; i++) {
						//得到总共选的商品的数量
						totalnum += Number($('.changecolor').eq(i).parents('.list-items').siblings('.list-content').find('input').val());
						//用每个商品的数量乘以自身的价格，在进行加法
						total += $('.changecolor').eq(i).parents('.list-items').siblings('.list-content').find('.list-price .list-nowprice span').html() * $('.changecolor').eq(i).parents('.list-items').siblings('.list-content').find('input').val();
					}
					//console.log(totalnum,total);
					$('.p-car .total-price span span').html(total);
					$('.p-car .check span').html(totalnum);
					/*scope.total = total;
					scope.totalnum =totalnum;
					scope.$apply()*/
				});
			}
		}
	}
});
app.directive('total', function() {
	return {
		restrict: 'EMAC',
		link: function(scope, ele, attr) {
			//当数据ng-repeat渲染完数据后在绑定事件
			if(scope.$last) {
				$('.list-content input').bind('change', function() {
					var totalnum = 0;
					var total = 0;
					for(var i = 0; i < $('.changecolor').length; i++) {
						totalnum += Number($('.changecolor').eq(i).parents('.list-items').siblings('.list-content').find('input').val());
						total += $('.changecolor').eq(i).parents('.list-items').siblings('.list-content').find('.list-price .list-nowprice span').html() * $('.changecolor').eq(i).parents('.list-items').siblings('.list-content').find('input').val();
					}
					$('.p-car .total-price span span').html(total);
					$('.p-car .check span').html(totalnum);
					/*scope.total = total;
					scope.totalnum =totalnum;
					scope.$apply(scope.total)
					console.log(scope)*/
				});
			}
		}
	}
});
app.directive('delete', function() {
	return {
		restrict: 'EMAC',
		link: function(scope, ele, attr) {
			//当数据ng-repeat渲染完数据后在绑定事件（此处为angular的坑）
			if(scope.$last) {
				var ele;
				$('.delete').bind('click', function() {
					ele = $(this);
					$('#hidden').css('display', 'block');
					$('.sure').bind('click', function() {
						$('#hidden').css('display', 'none');
						ele.parent().remove();
						var totalnum = 0;
						var total = 0;
						for(var i = 0; i < $('.changecolor').length; i++) {
							totalnum += Number($('.changecolor').eq(i).parents('.list-items').siblings('.list-content').find('input').val());
							total += $('.changecolor').eq(i).parents('.list-items').siblings('.list-content').find('.list-price .list-nowprice span').html() * $('.changecolor').eq(i).parents('.list-items').siblings('.list-content').find('input').val();
						}
						$('.p-car .total-price span span').html(total);
						$('.p-car .check span').html(totalnum);
					});
					$('.cannel').bind('click', function() {
						$('#hidden').css('display', 'none');
						return;
					});
					/*scope.total = total;
					scope.totalnum = totalnum;
					scope.$apply();*/
				});
			}
		}
	}
});