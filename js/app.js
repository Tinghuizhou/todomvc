(function (angular) {
	'use strict';
	//创建一个模型
	var myApp = angular.module('MyTodoMvc', []);
	//注册一个主要的控制器
	myApp.controller('MainController', ['$scope', function ($scope) {
		//文本需要一个模型
		$scope.text = '';
		//任务列表也需要一个模型
		$scope.todos = [
			{id: 1, text: 'HTML', completed: true},
			{id: 2, text: 'CSS', completed: true},
			{id: 3, text: 'Angular', completed: false}
		];
		$scope.add = function () {
			$scope.todos.push({
				id: Math.random(),
				//由于$scope.text是双向数据绑定的所以这里可以直接获取到输入的文字
				text: $scope.text,
				completed: false
			});
			//添加完成后清空文本框
			$scope.text = '';
		};
		//删除功能
		$scope.remove = function (id) {
			//删除谁？
			for (var i = 0; i < $scope.todos.length; i++) {

				if ($scope.todos[i].id === id) {
					$scope.todos.splice(i, 1);
					break;
				}
			}
		};
		//清空已经完成的项
		$scope.clear = function () {
			var result = [];
			for (var i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].completed === false) {
					result.push($scope.todos[i]);
				}
			}
			$scope.todos = result;
		}
		//有完成项目才显示
		$scope.exist = function () {
			for (var i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].completed) {
					return true;
				}
			}
			return false;
		};
		//当前编辑的是哪一个元素
		$scope.currentEditingId = -1;
		$scope.editing = function (id) {
			$scope.currentEditingId = id;
		};

		$scope.save = function () {
			$scope.currentEditingId = -1;
		};
		//全选
		var now = false;
		$scope.toggleAll = function () {
			for (var i = 0; i < $scope.todos.length; i++) {
				$scope.todos[i].completed = now;
			}
			now = !now;
		};
	}]);
})(angular);
