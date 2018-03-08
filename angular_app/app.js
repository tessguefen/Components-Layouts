(function( window, angular, undefined ) {

	var ngModule = angular.module('Components', [
		'ui.tree'
	]);

	ngModule.factory('ComponentsAPI', [ '$http', function( $http ) {
			var self = this;

			// self.getData = function( callback ) {
			// 	$http.get( theme_path + '/page_to_ping.json', {
			// 		headers: {
			// 			'Content-Type': 'application/json'
			// 		}
			// 	}).then(
			// 		function( response ) {

			// 			callback( response.data );

			// 		},
			// 		function( error ) { console.error( error ); }
			// 	);
			// }

			self.getData = function( callback ) {
				return AJAX_Call_Module( callback,
								'admin',
								'TGCOMPONENTS',
								'Layout_Load_Components',
								'Layout_ID=1' );
			}

			console.log( 'wat' );

			return self;
		}
	]);

	// Controller
	ngModule.controller('ComponentsController', ['$scope', '$window', '$document', '$timeout', 'ComponentsAPI', function( $scope, $window, $document, $timeout, ComponentsAPI ) {

		var init = function( cmps ) {
			$timeout( function(){
				$scope.data = cmps;
			}, 0);
		}

		ComponentsAPI.getData( function( data ) {
			console.log( data );
			init( data );
		});

		$scope.scopeCreep = function() {
			console.log( $scope.data );
		}

		$scope.remove = function (scope) {
			scope.remove();
		};

		$scope.newTopLevel = function( scope, type ) {
			// Pop up to create NEW item, and pass thru necessary data...
			var nodeData = scope;
			if ( typeof scope != 'object' ) {
				scope = [];
			}
			scope.push({
				id: 0,
				name: 'This is the new ' + type,
				component_name: 'Some Component',
				type: type,
				nodes: []
			});
		}

		$scope.newSubItem = function (scope, type ) {
			// Pop up to create NEW item, and pass thru necessary data...
			var nodeData = scope.$modelValue;
			if ( typeof nodeData.nodes != 'object' ) {
				nodeData.nodes = [];
			}
			nodeData.nodes.push({
				id: 0,
				name: 'This is the new ' + type,
				component_name: 'Some Component',
				type: type,
				nodes: []
			});
		};

		console.log( $scope );
	}]);

})( window, window.angular );
