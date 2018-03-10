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

			self.saveLayout = function( callback, data ) {
				return AJAX_Call_Module_FieldList( callback,
									   'admin',
									   'TGCOMPONENTS',
									   'Layout_Save',
									   'Layout_ID=' + layout_id + '&Payload=' + data,
									   '' );
			}

			return self;
		}
	]);

	// Controller
	ngModule.controller('ComponentsController', ['$scope', '$window', '$document', '$timeout', 'ComponentsAPI', function( $scope, $window, $document, $timeout, ComponentsAPI ) {
		$scope.data = new Object();
		$scope.data.layout = new Object();

		$scope.data.newComponent = new Object();
		$scope.data.newComponent.component = new Object();
		$scope.data.newComponent.parent = new Object();

		$scope.data.itemsForDeletion = new Object();
		$scope.data.itemsForDeletion.nodes = [];
		$scope.data.layout_id = layout_id;

		$scope.data.showPopUp = 0;

		/* Dialog Functions */
		var dialog;
		function layoutComponentPopup() {
			var self = this;
			MMDialog.call( this, 'layoutcomponent', 600, 450 );

			self.SetResizeEnabled();
			
			// Buttons
			this.button_add									= null;
			this.button_save								= this.ActionItem_Add( 'Add', function() { $scope.insertComponent(); } );
			this.button_delete								= null;
			this.button_cancel 								= this.ActionItem_Add( 'Cancel', function() { self.Hide(); } );
		}
		DeriveFrom( MMDialog, layoutComponentPopup );

		layoutComponentPopup.prototype.onEnter = function(){
			this.Save();
		}

		layoutComponentPopup.prototype.onVisible = function() {}

		layoutComponentPopup.prototype.onSetContent = function(){}

		var init = function( cmps ) {
			$timeout( function(){
				$scope.data.layout.nodes = cmps;
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
			$scope.data.itemsForDeletion.nodes.push( node );
			scope.remove();
		};

		$scope.checkNodes = function( node ) {
			console.log( node );
			if ( ( typeof node.component != 'undefined' ) && ( node.component.allow_children == 1 ) ) {
				if ( node.nodes.length === 0 ) {
					node.nodes = [];
				}
			}
		}

		$scope.newComponent = function( scope ) {
			// Pop up to create NEW item, and pass thru necessary data...
			var nodeData = scope.$modelValue;
			if( !nodeData ) {
				nodeData = $scope.data.layout;
			}
			$scope.openPopup( nodeData );
		}

		$scope.insertComponent = function() {
			$scope.data.popup_show_errors = 0;
			if ( !$scope.newComponentForm.$invalid) {
				if ($scope.data.newComponent.parent.nodes.length === 0 ) {
					$scope.data.newComponent.parent.nodes = [];
				}
				if ( $scope.data.newComponent.component.allow_children == 1 ) $scope.data.newComponent.nodes = [];
				$scope.data.newComponent.parent.nodes.push( angular.copy( $scope.data.newComponent ) );
				$scope.closePopup();
			} else {
				$timeout( function(){
					$scope.data.popup_show_errors = 1;
				}, 0);
				console.log( $scope );
			}
		}

		$scope.closePopup = function() {
			$scope.resetPopup();
			$scope.popup.Hide();
		}

		$scope.openPopup = function( parent ) {
			$scope.resetPopup();
			$scope.data.newComponent.parent = parent;
			$scope.popup = new layoutComponentPopup();
			$scope.popup.Show();
		}


		$scope.resetPopup = function() {
			$scope.data.newComponent = new Object();
			$scope.data.newComponent.component = new Object();
			$scope.data.newComponent.parent = new Object();
		}

		/*** Submission of SAVE ***/
		$scope.saveLayout = function() {
			var layout_data = new Object();
			layout_data.layout = angular.copy( $scope.data.layout );
			layout_data.deleted = angular.copy( $scope.data.itemsForDeletion );
			var payload = JSON.stringify( layout_data );
			console.log( payload );
			ComponentsAPI.saveLayout( function( data ) {
				console.log( data );
				$scope.data.itemsForDeletion = new Object();
				$scope.data.itemsForDeletion.nodes = [];
			}, payload );
		}


		/*** Popups for Forms ***/
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
