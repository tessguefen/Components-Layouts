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