// Layout Functions

function LayoutList_Load_Query( filter, sort, offset, count, callback, delegator )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'LayoutList_Load_Query',
	{
		Filter:			filter,
		Sort:			sort,
		Offset:			offset,
		Count:			count
	}, delegator );
}

function Layout_Update( data, callback, delegator )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'Layout_Update',
	{
		ID:				data.id,
		Code:			data.code,
		Name:			data.name
	}, delegator );
}

function Layout_Insert( data, callback, delegator )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'Layout_Insert',
	{
		Code:			data.code,
		Name:			data.name
	}, delegator );
}

function Layout_Delete( id, callback, delegator )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'Layout_Delete',
	{
		ID: id
	}, delegator );
}

function Layout_Duplicate( layout_id, code, name, callback )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'Layout_Duplicate',
	{
		Layout_ID:	layout_id,
		Code: 		code,
		Name: 		name
	});
}

function Layouts_Delete_Cache( callback )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'LayoutCache_Delete' );
}

// Component Functions

function ComponentList_Load_Query( filter, sort, offset, count, callback, delegator )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'ComponentList_Load_Query',
	{
		Filter:			filter,
		Sort:			sort,
		Offset:			offset,
		Count:			count
	}, delegator );
}

function Component_Insert( data, callback, delegator )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'Component_Insert',
	{
		Code:			data.code,
		Name:			data.name,
		Descrip:		data.descrip,
		Image:			data.image,
		Allow_Children:	data.alw_chldrn
	}, delegator );
}

function Component_Update( data, callback, delegator )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'Component_Update',
	{
		ID:				data.id,
		Code:			data.code,
		Name:			data.name,
		Descrip:		data.descrip,
		Image:			data.image,
		Allow_Children:	data.alw_chldrn
	}, delegator );
}

function Component_Delete( id, callback, delegator )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'Component_Delete',
	{
		ID: id
	}, delegator );
}

function Component_DisplayOrder_Update( fieldlist, callback, delegator )
{
	return AJAX_Call_Module_FieldList( callback,
									   'admin',
									   'TGCOMPONENTS',
									   'Components_DisplayOrder_Update',
									   '',
									   fieldlist,
									   delegator );
}

// ComponentAttribute Functions

function ComponentAttributes_Load_Query( cmpnt_id, filter, sort, offset, count, callback, delegator )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'ComponentAttributes_Load_Query',
	{
		Filter:			filter,
		Sort:			sort,
		Offset:			offset,
		Count:			count,
		Component_ID:	cmpnt_id
	}, delegator );
}

function ComponentAttribute_Insert( data, callback, delegator )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'ComponentAttribute_Insert',
	{
		Component_ID:	data.cmpnt_id,
		Code:			data.code,
		Prompt:			data.prompt,
		Type:			data.type,
		Required:		data.required
	}, delegator );
}

function ComponentAttribute_Update( data, callback, delegator )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'ComponentAttribute_Update',
	{
		ID:				data.id,
		Component_ID:	data.cmpnt_id,
		Code:			data.code,
		Prompt:			data.prompt,
		Type:			data.type,
		Required:		data.required
	}, delegator );
}

function ComponentAttribute_Delete( id, callback, delegator )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'ComponentAttribute_Delete',
	{
		ID: id
	}, delegator );
}

function ComponentAttributes_DisplayOrder_Update( cmpnt_id, fieldlist, callback, delegator )
{
	return AJAX_Call_Module_FieldList( callback,
									   'admin',
									   'TGCOMPONENTS',
									   'ComponentAttributes_DisplayOrder_Update',
									   'Component_ID=' + encodeURIComponent( cmpnt_id ),
									   fieldlist,
									   delegator );
}

function ComponentOption_Insert( parent_data, data, callback, delegator )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'ComponentOption_Insert',
	{
		Attribute_ID:	parent_data.id,
		Prompt:			data.prompt
	}, delegator );
}

function ComponentOption_Update( parent_data, data, callback, delegator )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'ComponentOption_Update',
	{
		ID:				data.id,
		Attribute_ID:	parent_data.id,
		Prompt:			data.prompt
	}, delegator );
}

function ComponentOption_Delete( id, callback, delegator )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'ComponentOption_Delete',
	{
		ID: id
	}, delegator );
}