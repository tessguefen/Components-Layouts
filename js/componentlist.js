function Components_List()
{
	MMBatchList.call( this, 'tgcomponents_components' );

	this.Feature_SearchBar_SetPlaceholderText( 'Search Components...' );
	this.SetDefaultSort( 'id', '' );

	if ( CanI( 'TGCOMPONENTS', 0, 1, 0, 0 ) )
	{
		this.Feature_Add_Enable( 'Add Component' );
	}

	if ( CanI( 'TGCOMPONENTS', 0, 0, 1, 0 ) )
	{
		this.Feature_Edit_Enable( 'Edit Component(s)' );
		this.Feature_DisplayOrder_Enable( 'disp_order', 'Components_Order' );
		this.Feature_RowDoubleClick_Enable();
	}

	if ( CanI( 'TGCOMPONENTS', 0, 0, 0, 1 ) )
	{
		this.Feature_Delete_Enable( 'Delete Component(s)' );
	}

	this.processingdialog = new ProcessingDialog();
	this.Feature_GoTo_Enable( 'Open Component', '' );

	this.SetDefaultSort( 'disp_order', '' );
}

DeriveFrom( MMBatchList, Components_List );

Components_List.prototype.onLoad = Components_Load_Query;

Components_List.prototype.onCreateRootColumnList = function()
{
	var self = this;
	var allow_children_column;

	if ( CanI( 'TGCOMPONENTS', 0, 0, 1, 0 ) )	allow_children_column = new MMBatchList_Column_CheckboxSlider( 'Allow Nested Components', 'alw_chldrn', 'Allow_Children', function( item, checked, delegator ) { self.Update_Allow_Children( item, checked, function(){}, delegator ); } );
	else										allow_children_column = new MMBatchList_Column_Checkbox( 'Allow Nested Components ', 'alw_chldrn', 'Allow_Children' );

	return [
		new MMBatchList_Column_Name( 'Component ID', 'id', 'ID')
			.SetAdvancedSearchEnabled( false )
			.SetDisplayInMenu( false )
			.SetDisplayInList( false )
			.SetAdvancedSearchEnabled( false ),
		new MMBatchList_Column_Code( 'Code', 'code', 'Code'),
		new MMBatchList_Column_Name( 'Name', 'name', 'Name'),
		new MMBatchList_Column_Name( 'Description', 'descrip', 'Descrip'),
		new MMBatchList_Column_Image_Upload( 'Image', 'image', 'Image')
			.SetOnDisplayData( function( record ) {
				var element;
				element						= newElement( 'span', { 'class': 'mm9_batchlist_column_imagepreview_image_container' }, null, null );
				element.element_preview		= newElement( 'img', { 'class': 'mm9_batchlist_column_imagepreview_image' }, null, element );
				element.element_preview.src	= record[ this.code ];

				return element;
			}),
		allow_children_column,
		new MMBatchList_Column( 'Display Order', 'disp_order')
			.SetDisplayInList( false )
			.SetSearchable( false )
			.SetSortByField( 'disp_order' )
			.SetUpdateOnModifiedOnly( true )
	];
}

Components_List.prototype.onCreate = function()
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

Components_List.prototype.onInsert = function( item, callback, delegator )
{
	Component_Insert( item.record, callback, delegator );
}

Components_List.prototype.onSave = function( item, callback, delegator )
{
	Component_Update( item.record, callback, delegator );
}

Components_List.prototype.onDelete = function( item, callback, delegator )
{
	Component_Delete( item.record.id, callback, delegator );
}

Components_List.prototype.Update_Allow_Children = function( item, checked, callback, delegator )
{
	item.record.alw_chldrn = checked ? 1 : 0;
	Component_Update( item.record, callback, delegator );
}

Components_List.prototype.onGoTo = function( item, e )
{
	return OpenLinkHandler( e, adminurl, { 'Module_Code': 'TGCOMPONENTS', 'Store_Code': Store_Code, 'Screen': 'SUTL', 'Component_ID': item.record.id, 'Module_Type': 'util', 'TGCOMPONENTS_Screen' : 'Component' } );
}

Components_List.prototype.onDisplayOrderSave = function( fieldlist, callback, delegator )
{
	Component_DisplayOrder_Update( fieldlist, callback, delegator );
}

Components_List.prototype.onSetDisplayOrder = function( recordlist, start_index )
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