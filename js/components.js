function Components_Batchlist_Load_Query( filter, sort, offset, count, callback, delegator ) {
	return AJAX_Call_Module(	callback,
								'admin',
								'TGCOMPONENTS',
								'Components_Load_Query',
								'&Filter=' + EncodeArray( filter ) +
								'&Sort=' + encodeURIComponent( sort ) +
								'&Offset=' + encodeURIComponent( offset ) +
								'&Count=' + encodeURIComponent( count ),
								delegator );
}

function Components_Batchlist_Function( fieldlist, _function, callback, delegator ) { 
	return AJAX_Call_Module_FieldList( callback,
									   'admin',
									   'TGCOMPONENTS',
									   _function,
									   '',
									   fieldlist,
									   delegator );
}

function Components_Batchlist() {
	var self = this;
	MMBatchList.call( self, 'jsComponentBatchlist' );
	self.Feature_SearchBar_SetPlaceholderText( 'Search Components...' );
	self.SetDefaultSort( 'id', '' );
	self.Feature_Add_Enable('Add Component');
	self.Feature_Edit_Enable('Edit Component(s)');
	self.Feature_Delete_Enable('Delete Component(s)');
	self.Feature_RowDoubleClick_Enable();
	self.processingdialog = new ProcessingDialog();
	self.Feature_GoTo_Enable('Open Component', '');
}

DeriveFrom( MMBatchList, Components_Batchlist );

Components_Batchlist.prototype.onLoad = Components_Batchlist_Load_Query;

Components_Batchlist.prototype.onCreateRootColumnList = function() {
	var columnlist =
	[
		new MMBatchList_Column_Name( 'Component ID', 'id', 'id')
		.SetAdvancedSearchEnabled(false)
		.SetDisplayInMenu(false)
		.SetDisplayInList(false)
		.SetAdvancedSearchEnabled(false),
		new MMBatchList_Column_Code( 'Code', 'code', 'code'),
		new MMBatchList_Column_Name( 'Name', 'name', 'name'),
		new MMBatchList_Column_Name( 'Description', 'descrip', 'descrip'),
		new MMBatchList_Column_Image_Upload( 'Image', 'image', 'image'),
		new MMBatchList_Column_CheckboxSlider( 'Allow Nested Components', 'allow_children', 'allow_children', function( item, checked, delegator ) {
			Components_Batchlist.Update_Nests( item, checked, function(){}, delegator );
		} )
	];
	return columnlist;
}

Components_Batchlist.prototype.onCreate = function() {
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

Components_Batchlist.prototype.onSave = function( item, callback, delegator ) {
	Components_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'Component_Update', callback, delegator );
}
Components_Batchlist.prototype.onInsert = function( item, callback, delegator ) {
	Components_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'Component_Insert', callback, delegator );
}
Components_Batchlist.prototype.onDelete = function( item, callback, delegator ) {
	Components_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'Component_Delete', callback, delegator );
}
Components_Batchlist.Update_Nests = function( item, checked, callback, delegator ) {
	for ( i = 0; i < item.record.mmbatchlist_fieldlist.length; i++ ) {
		if ( item.record.mmbatchlist_fieldlist[ i ].name == 'allow_children' ) {
			item.record.mmbatchlist_fieldlist[ i ].value = checked ? 1 : 0;
			break;
		}
	}
	Components_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'Component_Update', callback, delegator );
}
Components_Batchlist.prototype.onGoTo = function( item, e ) {
	return OpenLinkHandler( e, adminurl, { 'Module_Code': 'TGCOMPONENTS', 'Store_Code': Store_Code, 'Screen': 'SUTL', 'Component_ID': item.record.id, 'Module_Type': 'util', 'TGCOMPONENTS_Screen' : 'Component' } );
}