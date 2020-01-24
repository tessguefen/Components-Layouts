function ComponentAttributes_List( cmpnt_id )
{
	this.cmpnt_id = cmpnt_id;

	MMBatchList.call( this, 'tgcomponents_componentattributes' );

	this.branch_options = this.AddBranch( this.CreateColumnList_Options(), 'options' );
	this.Branch_SetCreateFunction( this.branch_options, this.Option_Create );

	this.Branch_SetInsertFunction( this.branch_options, this.Option_Insert );
	this.Branch_SetSaveFunction( this.branch_options, this.Option_Save );
	this.Branch_SetDeleteFunction( this.branch_options, this.Option_Delete );
	this.Branch_SetFindIndex_ParamsFunction( this.branch_options, this.Option_FindIndex_Params );
	this.Branch_SetFindIndex_CompareFunction( this.branch_options, this.Option_FindIndex_Compare );

	this.Feature_Add_RowSupportsChildren_AddHook( this.Field_RowSupportsChildren_Hook );

	if ( CanI( 'TGCOMPONENTS', 0, 1, 0, 0 ) )
	{
		this.Feature_Add_Enable( 'Add Field', 'Save Field', 'Add Option', 'Cancel', 'Add Field', 'Save Field', 'Add Option', '' );
	}

	if ( CanI( 'TGCOMPONENTS', 0, 0, 1, 0 ) )
	{
		this.Feature_Edit_Enable( 'Edit Field(s)' );
		this.Feature_RowDoubleClick_Enable();
		this.Feature_DisplayOrder_Enable( 'disp_order', 'Components_Order' );
	}

	if ( CanI( 'TGCOMPONENTS', 0, 0, 0, 1 ) )
	{
		this.Feature_Delete_Enable( 'Delete Field(s)' );
	}

	this.Feature_SearchBar_SetPlaceholderText( 'Search Fields...' );
	this.SetDefaultSort( 'disp_order', '' );

	this.Branch_SetDisplayOrderPrefix( this.branch_options, 'Option_Order' );
}

DeriveFrom( MMBatchList, ComponentAttributes_List );

ComponentAttributes_List.prototype.onLoad = function( filter, sort, offset, count, callback, delegator )
{
	return ComponentAttributes_Load_Query( this.cmpnt_id, filter, sort, offset, count, callback, delegator ); 
}

ComponentAttributes_List.prototype.onCreateRootColumnList = function()
{
	this.fields_id				=	new MMBatchList_Column_Name( 'ID', 'id', 'ID')
										.SetDisplayInMenu(false)
										.SetDisplayInList(false)
										.SetAdvancedSearchEnabled(false)
										.SetContentAttributeList( { 'class': 'mm9_batchlist_level_col' } );
	this.fields_cmpnt_id		=	new MMBatchList_Column_Name( 'Component ID', 'cmpnt_id', 'Component_ID')
										.SetDisplayInMenu(false)
										.SetDisplayInList(false)
										.SetAdvancedSearchEnabled(false)
										.SetContentAttributeList( { 'class': 'mm9_batchlist_level_col' } );
	this.fields_code			=	new MMBatchList_Column_Text( 'Code', 'code', 'Code' )
										.SetContentAttributeList( { 'class': 'mm9_batchlist_level_col' } );
	this.fields_prompt			=	new MMBatchList_Column_Text( 'Prompt', 'prompt', 'Prompt' )
										.SetContentAttributeList( { 'class': 'mm9_batchlist_level_col' } );
	this.fields_type			=	new Fields_Column_Type();
	this.fields_required		=	new MMBatchList_Column_Checkbox( 'Required', 'required', 'Required')
										.SetContentAttributeList( { 'class': 'mm9_batchlist_level_col' } );
	this.fields_display_order	=	new MMBatchList_Column( 'Display Order', 'disp_order')
										.SetDisplayInList( false )
										.SetSearchable( false )
										.SetSortByField( 'disp_order' )
										.SetUpdateOnModifiedOnly( true );
	return [
		this.fields_id,
		this.fields_cmpnt_id,
		this.fields_code,
		this.fields_prompt,
		this.fields_type,
		this.fields_required,
		this.fields_display_order
	];
}

