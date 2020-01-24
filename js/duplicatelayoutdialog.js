function DuplicateLayout_Dialog( layout )
{
	var self = this;

	// Variables
	this.layout				= layout;

	// Controls
	this.dialog				= document.getElementById( 'DuplicateLayout_dialog' );

	this.button_cancel		= document.getElementById( 'DuplicateLayout_dialog_button_cancel' );
	this.button_save		= document.getElementById( 'DuplicateLayout_dialog_button_save' );

	// Inputs
	this.new_code			= document.getElementById( 'DuplicateLayout_New_Code' );
	this.new_name			= document.getElementById( 'DuplicateLayout_New_Name' );

	// Events
	if ( this.button_cancel )	this.button_cancel.onclick	= function() { self.Cancel(); }
	if ( this.button_save )		this.button_save.onclick	= function() { self.Save(); }
}

DuplicateLayout_Dialog.prototype.Show = function()
{
	Modal_Show( this.dialog, this.button_save.onclick, this.button_cancel.onclick );
}

DuplicateLayout_Dialog.prototype.Hide = function()
{
	Modal_Hide();
}

DuplicateLayout_Dialog.prototype.Cancel = function()
{
	this.Hide();
	this.oncancel();
}

DuplicateLayout_Dialog.prototype.Save = function()
{
	var type;
	var self = this;

	if ( this.new_code.value.length == 0 )
	{
		Modal_Alert( 'Please enter a Code.' );
		this.new_code.focus();

		return false;
	}

	if ( this.new_name.value.length == 0 )
	{
		Modal_Alert( 'Please enter a Name.' );
		this.new_name.focus();

		return false;
	}

	Layout_Duplicate( this.layout.id, this.new_code.value, this.new_name.value, function( response ) { self.Save_Callback( response ); } );
}

DuplicateLayout_Dialog.prototype.Save_Callback = function( response )
{
	var self = this;

	this.button_save.value		= 'Add';
	this.button_save.disabled	= false;

	if ( !response.success )
	{
		this.onerror( response.error_message );

		if ( response.error_field == 'Code' )
		{
			this.new_code.focus();
		}

		if ( response.error_field == 'Name' )
		{
			this.new_name.focus();
		}

		return;
	}

	this.new_code.value = '';
	this.new_name.value = '';

	this.Hide();
	this.onsave();
}

DuplicateLayout_Dialog.prototype.onerror	= function( error )	{ Modal_Alert( error ); }
DuplicateLayout_Dialog.prototype.oncancel	= function()		{ ; }
DuplicateLayout_Dialog.prototype.onsave		= function()		{ ; }
DuplicateLayout_Dialog.prototype.ondelete	= function()		{ ; }