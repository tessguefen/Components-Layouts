function Layout_Dialog( layout )
{
	var self = this;

	self.layout	= layout;

	MMDialog.call( this, 'mm9_dialog_layout', null, null );

	self.element_container	= document.getElementById( 'layout_dialog_container' );

	self.button_close_container = document.getElementsByClassName( 'layout_dialog_close_button' )[0];
	self.button_close_container.innerHTML = '';
	self.button_close = new MMButton( self.button_close_container );
	self.button_close.SetText( 'Close' );
	self.button_close.SetImage( 'cancel' );
	self.button_close.SetOnClickHandler( function( e ) { return self.onClick_Close( e ); } );

	self.button_update_container = document.getElementsByClassName( 'layout_dialog_bottom_buttons' )[0];
	self.button_update_container.innerHTML = '';
	self.button_update = new MMButton( self.button_update_container );
	self.button_update.SetClassName( 'layout_dialog_bottom_button' );
	self.button_update.SetText( 'Update' );
	self.button_update.SetOnClickHandler( function( e ) { return self.Save(); } );

	self.layoutHadChanges = 0;

	self.SetFullscreenEnabled( true, true );
}
DeriveFrom( MMDialog, Layout_Dialog );

Layout_Dialog.prototype.onModalShow = function( z_index )
{
	var self = this;

	this.Fullscreen_Start();

	MMDialog.prototype.onModalShow.call( this, z_index );

	initializeLayout( self.layout, self );
}

Layout_Dialog.prototype.onFullscreen_End = function()
{
	if ( this.visible )
	{
		this.Hide();
	}
}

Layout_Dialog.prototype.onESC = function( e )
{
	this.Cancel();
}

Layout_Dialog.prototype.Cancel = function()
{
	return this.DisplayCancelDiscardSaveDialog();
}

Layout_Dialog.prototype.Cancel_LowLevel = function()
{
	this.Fullscreen_End();
}

Layout_Dialog.prototype.onClick_Close = function( e )
{
	this.Cancel();
	eventStopPropagation( e );
}

Layout_Dialog.prototype.DisplayCancelDiscardSaveDialog = function()
{
	var self = this;
	var dialog, button_save, button_cancel, button_discard;

	if ( self.layoutHadChanges == 0 ) return self.Cancel_LowLevel();

	dialog 			= new ActionDialog();
	dialog.onESC	= function( e ) { self.Cancel_LowLevel(); };
	dialog.onEnter	= function( e ) { self.button_save.SimulateClick(); };

	self. button_cancel		= dialog.Button_Add_Left( 'Cancel',		'', '', 'neutral',	function() { ; } );
	self. button_discard	= dialog.Button_Add_Right( 'Discard',	'', '', 'negative',	function() { self.Cancel_LowLevel(); } );
	self. button_save		= dialog.Button_Add_Right( 'Save',		'', '', '',			function() { self.Save(); } );

	dialog.SetTitle( 'Save changes?' );
	dialog.SetMessage( 'Your changes will be lost if you don\'t save them.' );
	dialog.Show();
}

Layout_Dialog.prototype.DisplayErrorsDialog = function( duplicates, invalid_codes )
{
	var self = this;
	var dialog2, button_save, button_cancel, button_discard;

	dialog2 			= new ActionDialog();
	dialog2.onESC	= function() { ; }
	dialog2.onEnter	= function() { ; }

	self. button_save		= dialog2.Button_Add_Right( 'Go Back to Review', '', '', '', function() { ; } );

	var msg_span = document.createElement( 'span' );
	msg_span.innerHTML = 

	dialog2.SetTitle( 'Errors!' );

	if ( duplicates.length && invalid_codes.length ) {
		msg_span.innerHTML = "You have some duplicate and invalid component codes! Please review and make sure they are all unique and valid.<br> The following codes are duplicates:<br><strong>" + duplicates.join( ', ') + "</strong><br><br>The following codes are invalid:<br><strong>" + invalid_codes.join( ', ') + "</strong>";
	} else if ( duplicates.length ) {
		msg_span.innerHTML = "You have some duplicate component codes! Please review and make sure they are all unique.<br>The following codes are duplicates:<br><strong>" + duplicates.join( ', ') + "</strong>";
	} else {
		msg_span.innerHTML = "You have some invalid component codes! Please review and make sure they are all valid.<br>The following codes are invalid:<br><strong>" + invalid_codes.join( ', ') + "</strong>";
	}
	dialog2.SetMessage( msg_span );

	dialog2.Show();
}