ComponentAttributes_List.prototype.CreateColumnList_Options = function()
{
	return [
		new MMBatchList_Column_Name( 'Attribute ID', 'attr_id', 'Attribute_ID' )
				.SetRootColumn( this.fields_id )
				.SetSearchable( false )
				.SetDisplayInList( false ),
		new MMBatchList_Column_Code( 'Option ID', 'id', 'ID' )
				.SetRootColumn( this.fields_cmpnt_id )
				.SetSearchable( false )
				.SetDisplayInList( false ),
		new MMBatchList_Column_Name( 'Prompt', 'prompt', 'Prompt' )
				.SetRootColumn( this.fields_prompt ),
		new MMBatchList_Column( 'Display Order', 'disp_order')
				.SetSortByField( 'disp_order' )
				.SetSearchable( false )
				.SetDisplayInList( false )
	];
}

ComponentAttributes_List.prototype.onRetrieveChildBranch = function( item )
{
	if ( item && item.root && item.record ){
		return item.branch.children[ 'options' ];
	}

	return null;
}

ComponentAttributes_List.prototype.onSave = function( item, callback, delegator )
{
	var self = this;
	var original_callback;

	if ( ( item.original_record.type == 'radio' || item.original_record.type == 'select' ) &&
		 ( item.record.type != 'radio' && item.record.type != 'select' ) )
	{
		original_callback	= callback;
		callback			= function( response )
		{
			var i, i_len, child_item, removelist;

			if ( response.success )
			{
				removelist = new Array();

				for ( i = 0, i_len = item.child_indices.length; i < i_len; i++ )
				{
					if ( ( child_item = self.GetListItem( item.child_indices[ i ] ) ) !== null )
					{
						removelist.push( child_item );
					}
				}

				for ( i = 0, i_len = removelist.length; i < i_len; i++ )
				{
					self.DeleteListItem( removelist[ i ] );
				}

				item.child_indices = new Array();
			}

			original_callback( response );
		}
	}

	ComponentAttribute_Update( item.record, callback, delegator );
}

ComponentAttributes_List.prototype.onCreate = function()
{
	var record;

	record			= new Object();
	record.id		= 0;
	record.cmpnt_id	= this.cmpnt_id;
	record.code		= '';
	record.prompt	= '';
	record.required	= 0;
	record.options	= new Array();

	return record;
}

ComponentAttributes_List.prototype.onDelete = function( item, callback, delegator )
{
	ComponentAttribute_Delete( item.record.id, callback, delegator );
}

ComponentAttributes_List.prototype.onInsert = function( item, callback, delegator )
{
	ComponentAttribute_Insert( item.record, callback, delegator );
}

ComponentAttributes_List.prototype.onDisplayOrderSave = function( fieldlist, callback )
{
	ComponentAttributes_DisplayOrder_Update( this.cmpnt_id, fieldlist, callback, '' );
}

ComponentAttributes_List.prototype.onSetDisplayOrder = function( recordlist, start_index )
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

ComponentAttributes_List.prototype.Option_Create = function()
{
	var record;

	record				= new Object();
	record.id			= 0;
	record.attr_id		= 0;
	record.prompt		= '';
	record.disp_order	= 0;

	return record;
}

ComponentAttributes_List.prototype.Option_Insert = function( item, callback, delegator )
{
	var attribute_record, error;

	if ( ( attribute_record = this.GetListItemRecord_Parent( item.index ) ) == null )
	{
		error							= new Object();
		error.validation_error			= true;
		error.error_field_message		= 'Attribute record not found';
		error.error_field				= 'Code';

		return this.onerror( error );
	}

	ComponentOption_Insert( attribute_record, item.record, callback, delegator );
}

ComponentAttributes_List.prototype.Field_RowSupportsChildren_Hook = function( item )
{
	if ( !item || !item.record )
	{
		return false;
	}

	if ( item.record.type != 'radio' && item.record.type != 'select' )
	{
		return false;
	}

	return true;
} 

ComponentAttributes_List.prototype.onProcessLoadedData = function( recordlist, start_index )
{
	var i, j, index, root_index;

	index = start_index;

	for ( i = 0; i < recordlist.length; i++ )
	{
		root_index = index;
		this.ItemList_CreateInsertAtIndex( recordlist[ i ], index++, -1, this.branch_root );

		if ( recordlist[ i ].options )
		{
			for ( j = 0; j < recordlist[ i ].options.length; j++ )
			{
				this.ItemList_CreateInsertAtIndex( recordlist[ i ].options[ j ], index++, root_index, this.branch_options );
			}
		}
	}
}

