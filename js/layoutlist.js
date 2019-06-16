function Layouts_List()
{
	MMBatchList.call( this, 'tgcomponents_layouts' );

	this.Feature_SearchBar_SetPlaceholderText( 'Search Layouts...' );
	this.SetDefaultSort( 'id', '' );

	if ( CanI( 'TGCOMPONENTS', 0, 1, 0, 0 ) )
	{
		this.Feature_Add_Enable( 'Add Layout' );
	}

	if ( CanI( 'TGCOMPONENTS', 0, 0, 1, 0 ) )
	{
		this.Feature_Edit_Enable( 'Edit Layout(s)' );
		this.Feature_RowDoubleClick_Enable();
		this.Feature_Buttons_AddButton_Dynamic_SingleSelect( 'Duplicate Layout', 'Duplicate Template', 'readytheme', this.DuplicateLayout );
	}

	this.Feature_Buttons_AddButton_Dynamic_SingleSelect( 'View/ Edit Layout', 'View/ Edit Layout', 'goto', this.editLayout );

	if ( CanI( 'TGCOMPONENTS', 0, 0, 0, 1 ) )
	{
		this.Feature_Delete_Enable('Delete Layout(s)');
	}

	this.Feature_Buttons_AddButton_Persistent( 'Delete Layout Cache', 'Delete Layout Cache', '', this.DeleteLayoutCache );

	this.processingdialog = new ProcessingDialog();
}

DeriveFrom( MMBatchList, Layouts_List );

Layouts_List.prototype.onLoad = Layouts_Load_Query;

Layouts_List.prototype.onCreateRootColumnList = function()
{
	return [
		new MMBatchList_Column_Name( 'Layout ID', 'id', 'ID')
			.SetAdvancedSearchEnabled( false )
			.SetDisplayInMenu( false )
			.SetDisplayInList( false )
			.SetAdvancedSearchEnabled( false ),
		new MMBatchList_Column_Code( 'Code', 'code', 'Code'),
		new MMBatchList_Column_Name( 'Name', 'name', 'Name')
	];
}

Layouts_List.prototype.onCreate = function()
{
	var record;

	record = new Object();
	record.id = 0;
	record.code = '';
	record.name = '';

	return record;
}

Layouts_List.prototype.onSave = function( item, callback, delegator )
{
	Layout_Update( item.record, callback, delegator );
}

Layouts_List.prototype.onInsert = function( item, callback, delegator )
{
	Layout_Insert( item.record, callback, delegator );
}

Layouts_List.prototype.onDelete = function( item, callback, delegator )
{
	Layout_Delete( item.record.id, callback, delegator );
}

Layouts_List.prototype.editLayout = function( item, e )
{
	var self = this;
	var dialog;

	dialog = new Layout_Dialog( item.record );

	dialog.Save = function() {
		var scope = angular.element(document.getElementById('ComponentsController_ID')).scope();

		scope.$apply(function () {
			scope.saveLayout( function( errors, duplicate_codes, invalid_codes ) {
				if ( !errors ) {
					dialog.Cancel_LowLevel();
					self.Refresh();
				} else {
					dialog.DisplayErrorsDialog( duplicate_codes, invalid_codes );
				}
			});
		});	
	};

	dialog.onDelete	= function() { self.Refresh(); };
	dialog.Show();
}

Layouts_List.prototype.DeleteLayoutCache = function()
{
	var self = this;
	Layouts_Delete_Cache( function( response ) { self.Refresh(); } );
}

Layouts_List.prototype.DuplicateLayout = function( item, e )
{
	var self = this;
	var duplicatelayout;

	duplicatelayout				= new DuplicateLayout_Dialog( item.record );
	duplicatelayout.onsave		= function()
	{
		self.Refresh();
	}

	duplicatelayout.Show();
}