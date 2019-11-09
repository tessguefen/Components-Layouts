(function( window, angular, undefined ) {

	var ngModule = angular.module('Components', [
		'ui.tree'
	]);

	ngModule.factory('ComponentsAPI', [ '$http', function( $http ) {
			var self = this;

			self.getData = function( layout_id, callback ) {
				return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'LayoutComponents_Load_Layout',
				{
					Layout_ID: layout_id
				});
			}

			self.getComponents = function( callback ) {
				return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'ComponentList_Load_All' );
			}

			self.saveLayout = function( layout_id, data, callback ) {
				return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'Layout_Save',
				{
					Layout_ID: layout_id,
					Layout_Data: data
				});
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
		$scope.initializeLayout = function( layout, layoutDialog ) {

			$scope.data = {};
			$scope.data.is_processing = 0;
			$scope.data.is_loading = 1;
			$scope.data.layout = {};
			$scope.data.layout.children = {};
			$scope.data.layout.layout_id = layout.id;
			$scope.data.layout.name = layout.name;
			$scope.data.layout.code = layout.code;
			

			$scope.data.layout_id = layout.id;

			$scope.data.itemsForDeletion = {};
			$scope.data.itemsForDeletion.children = [];

			ComponentsAPI.getData( layout.id, function( data ) {
				init( data, layoutDialog );
			});
		}

		var initComponents = function( cmps ) {
			$scope.components = cmps;
		}
		
		var multiTextUpdate = function( cmps ) {
			angular.forEach( cmps, function(cmp) {
				angular.forEach( cmp.component.attributes, function(attr) {
					if ( attr.type == 'multitext' && attr.value ) {
						attr.value = attr.value.join( '\n' );
					}
				});
				if ( cmp.node_count > 0 ) multiTextUpdate( cmp.children );
			});
		}

		var init = function( cmps, layoutDialog ) {

			multiTextUpdate( cmps );

			$scope.$apply(function() {
				$scope.data.layout.children = cmps;
				$scope.data.is_loading = 0;

				layoutDialog.layoutHadChanges = 0;
				$scope.$watch( 'data.layout.children', function( newVal, oldVal ) {
					layoutDialog.layoutHadChanges = 1;
				}, true );
			});

		}


		$scope.toggleNodeActions = function( node ) {
			$scope.nodeActive = node ? node : null;
		}

		$scope.resetDialog = function() {
			delete $scope.mmdialog;
			$scope.mmdialog = {};
			$scope.mmdialog.component = {};
		}
		$scope.openMMDialog = function( type, parent, node ) {
			$scope.mmdialog.type = type;
			$scope.mmdialog.title = type == 'add' ? 'Add New Component' : 'Edit Component - ' + node.component.name + ' (' + node.component.code + ')';

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
				if ( $scope.mmdialog.component.parent.children.length === 0 ) $scope.mmdialog.component.parent.children = [];
				if ( $scope.mmdialog.component.component.alw_chldrn == 1 ) $scope.mmdialog.component.children = [];
				$scope.mmdialog.component.parent.children.push( angular.copy( $scope.mmdialog.component ) );
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
					node.dt_start = $scope.mmdialog.component.dt_start;
					node.dt_end = $scope.mmdialog.component.dt_end;
					node.code = $scope.mmdialog.component.code;
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

			MMDialog.call( this, 'layoutcomponent', 900, window.outerHeight * .8 );

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
		var checkforUniqueCodes = function( parent, codes, dupes, invalid_codes ) {
			var regex = /^[a-z0-9]*$/i; /* Matches alphanumeric values only */
			
			angular.forEach( parent.children, function( node ) {
				node.code = String( node.code );
				temp_value = node.code.toString().replace( /-/g, '' ).replace( /_/g, '' );

				if( !temp_value.match( regex ) ) {
					invalid_codes.push( node.code );
				} else if ( codes.indexOf( node.code ) > -1 ) {
					dupes.push( node.code );
				} else {
					codes.push( node.code );
				}
				if ( node.children && node.children.length ) {
					checkforUniqueCodes( node, codes, dupes, invalid_codes );
				}
			});
		}

		$scope.saveLayout = function( callback ) {
			if ( $scope.data.is_processing == 1 ) return;

			$scope.data.is_processing = 1;

			var errors = 0;

			// Check that `code` is unique errwhere.
			var uniqueCodes = [];
			var duplicate_codes = [];
			var invalid_codes = [];

			checkforUniqueCodes(  $scope.data.layout, uniqueCodes, duplicate_codes, invalid_codes );

			if ( duplicate_codes.length > 0 || invalid_codes.length > 0 ) {
				errors = 1;
				$scope.data.is_processing = 0;
				if ( typeof callback == 'function' ) callback( errors, duplicate_codes, invalid_codes );
				return false;
			}

			var layout_data = new Object();
			layout_data.layout = angular.copy( $scope.data.layout );
			layout_data.deleted = angular.copy( $scope.data.itemsForDeletion );

			ComponentsAPI.saveLayout( layout_data.layout.layout_id, layout_data, function() {
				$scope.$apply(function() {
					$scope.data.is_processing = 0;
				});
				if ( typeof callback == 'function' ) callback( errors, duplicate_codes, invalid_codes );
			} );
		}


		$scope.removeComponent = function( scope, node ) {
			if( $window.confirm('Are you sure you want to delete this?') ) {
				$scope.data.itemsForDeletion.children.push( node );
				scope.remove();
			}
		};

		$scope.checkNodes = function( node ) {
			if ( ( typeof node.component != 'undefined' ) && ( node.component.alw_chldrn == 1 ) ) {
				if ( node.children.length === 0 ) {
					node.children = [];
				}
			}
		}

		$scope.slideToggle = function( node ) {
			node.hide_children = !node.hide_children;
		}

		$scope.toggleActive = function( node ) {
			node.active = node.active ? 0 : 1;
		}


		$scope.removeIdAndParentId = function( node ) {
			node.id = 0;
			node.parent = 0;
			node.code = node.code + '_' + Math.floor( Math.random() * 1001 );
			angular.forEach( node.children, function(child) {
				$scope.removeIdAndParentId( child );
			});
		}

		$scope.duplicateComponent = function( parent, node ) {
			if( $window.confirm('Are you sure you want to duplicate this?') ) {
				var nodeCopy = angular.copy( node );
				$scope.removeIdAndParentId( nodeCopy );
				nodeCopy.name = nodeCopy.name + ' - Copy';

				if ( parent.children.length === 0 ) parent.children = [];
				parent.children.push( nodeCopy );
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

		$scope.dateTimePopup = function( attr, field, type ) {
			var dateTimePicker;
			if ( type == 'attribute' ) {
				if ( attr.value ) {
					var nDate = attr.value * 1000;
					dateTimePicker = new MMDateTimePicker( new Date( nDate ) );
				} else {
					dateTimePicker = new MMDateTimePicker( new Date() );
				}
			} else if ( type == 'dt_start' ) {
				if ( attr.dt_start ) {
					var nDate = attr.dt_start * 1000;
					dateTimePicker = new MMDateTimePicker( new Date( nDate ) );
				} else {
					dateTimePicker = new MMDateTimePicker( new Date() );
				}
			} else if ( type == 'dt_end' ) {
				if ( attr.dt_end ) {
					var nDate = attr.dt_end * 1000;
					dateTimePicker = new MMDateTimePicker( new Date( nDate ) );
				} else {
					dateTimePicker = new MMDateTimePicker( new Date() );
				}
			}
			dateTimePicker.oncomplete = function( date ) {
				$scope.$apply(function() {
					if ( type == 'attribute' ) {
						attr.value = date.getTime() / 1000;
					} else if ( type == 'dt_start' ) {
						attr.dt_start = date.getTime() / 1000;
					} else if ( type == 'dt_end' ) {
						attr.dt_end = date.getTime() / 1000;
					}
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
			var val = '';
			angular.forEach( attr.options, function(opt) {
				if ( opt.id == attr.value ) {
					val = opt.descrip;
				}
			});
			return val;
		}
	}]);

})( window, window.angular );

// Used in layouts.js
function initializeLayout( layout, layoutDialog ) {
	var scope = angular.element(document.getElementById('ComponentsController_ID')).scope();
	scope.$apply(function () {
		scope.initializeLayout( layout, layoutDialog );
	});
}