ComponentAttributes_List.prototype.Option_FindIndex_Params = function( item )
{
	var attribute_record = this.GetListItemRecord_Parent( item.index );

	return { 'Attribute_ID': attribute_record ? attribute_record.id : '', 'Option_Prompt': item && item.record ? item.record.prompt : '' };
}

ComponentAttributes_List.prototype.Option_FindIndex_Compare = function( item, params )
{
	if ( params == null ) return false;

	var attribute_record = this.GetListItemRecord_Parent( item.index );

	if ( item.record											&&
		 attribute_record										&& 
		 ( attribute_record.id == params[ 'Attribute_ID' ] )	&&
		 ( item.record.prompt == params[ 'Option_Prompt' ] ) )
	{
		return true;
	}

	return false;
}

ComponentAttributes_List.prototype.Option_Save = function( item, callback, delegator )
{
	var parent_field = this.GetListItemRecord_Parent( item.index );
	ComponentOption_Update( parent_field, item.record, callback, delegator );

}

ComponentAttributes_List.prototype.Option_Delete = function( item, callback, delegator )
{
	ComponentOption_Delete( item.record.id, callback, delegator );
}

function Fields_Column_Type()
{
	MMBatchList_Column_Text.call( this, 'Type', 'type', 'type' );

	this.SetOnDisplayData( this.onDisplayData );
	this.SetOnDisplayEdit( this.onDisplayEdit );
}

DeriveFrom( MMBatchList_Column_Text, Fields_Column_Type );

Fields_Column_Type.prototype.onDisplayEdit = function( record, item )
{
	var i, i_len;
	var select;

	select									= newElement( 'select', { 'name': 'type' }, null, null );
	select.options[ select.options.length ] = new Option( 'Text Field', 'text' );
	select.options[ select.options.length ] = new Option( 'Radio Buttons', 'radio' );
	select.options[ select.options.length ] = new Option( 'Drop-down List', 'select' );
	select.options[ select.options.length ] = new Option( 'Checkbox', 'checkbox' );
	select.options[ select.options.length ] = new Option( 'Text Area', 'memo' );
	select.options[ select.options.length ] = new Option( 'Image', 'image' );
	select.options[ select.options.length ] = new Option( 'Product', 'product' );
	select.options[ select.options.length ] = new Option( 'Category', 'category' );
	select.options[ select.options.length ] = new Option( 'Link', 'link' );
	select.options[ select.options.length ] = new Option( 'Image Type', 'imagetype' );
	select.options[ select.options.length ] = new Option( 'Date/ Time', 'datetime' );
	select.options[ select.options.length ] = new Option( 'Multi-Text', 'multitext' );

	for ( i = 0, i_len = select.options.length; i < i_len; i++ )
	{
		if ( select.options[ i ].value == record.type )
		{
			select.selectedIndex = i;
			break;
		}
	}
	return select;
}

Fields_Column_Type.prototype.onDisplayData = function( record )
{
	var text = newElement( 'div', null, null, null );

	if ( record.type == 'radio' )				text.innerHTML = 'Radio Buttons';
	else if ( record.type == 'select' )			text.innerHTML = 'Drop-down List';
	else if ( record.type == 'checkbox' )		text.innerHTML = 'Checkbox';
	else if ( record.type == 'text' )			text.innerHTML = 'Text Field';
	else if ( record.type == 'memo' )			text.innerHTML = 'Text Area';
	else if ( record.type == 'image' )			text.innerHTML = 'Image';
	else if ( record.type == 'product' )		text.innerHTML = 'Product';
	else if ( record.type == 'category' )		text.innerHTML = 'Category';
	else if ( record.type == 'link' )			text.innerHTML = 'Link';
	else if ( record.type == 'imagetype' )		text.innerHTML = 'Image Type';
	else if ( record.type == 'datetime' )		text.innerHTML = 'Date/ Time';
	else if ( record.type == 'multitext' )		text.innerHTML = 'Multi-Text';

	return text;
}
