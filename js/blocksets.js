function BlockSets_Batchlist_Load_Query( filter, sort, offset, count, callback, delegator ) {
	return AJAX_Call_Module(	callback,
								'admin',
								'TGBLOCKS',
								'BlockSets_Load_Query',
								'&Filter=' + EncodeArray( filter ) +
								'&Sort=' + encodeURIComponent( sort ) +
								'&Offset=' + encodeURIComponent( offset ) +
								'&Count=' + encodeURIComponent( count ),
								delegator );
}

function BlockSets_Batchlist_Function( fieldlist, _function, callback, delegator ) { 
	return AJAX_Call_Module_FieldList( callback,
									   'admin',
									   'TGBLOCKS',
									   _function,
									   '',
									   fieldlist,
									   delegator );
}

function BlockSets_Batchlist() {
	var self = this;
	MMBatchList.call( self, 'jsBlockSetBatchlist' );
	self.Feature_SearchBar_SetPlaceholderText( 'Search Block Sets...' );
	self.SetDefaultSort( 'id', '' );
	self.Feature_Add_Enable('Add Block Set');
	self.Feature_Edit_Enable('Edit Block Set(s)');
	self.Feature_Delete_Enable('Delete Block Set(s)');
	self.Feature_RowDoubleClick_Enable();
	self.processingdialog = new ProcessingDialog();
	self.Feature_GoTo_Enable('Open Block Set', '');
}

DeriveFrom( MMBatchList, BlockSets_Batchlist );

BlockSets_Batchlist.prototype.onLoad = BlockSets_Batchlist_Load_Query;

BlockSets_Batchlist.prototype.onCreateRootColumnList = function() {
	var columnlist =
	[
		new MMBatchList_Column_Name( 'Block ID', 'id', 'id')
		.SetAdvancedSearchEnabled(false)
		.SetDisplayInMenu(false)
		.SetDisplayInList(false)
		.SetAdvancedSearchEnabled(false),
		new MMBatchList_Column_Code( 'Code', 'code', 'code'),
		new MMBatchList_Column_Name( 'Name', 'name', 'name')
	];
	return columnlist;
}

BlockSets_Batchlist.prototype.onCreate = function() {
	var record;
	record = new Object();
	record.id = 0;
	record.code = '';
	record.name = '';
	return record;
}

BlockSets_Batchlist.prototype.onSave = function( item, callback, delegator ) {
	BlockSets_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'BlockSet_Update', callback, delegator );
}
BlockSets_Batchlist.prototype.onInsert = function( item, callback, delegator ) {
	BlockSets_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'BlockSet_Insert', callback, delegator );
}
BlockSets_Batchlist.prototype.onDelete = function( item, callback, delegator ) {
	BlockSets_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'BlockSet_Delete', callback, delegator );
}
BlockSets_Batchlist.prototype.onGoTo = function( item, e ) {
	return OpenLinkHandler( e, adminurl, { 'Module_Code': 'TGBLOCKS', 'Store_Code': Store_Code, 'Screen': 'SUTL', 'BlockSet_ID': item.record.id, 'Module_Type': 'util', 'TGBLOCKS_Screen' : 'Block_Set' } );
}