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

		$scope.newSubItem = function (scope) {
			// Pop up to create NEW item, and pass thru necessary data...
			var nodeData = scope.$modelValue;
			if ( typeof nodeData.nodes != 'object' ) {
				nodeData.nodes = [];
			}
			nodeData.nodes.push({
				id: nodeData.id * 10 + nodeData.nodes.length,
				name: 'waaaazaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaap',
				component_name: 'testington the third',
				type: 'item',
				nodes: []
			});
		};

		console.log( $scope );
	}]);

})( window, window.angular );
