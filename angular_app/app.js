(function( window, angular, undefined ) {

	var ngModule = angular.module('Components', [
		'ui.tree'
	]);

	ngModule.factory('ComponentsAPI', [ '$http', function( $http ) {
			var self = this;

			self.getData = function( callback ) {
				return AJAX_Call_Module( callback,
								'admin',
								'TGCOMPONENTS',
								'Layout_Load_Components',
								'Layout_ID=' + layout_id );
			}

			self.getComponents = function( callback ) {
				return AJAX_Call_Module( callback,
								'admin',
								'TGCOMPONENTS',
								'Components_Load_All' );
			}

			return self;
		}
	]);

	// Controller
	ngModule.controller('ComponentsController', ['$scope', '$window', '$document', '$timeout', 'ComponentsAPI', function( $scope, $window, $document, $timeout, ComponentsAPI ) {
		$scope.data = [];

		$scope.data.newComponent = {};
		$scope.data.newComponent.component = {};
		$scope.data.newComponent.parent = {};

		$scope.data.itemsForDeletion = [];
		$scope.data.layout_id = layout_id;

		$scope.data.showPopUp = 0;

		var init = function( cmps ) {
			$timeout( function(){
				$scope.data.layout = cmps;
			}, 0);
		}

		var initComponents = function( cmps ) {
			$timeout( function(){
				$scope.data.components = cmps;
			}, 0);
		}

		ComponentsAPI.getData( function( data ) {
			init( data );
		});

		ComponentsAPI.getComponents( function( data ) {
			initComponents( data );
		});

		$scope.scopeCreep = function() {
			console.log( $scope );
		}

		$scope.removeComponent = function( scope, node ) {
			$scope.data.itemsForDeletion.push( node );
			scope.remove();
		};

		$scope.newComponent = function( scope ) {
			// Pop up to create NEW item, and pass thru necessary data...
			var nodeData = scope.$modelValue;
			if ( typeof nodeData != 'object' ) {
				nodeData = [];
			}
			$scope.openPopup( nodeData );
		}
		$scope.insertComponent = function() {
			$scope.data.newComponent.parent.nodes.push( $scope.data.newComponent );
			$scope.closePopup();
		}

		$scope.closePopup = function() {
			$scope.resetPopup();
			$scope.data.showPopUp = 0;
		}

		$scope.openPopup = function( parent ) {
			$scope.resetPopup();
			$scope.data.newComponent.parent = parent;
			$scope.data.showPopUp = 1;
		}

		$scope.resetPopup = function() {
			$scope.data.newComponent = {};
			$scope.data.newComponent.component = {};
			$scope.data.newComponent.parent = {};
		}

		$scope.productPopup = function( id ) {
			ProductLookupDialog( id );
		}

		$scope.categoryPopup = function( id ) {
			CategoryLookupDialog( id );
		}

		$scope.imageUpload = function( type, data, field ) {
			PopupFileUpload( type, data, field );
		}

		console.log( $scope );
	}]);

})( window, window.angular );
