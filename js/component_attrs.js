function ComponentAttrs_Batchlist_Load_Query( filter, sort, offset, count, callback, delegator ) {
	return AJAX_Call_Module(	callback,
								'admin',
								'TGCOMPONENTS',
								'Component_Attrs_Load_Query',
								'&Filter=' + EncodeArray( filter ) +
								'&Sort=' + encodeURIComponent( sort ) +
								'&Offset=' + encodeURIComponent( offset ) +
								'&Count=' + encodeURIComponent( count ) +
								'&component_id=' + component_id,
								delegator );
}

function ComponentAttrs_Batchlist_Function( fieldlist, _function, callback, delegator ) { 
	return AJAX_Call_Module_FieldList( callback,
									   'admin',
									   'TGCOMPONENTS',
									   _function,
									   '',
									   fieldlist,
									   delegator );
}

function ComponentAttrs_Batchlist_Option_Function( parentlist, fieldlist, _function, callback, delegator ) { 
	return AJAX_Call_Module_FieldList( callback,
									   'admin',
									   'TGCOMPONENTS',
									   _function,
									   'Field_ID=' + parentlist.id +
									   '&component_id=' + parentlist.component_id,
									   fieldlist,
									   delegator );
}

function ComponentAttrs_Batchlist_DisplayOrder( fields, _function, callback, delegator ) {
	var i;
	var parameters = 'component_id=' + component_id;
	for ( i = 0; i < fields.length; i++ ) {
		parameters += ( parameters.length ? '&' : '' ) + encodeURIComponent( fields[ i ].name ) + '=' + encodeURIComponent( fields[ i ].value );
	}
	return AJAX_Call_Module_FieldList( callback,
									   'admin',
									   'TGCOMPONENTS',
									   _function,
									   parameters,
									   '',
									   delegator );
}

function ComponentAttrs_Batchlist( component_id ) {
	var self = this;
	self.component_id = component_id;

	MMBatchList.call( self, 'jsComponentAttributes' );

	self.branch_options = self.AddBranch( self.CreateColumnList_Options(), 'options' );
	self.Branch_SetCreateFunction( self.branch_options, self.Option_Create );

	self.Branch_SetInsertFunction( self.branch_options, self.Option_Insert );
	self.Branch_SetSaveFunction( self.branch_options, self.Option_Save );
	self.Branch_SetDeleteFunction( self.branch_options, self.Option_Delete );

	self.Feature_Add_RowSupportsChildren_AddHook( self.Field_RowSupportsChildren_Hook );

	self.Feature_Delete_Enable( 'Delete Field(s)' );
	self.Feature_Edit_Enable( 'Edit Field(s)' );
	self.Feature_RowDoubleClick_Enable();

	self.Feature_Add_Enable( 'Add Field', 'Save Field', 'Add Option', 'Cancel', 'Add Field', 'Save Field', 'Add Option', '' );

	self.Feature_SearchBar_SetPlaceholderText( 'Search Fields...' );
	self.SetDefaultSort( 'disp_order', '' );

	self.Feature_DisplayOrder_Enable( 'disp_order', 'Attrs_DisplayOrder' );
	self.Branch_SetDisplayOrderPrefix( this.branch_options, 'Option_Order' );
}

DeriveFrom( MMBatchList, ComponentAttrs_Batchlist );

ComponentAttrs_Batchlist.prototype.onLoad = ComponentAttrs_Batchlist_Load_Query;

ComponentAttrs_Batchlist.prototype.onCreateRootColumnList = function() {
	var columnlist;
	var self = this;

		self.attr_id				=	new MMBatchList_Column_Name( 'ID', 'id', 'id')
											.SetDisplayInMenu(false)
											.SetDisplayInList(false)
											.SetAdvancedSearchEnabled(false)
											.SetContentAttributeList( { 'class': 'mm9_batchlist_level_col' } );
		self.component_id			=	new MMBatchList_Column_Name( 'Component ID', 'component_id', 'component_id')
											.SetDisplayInMenu(false)
											.SetDisplayInList(false)
											.SetAdvancedSearchEnabled(false)
											.SetContentAttributeList( { 'class': 'mm9_batchlist_level_col' } );
		self.fields_code			=	new MMBatchList_Column_Text( 'Code', 'code', 'code' )
											.SetContentAttributeList( { 'class': 'mm9_batchlist_level_col' } );
		self.fields_prompt			=	new MMBatchList_Column_Text( 'Prompt', 'prompt', 'prompt' )
											.SetContentAttributeList( { 'class': 'mm9_batchlist_level_col' } );
		self.fields_type			=	new Fields_Column_Type();
		self.fields_required		=	new MMBatchList_Column_Checkbox( 'Required', 'required', 'required')
											.SetContentAttributeList( { 'class': 'mm9_batchlist_level_col' } );

		self.fields_display_order	=	new MMBatchList_Column( 'Display Order', 'disp_order')
										.SetDisplayInList( false )
										.SetSearchable( false )
										.SetSortByField( 'disp_order' )
										.SetUpdateOnModifiedOnly( true ),
	columnlist =
	[
		self.attr_id,
		self.component_id,
		self.fields_code,
		self.fields_prompt,
		self.fields_type,
		self.fields_required,
		self.fields_display_order
	];

	return columnlist;
}

