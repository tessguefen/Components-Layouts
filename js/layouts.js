function Layouts_Batchlist_Load_Query( filter, sort, offset, count, callback, delegator ) {
	return AJAX_Call_Module(	callback,
								'admin',
								'TGCOMPONENTS',
								'Layouts_Load_Query',
								'&Filter=' + EncodeArray( filter ) +
								'&Sort=' + encodeURIComponent( sort ) +
								'&Offset=' + encodeURIComponent( offset ) +
								'&Count=' + encodeURIComponent( count ),
								delegator );
}

function Layouts_Batchlist_Function( fieldlist, _function, callback, delegator ) { 
	return AJAX_Call_Module_FieldList( callback,
									   'admin',
									   'TGCOMPONENTS',
									   _function,
									   '',
									   fieldlist,
									   delegator );
}

function Layouts_Duplicate( layout_id, code, name, callback ){
	return AJAX_Call_Module(	callback,
								'admin',
								'TGCOMPONENTS',
								'Layout_Duplicate',
								'Layout_ID='	+ encodeURIComponent( layout_id ) +
								'&Code=' 		+ encodeURIComponent( code ) +
								'&Name=' 		+ encodeURIComponent( name )
	);
}

function Layouts_Delete_Cache( callback ) {
	return AJAX_Call_Module( callback,
							'admin',
							'TGCOMPONENTS',
							'Delete_Layout_Cache',
							'',
							'' );
}

function Layouts_Batchlist() {
	var self = this;

	MMBatchList.call( self, 'jsLayoutBatchlist' );

	self.Feature_SearchBar_SetPlaceholderText( 'Search Layouts...' );
	self.SetDefaultSort( 'id', '' );

	if ( CanI( 'TGCOMPONENTS', 0, 1, 0, 0 ) ) {
		self.Feature_Add_Enable('Add Layout');
	}
	if ( CanI( 'TGCOMPONENTS', 0, 0, 1, 0 ) ) {
		self.Feature_Edit_Enable('Edit Layout(s)');
		self.Feature_RowDoubleClick_Enable();
		self.Feature_Buttons_AddButton_Dynamic_SingleSelect( 'Duplicate Layout', 'Duplicate Template', 'readytheme', self.DuplicateLayout );
	}
	
	self.Feature_Buttons_AddButton_Dynamic_SingleSelect( 'View/ Edit Layout', 'View/ Edit Layout', 'goto', self.editLayout );
	
	if ( CanI( 'TGCOMPONENTS', 0, 0, 0, 1 ) ) {
		self.Feature_Delete_Enable('Delete Layout(s)');
	}

	self.Feature_Buttons_AddButton_Persistent( 'Delete Layout Cache', 'Delete Layout Cache', '', self.DeleteLayoutCache );
	
	self.processingdialog = new ProcessingDialog();
}

DeriveFrom( MMBatchList, Layouts_Batchlist );

Layouts_Batchlist.prototype.onLoad = Layouts_Batchlist_Load_Query;

Layouts_Batchlist.prototype.onCreateRootColumnList = function() {
	var columnlist =
	[
		new MMBatchList_Column_Name( 'Component ID', 'id', 'id')
		.SetAdvancedSearchEnabled(false)
		.SetDisplayInMenu(false)
		.SetDisplayInList(false)
		.SetAdvancedSearchEnabled(false),
		new MMBatchList_Column_Code( 'Code', 'code', 'code'),
		new MMBatchList_Column_Name( 'Name', 'name', 'name')
	];
	return columnlist;
}

Layouts_Batchlist.prototype.onCreate = function() {
	var record;
	record = new Object();
	record.id = 0;
	record.code = '';
	record.name = '';
	return record;
}

Layouts_Batchlist.prototype.onSave = function( item, callback, delegator ) {
	Layouts_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'Layout_Update', callback, delegator );
}
Layouts_Batchlist.prototype.onInsert = function( item, callback, delegator ) {
	Layouts_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'Layout_Insert', callback, delegator );
}
Layouts_Batchlist.prototype.onDelete = function( item, callback, delegator ) {
	Layouts_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'Layout_Delete', callback, delegator );
}

Layouts_Batchlist.prototype.editLayout = function( item, e ) {
	var self = this;
	var dialog;

	dialog = new Layout_Dialog( item.record );

	dialog.onSave = function() {
		var scope = angular.element(document.getElementById('ComponentsController_ID')).scope();
		scope.$apply(function () {
			scope.saveLayout( function() {
				dialog.Cancel_LowLevel();
				self.Refresh();
			});
		});	
	};
	dialog.Save = function() {
		var scope = angular.element(document.getElementById('ComponentsController_ID')).scope();
		scope.$apply(function () {
			scope.saveLayout( function() {
				dialog.Cancel_LowLevel();
				self.Refresh();
			});
		});	
	};
	dialog.onDelete	= function() { self.Refresh(); };

	dialog.Show();
}

Layouts_Batchlist.prototype.DeleteLayoutCache = function(){
	var self = this;
	Layouts_Delete_Cache( function( response ) { self.Refresh(); } );
}

Layouts_Batchlist.prototype.DuplicateLayout = function( item, e ) {
	var self = this;
	var duplicatelayout;

	duplicatelayout				= new DuplicateLayout_Dialog( item.record );
	duplicatelayout.onsave		= function()
	{
		self.Refresh();
	}

	duplicatelayout.Show();
}

