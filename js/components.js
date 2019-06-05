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

function Components_Batchlist_Function( fieldlist, _function, callback, delegator )
{ 
	return AJAX_Call_Module_FieldList( callback,
									   'admin',
									   'TGCOMPONENTS',
									   _function,
									   '',
									   fieldlist,
									   delegator );
}

function Components_Batchlist()
{
	var self = this;
	MMBatchList.call( self, 'tgcomponents_components' );
	self.Feature_SearchBar_SetPlaceholderText( 'Search Components...' );
	self.SetDefaultSort( 'id', '' );

	if ( CanI( 'TGCOMPONENTS', 0, 1, 0, 0 ) ) {
		self.Feature_Add_Enable('Add Component');
	}

	if ( CanI( 'TGCOMPONENTS', 0, 0, 1, 0 ) ) {
		self.Feature_Edit_Enable('Edit Component(s)');
		self.Feature_DisplayOrder_Enable( 'disp_order', 'Components_Order' );
		self.Feature_RowDoubleClick_Enable();
	}

	if ( CanI( 'TGCOMPONENTS', 0, 0, 0, 1 ) ) {
		self.Feature_Delete_Enable('Delete Component(s)');
	}

	self.processingdialog = new ProcessingDialog();
	self.Feature_GoTo_Enable('Open Component', '');

	self.SetDefaultSort( 'disp_order', '' );
}

DeriveFrom( MMBatchList, Components_Batchlist );

Components_Batchlist.prototype.onLoad = Components_Batchlist_Load_Query;

Components_Batchlist.prototype.onCreateRootColumnList = function()
{
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
		new MMBatchList_Column_Image_Upload( 'Image', 'image', 'image')
		.SetOnDisplayData( function( record ) {
			var element;
			element						= newElement( 'span', { 'class': 'mm9_batchlist_column_imagepreview_image_container' }, null, null );
			element.element_preview		= newElement( 'img', { 'class': 'mm9_batchlist_column_imagepreview_image' }, null, element );
			element.element_preview.src	= record[ this.code ];

			return element;
		}),
		new MMBatchList_Column( 'Display Order', 'disp_order')
		.SetDisplayInList( false )
		.SetSearchable( false )
		.SetSortByField( 'disp_order' )
		.SetUpdateOnModifiedOnly( true )

	];

	if ( CanI( 'TGCOMPONENTS', 0, 0, 1, 0 ) ) {
		columnlist.push( new MMBatchList_Column_CheckboxSlider( 'Allow Nested Components', 'alw_chldrn', 'alw_chldrn', function( item, checked, delegator ) {Components_Batchlist.Update_Nests( item, checked, function(){}, delegator ); } ) );
	} else {
		columnlist.push( new MMBatchList_Column_Checkbox( 'Allow Nested Components ', 'alw_chldrn', 'alw_chldrn' ) );
	}

	return columnlist;
}

Components_Batchlist.prototype.onCreate = function()
{
	var record;
	record = new Object();
	record.id = 0;
	record.code = '';
	record.name = '';
	record.descrip = '';
	record.image = '';
	record.alw_chldrn = 0;
	record.disp_order = 0;
	return record;
}

Components_Batchlist.prototype.onSave = function( item, callback, delegator )
{
	Components_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'Component_Update', callback, delegator );
}
Components_Batchlist.prototype.onInsert = function( item, callback, delegator )
{
	Components_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'Component_Insert', callback, delegator );
}
Components_Batchlist.prototype.onDelete = function( item, callback, delegator )
{
	Components_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'Component_Delete', callback, delegator );
}
Components_Batchlist.Update_Nests = function( item, checked, callback, delegator )
{
	for ( i = 0; i < item.record.mmbatchlist_fieldlist.length; i++ ) {
		if ( item.record.mmbatchlist_fieldlist[ i ].name == 'alw_chldrn' ) {
			item.record.mmbatchlist_fieldlist[ i ].value = checked ? 1 : 0;
			item.record.mmbatchlist_fieldlist[ i ].encoded_value = checked ? 1 : 0;
			break;
		}
	}

	Components_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'Component_Update', callback, delegator );
}
Components_Batchlist.prototype.onGoTo = function( item, e )
{
	return OpenLinkHandler( e, adminurl, { 'Module_Code': 'TGCOMPONENTS', 'Store_Code': Store_Code, 'Screen': 'SUTL', 'Component_ID': item.record.id, 'Module_Type': 'util', 'TGCOMPONENTS_Screen' : 'Component' } );
}
Components_Batchlist.prototype.onDisplayOrderSave = function( fieldlist, callback, delegator )
{
	Components_Batchlist_Function( fieldlist, 'Components_DisplayOrder_Update', callback, delegator );
}

Components_Batchlist.prototype.onSetDisplayOrder = function( recordlist, start_index )
{
	var i, i_len, j, j_len;

	for ( i = 0, i_len = recordlist.length; i < i_len; i++ )
	{
		this.Feature_DisplayOrder_SetRecordOrder( recordlist[ i ], start_index + i + 1 );

		if ( recordlist[ i ] )
		{
			if ( !recordlist[ i ].options )
			{
				continue;
			}

			for ( j = 0, j_len = recordlist[ i ].options.length; j < j_len; j++ )
			{
				this.Feature_DisplayOrder_SetRecordOrder( recordlist[ i ].options[ j ], j + 1 );
			}
		}
	}
}