ComponentAttrs_Batchlist.prototype.CreateColumnList_Options = function() {
	var self = this;
	var columnlist =
	[
		new MMBatchList_Column_Code( 'Attribute ID', 'attr_id', 'attr_id' )
				.SetRootColumn( self.attr_id )
				.SetSearchable( false )
				.SetDisplayInList( false ),
		new MMBatchList_Column_Name( 'Prompt', 'prompt', 'prompt' )
				.SetRootColumn( self.fields_prompt ),
		new MMBatchList_Column( 'Display Order', 'disp_order')
				.SetSortByField( 'disp_order' )
				.SetSearchable( false )
				.SetDisplayInList( false )
	];

	return columnlist;
}

ComponentAttrs_Batchlist.prototype.onRetrieveChildBranch = function( item )
{
	if ( !item || !item.root )
	{
		return null;
	}

	return item.branch.children[ 'options' ];
}


ComponentAttrs_Batchlist.prototype.onSave = function( item, callback, delegator ) {
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
	ComponentAttrs_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'ComponentAttrs_Update', callback, delegator );
}


ComponentAttrs_Batchlist.prototype.onCreate = function() {
	var record;

	record			= new Object();
	record.id		= 0;
	record.component_id	= component_id;
	record.code		= '';
	record.prompt	= '';
	record.required	= 0;
	record.options	= new Array();

	return record;
}

ComponentAttrs_Batchlist.prototype.onDelete = function( item, callback, delegator ) {
	ComponentAttrs_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'ComponentAttrs_Delete', callback, delegator );
}

ComponentAttrs_Batchlist.prototype.onInsert = function( item, callback, delegator ) {
	ComponentAttrs_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'ComponentAttrs_Insert', callback, delegator );
}

ComponentAttrs_Batchlist.prototype.onDisplayOrderSave = function( fieldlist, callback ) {
	ComponentAttrs_Batchlist_DisplayOrder( fieldlist, 'ComponentAttrs_DisplayOrder_Update', callback, '' );
}

ComponentAttrs_Batchlist.prototype.onSetDisplayOrder = function( recordlist, start_index ){
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



ComponentAttrs_Batchlist.prototype.Option_Create = function() {
	var record;

	record				= new Object();
	record.id			= 0;
	record.attr_id		= 0;
	record.prompt		= '';
	record.disp_order	= 0;

	return record;
}

ComponentAttrs_Batchlist.prototype.Option_Insert = function( item, callback, delegator ) {
	var parent_field = this.GetListItemRecord_Parent( item.index );
	ComponentAttrs_Batchlist_Option_Function( parent_field, item.record.mmbatchlist_fieldlist, 'Option_Insert', callback, delegator );
}

ComponentAttrs_Batchlist.prototype.Field_RowSupportsChildren_Hook = function( item ) {
	if ( !item || !item.record ) {
		return false;
	}

	if ( item.record.type != 'radio' && item.record.type != 'select' ){
		return false;
	}

	return true;
} 


ComponentAttrs_Batchlist.prototype.onProcessLoadedData = function( recordlist, start_index ) {
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

ComponentAttrs_Batchlist.prototype.Option_Save = function( item, callback, delegator ) {
	ComponentAttrs_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'Option_Update', callback, delegator );

}

ComponentAttrs_Batchlist.prototype.Option_Delete = function( item, callback, delegator ) {
	ComponentAttrs_Batchlist_Function( item.record.mmbatchlist_fieldlist, 'Option_Delete', callback, delegator );
}

// Column 'type'
function Fields_Column_Type() {
	MMBatchList_Column_Text.call( this, 'Type', 'type', 'type' );

	this.SetOnDisplayData( this.onDisplayData );
	this.SetOnDisplayEdit( this.onDisplayEdit );
}
DeriveFrom( MMBatchList_Column_Text, Fields_Column_Type );

Fields_Column_Type.prototype.onDisplayEdit = function( record, item ) {
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

Fields_Column_Type.prototype.onDisplayData = function( record ) {
	var text = newElement( 'div', null, null, null );

	if ( record.type == 'radio' )					text.innerHTML = 'Radio Buttons';
	else if ( record.type == 'select' )				text.innerHTML = 'Drop-down List';
	else if ( record.type == 'checkbox' )			text.innerHTML = 'Checkbox';
	else if ( record.type == 'text' )				text.innerHTML = 'Text Field';
	else if ( record.type == 'memo' )				text.innerHTML = 'Text Area';
	else if ( record.type == 'image' )				text.innerHTML = 'Image';
	else if ( record.type == 'product' )			text.innerHTML = 'Product';
	else if ( record.type == 'category' )			text.innerHTML = 'Category';

	return text;
}