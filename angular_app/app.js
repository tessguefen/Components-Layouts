(function( window, angular, undefined ) {

	var ngModule = angular.module('Components', [
		'dndLists'
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
		$scope.saveComponent = function() {
			console.log( $scope );
		}

		$scope.models = {
			selected: null			
		};

		var init = function( cmps ) {
			$timeout( function(){
				$scope.models.dropzones = {
					"Layout": cmps
				}
			}, 0);

		}

		ComponentsAPI.getData( function( data ) {
			console.log( data );
			init( data );
		});

		console.log( $scope );
	}]);

})( window, window.angular );
