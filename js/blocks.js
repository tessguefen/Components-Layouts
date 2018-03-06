function Blocks_Batchlist_Load_Query( filter, sort, offset, count, callback, delegator ) {
	return AJAX_Call_Module(	callback,
								'admin',
								'TGBLOCKS',
								'Blocks_Load_Query',
								'&Filter=' + EncodeArray( filter ) +
								'&Sort=' + encodeURIComponent( sort ) +
								'&Offset=' + encodeURIComponent( offset ) +
								'&Count=' + encodeURIComponent( count ),
								delegator );
}

function Blocks_Batchlist_Function( fieldlist, _function, callback, delegator ) { 
	return AJAX_Call_Module_FieldList( callback,
									   'admin',
									   'TGBLOCKS',
									   _function,
									   '',
									   fieldlist,
									   delegator );
}

function Blocks_Batchlist() {
	var self = this;
	MMBatchList.call( self, 'jsBlockBatchlist' );
	self.Feature_SearchBar_SetPlaceholderText( 'Search Blocks...' );
	self.SetDefaultSort( 'id', '' );
	self.Feature_Add_Enable('Add Block');
	self.Feature_Edit_Enable('Edit Block(s)');
	self.Feature_Delete_Enable('Delete Block(s)');
	self.Feature_RowDoubleClick_Enable();
	self.processingdialog = new ProcessingDialog();
	self.Feature_GoTo_Enable('Open Block', '');
}

DeriveFrom( MMBatchList, Blocks_Batchlist );

Blocks_Batchlist.prototype.onLoad = Blocks_Batchlist_Load_Query;

Blocks_Batchlist.prototype.onCreateRootColumnList = function() {
	var columnlist =
	[
		new MMBatchList_Column_Name( 'Block ID', 'id', 'id')
		.SetAdvancedSearchEnabled(false)
		.SetDisplayInMenu(false)
		.SetDisplayInList(false)
		.SetAdvancedSearchEnabled(false),
		new MMBatchList_Column_Code( 'Code', 'code', 'code'),
		new MMBatchList_Column_Name( 'Name', 'name', 'name'),
		new MMBatchList_Column_Name( 'Description', 'descrip', 'descrip'),
		new MMBatchList_Column_Image_Upload( 'Image', 'image', 'image'),
		new MMBatchList_Column_CheckboxSlider( 'Allow Nested Blocks', 'allow_children', 'allow_children', function( item, checked, delegator ) {
			Blocks_Batchlist.Update_Nests( item, checked, function(){}, delegator );
		} )
	];
	return columnlist;
}

Blocks_Batchlist.prototype.onCreate = function() {
	var record;
	record = new Object();
	record.id = 0;
	record.code = '';
	record.name = '';
	record.descrip = '';
	record.image = '';
	record.allow_children = 0;
	return record;
}

Blocks_Batchlist.prototype.onSave = function( item, callback, delegator ) {
	Blocks_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'Block_Update', callback, delegator );
}
Blocks_Batchlist.prototype.onInsert = function( item, callback, delegator ) {
	Blocks_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'Block_Insert', callback, delegator );
}
Blocks_Batchlist.prototype.onDelete = function( item, callback, delegator ) {
	Blocks_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'Block_Delete', callback, delegator );
}
Blocks_Batchlist.Update_Nests = function( item, checked, callback, delegator ) {
	for ( i = 0; i < item.record.mmbatchlist_fieldlist.length; i++ ) {
		if ( item.record.mmbatchlist_fieldlist[ i ].name == 'allow_children' ) {
			item.record.mmbatchlist_fieldlist[ i ].value = checked ? 1 : 0;
			break;
		}
	}
	Blocks_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'Block_Update', callback, delegator );
}
Blocks_Batchlist.prototype.onGoTo = function( item, e ) {
	return OpenLinkHandler( e, adminurl, { 'Module_Code': 'TGBLOCKS', 'Store_Code': Store_Code, 'Screen': 'SUTL', 'Block_ID': item.record.id, 'Module_Type': 'util', 'TGBLOCKS_Screen' : 'Block' } );
}