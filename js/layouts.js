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

function Layouts_Batchlist() {
	var self = this;
	MMBatchList.call( self, 'jsLayoutBatchlist' );
	self.Feature_SearchBar_SetPlaceholderText( 'Search Layouts...' );
	self.SetDefaultSort( 'id', '' );
	self.Feature_Add_Enable('Add Layout');
	self.Feature_Edit_Enable('Edit Layout(s)');
	self.Feature_Delete_Enable('Delete Layout(s)');
	self.Feature_RowDoubleClick_Enable();
	self.processingdialog = new ProcessingDialog();
	self.Feature_GoTo_Enable('Open Layout', '');

	button = this.Feature_Buttons_AddButton_Dynamic_SingleSelect( 'Duplicate Layout', 'Duplicate Template', 'readytheme', this.DuplicateLayout );
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
Layouts_Batchlist.prototype.onGoTo = function( item, e ) {
	return OpenLinkHandler( e, adminurl, { 'Module_Code': 'TGCOMPONENTS', 'Store_Code': Store_Code, 'Screen': 'SUTL', 'Layout_ID': item.record.id, 'Module_Type': 'util', 'TGCOMPONENTS_Screen' : 'Layout' } );
}

Layouts_Batchlist.prototype.DuplicateLayout = function( item, e ) {
	console.log( item );
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

	this.Hide();
	this.onsave();
}

DuplicateLayout_Dialog.prototype.onerror	= function( error )	{ Modal_Alert( error ); }
DuplicateLayout_Dialog.prototype.oncancel	= function()		{ ; }
DuplicateLayout_Dialog.prototype.onsave		= function()		{ ; }
DuplicateLayout_Dialog.prototype.ondelete	= function()		{ ; }