function DuplicateLayout_Dialog( layout ){
	var self = this;

	// Variables
	this.layout				= layout;

	// Controls
	this.dialog				= document.getElementById( 'DuplicateLayout_dialog' );

	this.button_cancel		= document.getElementById( 'DuplicateLayout_dialog_button_cancel' );
	this.button_save		= document.getElementById( 'DuplicateLayout_dialog_button_save' );

	// Inputs
	this.new_code			= document.getElementById( 'DuplicateLayout_New_Code' );
	this.new_name			= document.getElementById( 'DuplicateLayout_New_Name' );

	// Events
	if ( this.button_cancel )	this.button_cancel.onclick		= function() { self.Cancel(); }
	if ( this.button_save )		this.button_save.onclick		= function() { self.Save(); }
}

DuplicateLayout_Dialog.prototype.Show = function(){
	Modal_Show( this.dialog, this.button_save.onclick, this.button_cancel.onclick );
}


DuplicateLayout_Dialog.prototype.Hide = function(){
	Modal_Hide();
}

DuplicateLayout_Dialog.prototype.Cancel = function(){
	this.Hide();
	this.oncancel();
}

DuplicateLayout_Dialog.prototype.Save = function(){
	var type;
	var self = this;

	if ( this.new_code.value.length == 0 ){
		Modal_Alert( 'Please enter a Code.' );
		this.new_code.focus();

		return false;
	}

	if ( this.new_name.value.length == 0 ){
		Modal_Alert( 'Please enter a Name.' );
		this.new_name.focus();

		return false;
	}

	Layouts_Duplicate( this.layout.id, this.new_code.value, this.new_name.value, function( response ) { self.Save_Callback( response ); } );
}

DuplicateLayout_Dialog.prototype.Save_Callback = function( response ){
	this.button_save.value		= "Add";
	this.button_save.disabled	= false;

	if ( !response.success )
	{
		this.onerror( response.error_message );

		if ( response.error_code == 'code' )
		{
			this.new_code.focus();
		}

		return;
	}

	this.new_code.value = '';
	this.new_name.value = '';

	this.Hide();
	this.onsave();
}

DuplicateLayout_Dialog.prototype.onerror	= function( error )	{ Modal_Alert( error ); }
DuplicateLayout_Dialog.prototype.oncancel	= function()		{ ; }
DuplicateLayout_Dialog.prototype.onsave		= function()		{ ; }
DuplicateLayout_Dialog.prototype.ondelete	= function()		{ ; }


function Layout_Dialog( layout )
{
	var self = this;

	self.layout	= layout;

	MMDialog.call( this, 'mm9_dialog_layout', null, null );

	self.element_container	= document.getElementById( 'layout_dialog_container' );

	self.button_close_container = document.getElementsByClassName( 'layout_dialog_close_button' )[0];
	self.button_close_container.innerHTML = '';
	self.button_close = new MMButton( self.button_close_container );
	self.button_close.SetText( 'Close' );
	self.button_close.SetImage( 'cancel' );
	self.button_close.SetOnClickHandler( function( e ) { return self.onClick_Close( e ); } );

	self.button_update_container = document.getElementsByClassName( 'layout_dialog_bottom_buttons' )[0];
	self.button_update_container.innerHTML = '';
	self.button_update = new MMButton( self.button_update_container );
	self.button_update.SetClassName( 'layout_dialog_bottom_button' );
	self.button_update.SetText( 'Update' );
	self.button_update.SetOnClickHandler( function( e ) { return self.Save(); } );


	self.SetFullscreenEnabled( true, true );
}
DeriveFrom( MMDialog, Layout_Dialog );

Layout_Dialog.prototype.onModalShow = function( z_index )
{
	var self = this;

	this.Fullscreen_Start();

	MMDialog.prototype.onModalShow.call( this, z_index );

	initializeLayout( self.layout );
}
Layout_Dialog.prototype.onFullscreen_End = function()
{
	if ( this.visible )
	{
		this.Hide();
	}
}
Layout_Dialog.prototype.onESC = function( e )
{
	this.Cancel();
}

Layout_Dialog.prototype.Cancel = function()
{
	return this.DisplayCancelDiscardSaveDialog();
}

Layout_Dialog.prototype.Cancel_LowLevel = function()
{
	this.Fullscreen_End();
}

Layout_Dialog.prototype.onClick_Close = function( e )
{
	this.Cancel();
	eventStopPropagation( e );
}

Layout_Dialog.prototype.DisplayCancelDiscardSaveDialog = function()
{
	var self = this;
	var dialog, button_save, button_cancel, button_discard;

	dialog 			= new ActionDialog();
	dialog.onESC	= function( e ) { button_cancel.SimulateClick(); };
	dialog.onEnter	= function( e ) { button_save.SimulateClick(); };

	button_cancel	= dialog.Button_Add_Left( 'Cancel',		'', '', 'neutral',	function() { ; } );
	button_discard	= dialog.Button_Add_Right( 'Discard',	'', '', 'negative',	function() { self.Cancel_LowLevel(); } );
	button_save		= dialog.Button_Add_Right( 'Save',		'', '', '',			function() { self.Save(); } );

	dialog.SetTitle( 'Save changes?' );
	dialog.SetMessage( 'Your changes will be lost if you don\'t save them.' );
	dialog.Show();
}