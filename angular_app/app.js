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
		// Top Level Controls
		// Declare Variables
		$scope.data = new Object();
		$scope.data.layout = new Object();

		$scope.data.newComponent = new Object();
		$scope.data.newComponent.component = new Object();
		$scope.data.newComponent.parent = new Object();

		$scope.data.editComponent = new Object();

		$scope.data.itemsForDeletion = new Object();
		$scope.data.itemsForDeletion.nodes = [];
		$scope.data.layout_id = layout_id;

		$scope.data.showPopUp = 0;

		/* Dialog Functions */
		function layoutComponentPopup_ADD() {
			var self = this;
			MMDialog.call( this, 'layoutcomponent_add', 600, 450 );

			self.SetResizeEnabled();
			
			// Buttons
			this.button_add									= null;
			this.button_save								= this.ActionItem_Add( 'Add', function() { $scope.insertComponent(); } );
			this.button_delete								= null;
			this.button_cancel 								= this.ActionItem_Add( 'Cancel', function() { self.Hide(); } );
		}
		DeriveFrom( MMDialog, layoutComponentPopup_ADD );

		layoutComponentPopup_ADD.prototype.onEnter = function(){
			this.Save();
		}

		function layoutComponentPopup_EDIT( scope, node ) {
			var self = this;
			MMDialog.call( this, 'layoutcomponent_edit', 600, 450 );

			self.SetResizeEnabled();
			
			// Buttons
			this.button_add									= null;
			this.button_save								= this.ActionItem_Add( 'Save', function() { $scope.updateComponent( scope, node ); } );
			this.button_delete								= null;
			// If they cancel, reset the values???
			this.button_cancel 								= this.ActionItem_Add( 'Cancel', function() { $scope.cancelEdit( scope, node ) } );
		}
		DeriveFrom( MMDialog, layoutComponentPopup_EDIT );

		layoutComponentPopup_EDIT.prototype.onEnter = function(){
			this.Save();
		}

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
			$scope.$digest();
			$timeout( function(){
				if ( !$scope.newComponentForm.$invalid) {
					$timeout( function(){
						if ( $scope.data.newComponent.parent.nodes.length === 0 ) $scope.data.newComponent.parent.nodes = [];
						if ( $scope.data.newComponent.component.allow_children == 1 ) $scope.data.newComponent.nodes = [];
						$scope.data.newComponent.parent.nodes.push( angular.copy( $scope.data.newComponent ) );
						$scope.closePopup();
					}, 0);
				} else {
					$timeout( function(){
						$scope.data.popup_show_errors = 1;
					}, 0);
					console.log( $scope );
				}
			}, 0);
		}

		$scope.closePopup = function() {
			$scope.resetPopup();
			$scope.popup.Hide();
		}

		$scope.openPopup = function( parent ) {
			$scope.resetPopup();
			$scope.data.newComponent.parent = parent;
			$scope.popup = new layoutComponentPopup_ADD();
			$scope.popup.Show();
		}


		$scope.resetPopup = function() {
			$scope.data.newComponent = new Object();
			$scope.data.newComponent.component = new Object();
			$scope.data.newComponent.parent = new Object();
		}

		/*** Submission of SAVE ***/
		$scope.saveLayout = function( button ) {
			var layout_data = new Object();
			layout_data.layout = angular.copy( $scope.data.layout );
			layout_data.deleted = angular.copy( $scope.data.itemsForDeletion );

			DisableButtons( button );
			DisableOnSubmitFormElements();
			
			ComponentsAPI.saveLayout( function( data ) {
				$scope.data.itemsForDeletion = new Object();
				$scope.data.itemsForDeletion.nodes = [];
				document.forms[ Screen ].submit();
			}, JSON.stringify( layout_data ) );
		}

		/*** EDIT ***/
		$scope.editComponent = function( scope, node ) {
			angular.copy( node, $scope.data.editComponent );
			$scope.popup = new layoutComponentPopup_EDIT( scope, node );
			$scope.popup.Show();
		}

		$scope.updateComponent = function( scope, node ) {
			$scope.data.popup_show_errors = 0;
			$scope.$digest();
			if ( !$scope.editComponentForm.$invalid) {
				node.name = $scope.data.editComponent.name;
				node.active = $scope.data.editComponent.active ? 1 : 0;
				node.component = $scope.data.editComponent.component;
				console.log( node );
				$scope.data.editComponent = new Object();
				$scope.closePopup();
				$timeout( function(){
					$scope.$apply();
				}, 0);
			} else {
				$timeout( function(){
					$scope.data.popup_show_errors = 1;
				}, 0);
			}
		}

		$scope.cancelEdit = function( scope, node ) {
			$timeout( function(){
				$scope.data.editComponent = new Object();
				$scope.closePopup();
			}, 0);
		}


		/*** Popups for Forms ***/
		$scope.linkPopup = function( attribute ) {
			console.log( attribute );
			var id = 'js-attribute_link_' + attribute.id;
			if ( attribute.link.type == 'P' ) {
				$scope.productPopup( id );
			} else if( attribute.link.type == 'C' ) {
				$scope.categoryPopup( id );
			} else if ( attribute.link.type == 'G' ) {
				$scope.pagePopup( id );
			}
		}

		$scope.productPopup = function( id ) {
			new ProductLookupDialog( id );
		}

		$scope.categoryPopup = function( id ) {
			new CategoryLookupDialog( id );
		}

		$scope.pagePopup = function( id ) {
			new PageLookupDialog( id );
		}

		$scope.imageUpload = function( type, data, field ) {
			new PopupFileUpload( type, data, field );
		}

		console.log( $scope );
	}]);

})( window, window.angular );

function initSaveLayout( button ) {
	var scope = angular.element(document.getElementById('ComponentsController_ID')).scope();
	scope.$apply(function () {
		scope.saveLayout( button );
	});		
}
