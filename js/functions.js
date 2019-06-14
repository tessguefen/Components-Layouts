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
									   'cmpnt_id=' + encodeURIComponent( cmpnt_id ),
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
	{
	return AJAX_Call_Module_JSON( callback, 'admin', 'TGCOMPONENTS', 'ComponentOption_Delete',
	{
		ID: id
	}, delegator );
}


function ComponentAttributes_Batchlist_Option_Function( parentlist, fieldlist, _function, callback, delegator )
{ 
	return AJAX_Call_Module_FieldList( callback,
									   'admin',
									   'TGCOMPONENTS',
									   _function,
									   'Attribute_Id=' + encodeURIComponent( parentlist.id ),
									   fieldlist,
									   delegator );
}
