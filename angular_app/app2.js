(function( window, angular, undefined ) {

	var ngModule = angular.module('Components', [
		'ui.tree'
	]);

	ngModule.factory('ComponentsAPI', [ '$http', function( $http ) {
			var self = this;

			self.getData = function( layout_id, callback ) {
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

			self.saveLayout = function( layout_id, data, callback ) {
				return AJAX_Call_Module_FieldList( callback,
									   'admin',
									   'TGCOMPONENTS',
									   'Layout_Save',
									   'Layout_ID=' + layout_id +
									   '&Payload=' + encodeURIComponent( data ),
									   '' );
			}

			return self;
		}
	]);

	// Controller
	ngModule.controller('ComponentsController', ['$scope', '$window', '$document', '$timeout', 'ComponentsAPI', function( $scope, $window, $document, $timeout, ComponentsAPI ) {
		// Load in Components
		$scope.components = {};
		ComponentsAPI.getComponents( function( data ) {
			initComponents( data );
		});

		// Determine Permissions
		$scope.permissions = {};
		$scope.permissions.can_add = CanI( 'TGCOMPONENTS', 0, 1, 0, 0 );
		$scope.permissions.can_edit = CanI( 'TGCOMPONENTS', 0, 0, 1, 0 );
		$scope.permissions.can_delete = CanI( 'TGCOMPONENTS', 0, 0, 0, 1 );

		// MMDialog Variables
		$scope.mmdialog = {};
		$scope.mmdialog.component = {};

		// Main Dialog Form
		$scope.dialogForm = {};

		$scope.nodeActive = 0;

		// Initialize Layout.
		$scope.initializeLayout = function( layout ) {

			$scope.data = {};
			$scope.data.is_processing = 0;
			$scope.data.is_loading = 1;
			$scope.data.layout = {};
			$scope.data.layout.nodes = {};
			$scope.data.layout.layout_id = layout.id;
			$scope.data.layout.name = layout.name;
			$scope.data.layout.code = layout.code;
			

			$scope.data.layout_id = layout.id;

			$scope.data.itemsForDeletion = {};
			$scope.data.itemsForDeletion.nodes = [];

			ComponentsAPI.getData( layout.id, function( data ) {
				init( data );
			});
		}

		var initComponents = function( cmps ) {
			$scope.components = cmps;
		}
		var init = function( cmps ) {

			$scope.$apply(function() {
				$scope.data.layout.nodes = cmps;
				$scope.data.is_loading = 0;
			});

		}

		$scope.toggleNodeActions = function( node ) {
			$scope.nodeActive = node ? node : null;
		}

		$scope.resetDialog = function() {
			$scope.mmdialog = {};
			$scope.mmdialog.component = {};
		}
		$scope.openMMDialog = function( type, parent, node ) {
			$scope.mmdialog.type = type;
			$scope.mmdialog.title = type == 'add' ? 'Add New Component' : 'Edit Component';

			if ( type == 'add' && parent ) {
				$scope.mmdialog.component.parent = parent;
			}

			$scope.mmdialog.popup = new LayoutPopup( type, node );
			$scope.mmdialog.popup.Show();
		}
		$scope.closeMMDialog = function() {
			$scope.mmdialog.popup.Hide();
			$scope.resetDialog();
		}

		$scope.insertNewComponent = function() {
			$scope.mmdialog.show_errors = 0;
			$scope.$digest();

			if ( $scope.dialogForm.$invalid) {
				$scope.$apply(function() {
					$scope.mmdialog.show_errors = 1;
				});
				return;
			}

			$scope.$apply(function() {
				if ( $scope.mmdialog.component.parent.nodes.length === 0 ) $scope.mmdialog.component.parent.nodes = [];
				if ( $scope.mmdialog.component.component.allow_children == 1 ) $scope.mmdialog.component.nodes = [];
				$scope.mmdialog.component.parent.nodes.push( angular.copy( $scope.mmdialog.component ) );
				$scope.closeMMDialog();
			});
		}

		$scope.newComponent = function( scope ) {
			$scope.resetDialog();
			var nodeData = scope && scope.$modelValue ? scope.$modelValue : $scope.data.layout;
			$scope.openMMDialog( 'add', nodeData );
		}

		$scope.editComponent = function( node ) {
			$scope.resetDialog();
			angular.copy( node, $scope.mmdialog.component );
			$scope.openMMDialog( 'edit', null, node );
		}

		$scope.updateComponent = function( node ) {
			$scope.mmdialog.show_errors = 0;
			$scope.$digest();
			if ( !$scope.dialogForm.$invalid) {
				$scope.$apply(function() {
					node.name = $scope.mmdialog.component.name;
					node.active = $scope.mmdialog.component.active;
					node.component = $scope.mmdialog.component.component;
					$scope.closeMMDialog();
				});
			} else {
				$scope.mmdialog.show_errors = 1;
			}
		}

		$scope.cancelEdit = function( node ) {
			$scope.closeMMDialog();
		}

		/* Master MM Dialog */
		function LayoutPopup( type, node ) {
			var self = this;

			MMDialog.call( this, 'layoutcomponent', 680, 450 );

			self.SetResizeEnabled();

			if ( type == 'add' ) {
				this.button_add									= null;
				this.button_save								= this.ActionItem_Add( 'Add', function() { $scope.insertNewComponent(); } );
				this.button_delete								= null;
				this.button_cancel 								= this.ActionItem_Add( 'Cancel', function() { self.Hide(); } );	
			} else {
				// Buttons
				this.button_add									= null;
				this.button_save								= this.ActionItem_Add( 'Update', function() { $scope.updateComponent( node ); } );
				this.button_delete								= null;
				this.button_cancel 								= this.ActionItem_Add( 'Cancel', function() { $scope.cancelEdit( node ) } );
			}
		}
		DeriveFrom( MMDialog, LayoutPopup );

		LayoutPopup.prototype.onEnter = function(){
			this.Save();
		}

		$scope.saveLayout = function( callback ) {
			if ( $scope.data.is_processing == 1 ) return;

			var layout_data = new Object();
			layout_data.layout = angular.copy( $scope.data.layout );
			layout_data.deleted = angular.copy( $scope.data.itemsForDeletion );
			
			$scope.data.is_processing = 1;

			ComponentsAPI.saveLayout( layout_data.layout.layout_id, JSON.stringify( layout_data ), function() {
				$scope.$apply(function() {
					$scope.data.is_processing = 0;
				});
				if ( typeof callback == 'function' ) callback();
			} );
		}


		$scope.removeComponent = function( scope, node ) {
			if( $window.confirm('Are you sure you want to delete this?') ) {
				$scope.data.itemsForDeletion.nodes.push( node );
				scope.remove();
			}
		};

		$scope.checkNodes = function( node ) {
			if ( ( typeof node.component != 'undefined' ) && ( node.component.allow_children == 1 ) ) {
				if ( node.nodes.length === 0 ) {
					node.nodes = [];
				}
			}
		}

		$scope.slideToggle = function( node ) {
			node.hide_nodes = !node.hide_nodes;
		}


		$scope.removeIdAndParentId = function( node ) {
			node.id = 0;
			node.parent = 0;
			angular.forEach( node.nodes, function(child) {
				$scope.removeIdAndParentId( child );
			});
		}

		$scope.duplicateComponent = function( parent, node ) {
			if( $window.confirm('Are you sure you want to duplicate this?') ) {
				var nodeCopy = angular.copy( node );
				$scope.removeIdAndParentId( nodeCopy );
				nodeCopy.name = nodeCopy.name + ' - Copy';

				if ( parent.nodes.length === 0 ) parent.nodes = [];
				parent.nodes.push( nodeCopy );
				$scope.toggleNodeActions();
			}
		}

		$scope.componentValidation = function( attribute, index ) {
			if ( !$scope.mmdialog.show_errors ) return false;
			if ( attribute.type == 'link' && ( attribute.link.type != 'N') && ( !attribute.link.value ) ) return true;
			if ( !attribute.required ) return false;
			if ( attribute.type != 'link' && $scope.dialogForm['layoutcomponent_' + index].$invalid ) return true;
		}




		///***** no changes ****///


		/*** Popups for Forms ***/
		$scope.linkPopup = function( attribute ) {
			var id = 'js-attribute_link_' + attribute.id;
			if ( attribute.link.type == 'P' ) {
				$scope.productPopup( id );
			} else if( attribute.link.type == 'C' ) {
				$scope.categoryPopup( id );
			} else if ( attribute.link.type == 'G' ) {
				$scope.pagePopup( id );
			}
		}

		$scope.productPopup = function( field ) {
			product_dialog = new ProductLookup_Dialog();
			product_dialog.onok = function(){
				var record;

				if ( ( record = product_dialog.SelectedProduct() ) === null ){
					return;
				}

				$scope.$apply(function() {
					var field_div = document.getElementById( field );
					var element = angular.element(field_div);
					element.val( record.code );
					element.triggerHandler('input');
				});
			};

			product_dialog.Show();
		}

		$scope.categoryPopup = function( field ) {
			category_dialog = new CategoryLookup_Dialog();
			category_dialog.onok = function(){
				var record;

				if ( ( record = category_dialog.SelectedCategory() ) === null ){
					return;
				}

				$scope.$apply(function() {
					var field_div = document.getElementById( field );
					var element = angular.element(field_div);
					element.val( record.code );
					element.triggerHandler('input');
				});
			};

			category_dialog.Show();
		}

		$scope.pagePopup = function( field ) {
			var page_dialog = new PageLookup_Dialog();
			page_dialog.onok		= function(){
				var record;

				if ( ( record = page_dialog.SelectedPage() ) === null ) {
					return;
				}

				$scope.$apply(function() {
					var field_div = document.getElementById( field );
					var element = angular.element(field_div);
					element.val( record.code );
					element.triggerHandler('input');
				});
			};
			page_dialog.Show();
		}

		$scope.imageUpload = function( field ) {
			var image_dialog = new MMImagePicker( true, true );
			image_dialog.onComplete	= function( images ) {
				$scope.$apply(function() {
					var field_div = document.getElementById( field );
					var element = angular.element(field_div);
					element.val( images[ 0 ] ? images[ 0 ].image : '' );
					element.triggerHandler('input');
				});
			};
			image_dialog.Show();
		}

		$scope.dateTimePopup = function( attr, field ) {
			var dateTimePicker;
			if ( attr.value ) {
				var nDate = attr.value * 1000;
				dateTimePicker = new MMDateTimePicker( new Date( nDate ) );
			} else {
				dateTimePicker = new MMDateTimePicker( new Date() );
			}
			dateTimePicker.oncomplete = function( date ) {
				$scope.$apply(function() {
					attr.value = date.getTime() / 1000;
				});
			};
			dateTimePicker.Show();
		}

		$scope.dateTimeFormatted = function( date ) {
			date = date * 1000;
			var d = new Date( date );
			return d.toLocaleString();
		}

		$scope.imagetypeDescrip = function( attr ) {
			if ( !attr.value ) return;
			angular.forEach( attr.options, function(opt) {
				console.log( opt.id, attr.value );
				if ( opt.id == attr.value ) return opt.descrip;
			});
		}
	}]);

})( window, window.angular );

// Used in layouts.js
function initializeLayout( layout ) {
	var scope = angular.element(document.getElementById('ComponentsController_ID')).scope();
	scope.$apply(function () {
		scope.initializeLayout( layout );
	});
}