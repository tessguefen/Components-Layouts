# Components

*Current Version 1.014*

## Features

- Components
	- Add a **Code**, **Name**, Description, Image, and **Allow Nested Components**
	- Add specific attributes/ options for each component.
		- **Code**, **Prompt**, **Type**, **Required**
		- [Types](#attribute-types)
		- Editable Display Order
- Layouts
	- Add a **Code**, **Name**
	- Selecting a layout will give you the option to Duplicate it (you will enter a new code/name).
	- Add Components, Remove Components, Update Components
	- Drag & Drop UI to quickly re-arrange components
	- Image Preview for components (if there is an image set)
	- Image Preview for component options (image type only)
	- Product/ Category/ Page Batchlist Popups (when allowed for attribute types: product, category, link)
	- Update button to save all changes (does not save on the fly)
	- Internal Caching to help save load time!
	- Added Scheduling with **Not Valid Before** and **Not Valid After** fields
- Data Management
	- Import via XML Provisioning
	- Export
		- Export Components (All)
		- Export Layouts (All or select one layout)


## Attribute Types

- Dropdown
- Radio
- Checkbox
- Textfield
- Textarea
- Image Upload
- Category (supply ID)
- Product (supply ID)
- Link (Includes Product, Category, Page, URL & None )
- Image Type
- Date/Time Picker
- Multi-Text
	- To Update via XML, Pipe Seperated.
	- To update via Admin, Line Breaks are used to seperate.
	- `:value` will return an array.

	
## Items

```xml
<mvt:item name="tgcomponent" param="Layout_Load_Code( 'homepage_slider', l.settings:output )"/>
```


## XML Provisioning

```xml
<Module code="TGCOMPONENTS" feature="util">
	<Layout_Add>
		<Code>Your_Code_Here</Code>
		<Name>Your Name Here</Name>
	</Layout_Add>

	<Layout_Update code="Your_Code_Here">
		<Code>Your_New_Code_Here</Code>
		<Name>Your New Name Here</Name>
	</Layout_Update>

	<Layout_Delete code="Your_Code_Here" />
	
	<Component_Add>
		<Code>Your_Code_Here</Code>
		<Name>Your Name Here</Name>
		<Descrip>Your Description</Descrip>
		<Image>graphics/00000001/leia.png</Image>
		<Allow_Children>1</Allow_Children>
	</Component_Add>

	<Component_Update code="My_Old_Code_Here">
		<Code>Your_Code_Here</Code>
		<Name>Your Name Here</Name>
		<Descrip>Your Description</Descrip>
		<Image>graphics/00000001/leia.png</Image>
		<Allow_Children>1</Allow_Children>
	</Component_Update>

	<Component_Delete code="My_Code_Here" />

	<ComponentAttribute_Add component="My_Component">
		<Code>MyAttribute</Code>
		<Prompt>My Prompt</Prompt>
		<Type>image</Type>
		<Required>1</Required>
	</ComponentAttribute_Add>

	<ComponentAttribute_Update component="My_Component" code="Attribute_Code">
		<Code>MyAttribute</Code>
		<Prompt>My Prompt</Prompt>
		<Type>image</Type>
		<Required>1</Required>
	</ComponentAttribute_Update>

	<ComponentAttribute_Delete component="My_Component" code="Attribute_Code" />

	<ComponentAttributeOption_Add component="My_Component" code="Attribute_Code">
		<Prompt>My Prompt</Prompt>
	</ComponentAttributeOption_Add>

	<LayoutComponent_Add layout="My_Layout_Code" component="Component_Code">
		<Name>Name</Name>
		<Code>MyCode</Code>
		<Active>1</Active>
		<Parent>Parent_Component_Code</Parent>
		<Date_Start>
			<Day>01</Day>
			<Month>02</Month>
			<Year>2019</Year>
			<Hour>11</Hour>
			<Minute>30</Minute>
			<Second>00</Second>
		</Date_Start>
		<Date_End>
			<Day>01</Day>
			<Month>02</Month>
			<Year>2019</Year>
			<Hour>12</Hour>
			<Minute>00</Minute>
			<Second>00</Second>
		</Date_End>
		<Attributes>
			<Attribute code="MyAttribute">
				<Value>My Value Here</Value>
			</Attribute>
			<Attribute code="MyAttributeLink">
				<LinkType>Product</LinkType>
				<Value>My Value Here</Value>
			</Attribute>
			<Attribute code="Some_DateTime">
				<Value>
					<Day>01</Day>
					<Month>02</Month>
					<Year>2019</Year>
					<Hour>11</Hour>
					<Minute>30</Minute>
					<Second>00</Second>
				</Value>
			</Attribute>
		</Attributes>
	</LayoutComponent_Add>
</Module>
```

## Random Screenshots

![Admin UI](https://puu.sh/Cdege/c62bb923a8.png)
![Admin UI 2](http://puu.sh/CdehI/f0f7f1f4ee.png)
![Edit Popup](http://puu.sh/Cdek3/ea07237c3c.png)
![Add New Popup - With All Fields](http://puu.sh/Cdejg/20525978bb.png)
![Duplicate Layouts Feature](http://puu.sh/Cdelt/b6b53e5f62.png)
![But Wait! There's More](http://puu.sh/CdekT/a04b50493a.png)
---


## Example

```
[1]:active=1
[1]:attributes:title:value=Featured+Slider+1
[1]:children[1]:active=1
[1]:children[1]:attributes:alt_text:value=Slide+1+%3A%29
[1]:children[1]:attributes:image:value=graphics%2F00000001%2F21356803_085_m1.jpg
[1]:children[1]:attributes:link:link:type=G
[1]:children[1]:attributes:link:link:value=ABUS
[1]:children[1]:attributes:link:value=http%3A%2F%2Ftguefen.mivamerchantdev.com%2Fabout-us.html
[1]:children[1]:component:allow_children=0
[1]:children[1]:component:code=slide
[1]:children[1]:component:id=2
[1]:children[1]:component:name=Slide
[1]:children[1]:component_id=2
[1]:children[1]:disp_order=1
[1]:children[1]:id=2
[1]:children[1]:layout_id=1
[1]:children[1]:name=Slide+1
[1]:children[1]:parent=6
[1]:children[2]:active=1
[1]:children[2]:attributes:alt_text:value=Slide+2+%3A%29
[1]:children[2]:attributes:image:value=graphics%2F00000001%2F33336215_069_b.jpg
[1]:children[2]:attributes:link:link:type=C
[1]:children[2]:attributes:link:link:value=nes
[1]:children[2]:attributes:link:value=http%3A%2F%2Ftguefen.mivamerchantdev.com%2Fntsdfhsdfklhjs.html
[1]:children[2]:component:allow_children=0
[1]:children[2]:component:code=slide
[1]:children[2]:component:id=2
[1]:children[2]:component:name=Slide
[1]:children[2]:component_id=2
[1]:children[2]:disp_order=2
[1]:children[2]:id=3
[1]:children[2]:layout_id=1
[1]:children[2]:name=Slide+2
[1]:children[2]:parent=6
[1]:children[3]:active=1
[1]:children[3]:attributes:alt_text:value=Slide+3+%3A%29
[1]:children[3]:attributes:image:value=graphics%2F00000001%2F33336215_079_b.jpg
[1]:children[3]:attributes:link:link:type=P
[1]:children[3]:attributes:link:link:value=Default_Variant
[1]:children[3]:attributes:link:value=http%3A%2F%2Ftguefen.mivamerchantdev.com%2FDefault-Variant-Example
[1]:children[3]:component:allow_children=0
[1]:children[3]:component:code=slide
[1]:children[3]:component:id=2
[1]:children[3]:component:name=Slide
[1]:children[3]:component_id=2
[1]:children[3]:disp_order=3
[1]:children[3]:id=4
[1]:children[3]:layout_id=1
[1]:children[3]:name=Slide+3
[1]:children[3]:parent=6
[1]:children_count=3
[1]:component:allow_children=1
[1]:component:code=slider_wrap
[1]:component:id=1
[1]:component:name=Slider+Wrap
[1]:component_id=1
[1]:disp_order=1
[1]:id=6
[1]:layout_id=1
[1]:name=Featured+Slider+1
[1]:parent=0
[2]:active=1
[2]:attributes:title:value=Featured+Slider+2
[2]:children[1]:active=1
[2]:children[1]:attributes:alt_text:value=test
[2]:children[1]:attributes:image:value=graphics%2F00000001%2F32842809_004_a.jpg
[2]:children[1]:component:allow_children=0
[2]:children[1]:component:code=slide
[2]:children[1]:component:id=2
[2]:children[1]:component:name=Slide
[2]:children[1]:component_id=2
[2]:children[1]:disp_order=1
[2]:children[1]:id=7
[2]:children[1]:layout_id=1
[2]:children[1]:name=Slide+4
[2]:children[1]:parent=1
[2]:children[2]:active=1
[2]:children[2]:attributes:alt_text:value=slide+8
[2]:children[2]:attributes:image:value=graphics%2F00000001%2F33336215_095_b.jpg
[2]:children[2]:component:allow_children=0
[2]:children[2]:component:code=slide
[2]:children[2]:component:id=2
[2]:children[2]:component:name=Slide
[2]:children[2]:component_id=2
[2]:children[2]:disp_order=2
[2]:children[2]:id=9
[2]:children[2]:layout_id=1
[2]:children[2]:name=Slide+5
[2]:children[2]:parent=1
[2]:children[3]:active=1
[2]:children[3]:attributes:alt_text:value=Slide+6
[2]:children[3]:attributes:image:value=graphics%2F00000001%2Flogo.png
[2]:children[3]:attributes:link:link:type=P
[2]:children[3]:attributes:link:link:value=My_Product
[2]:children[3]:attributes:link:value=http%3A%2F%2Ftguefen.mivamerchantdev.com%2FMy-Product-Brandon-Hello-Whatsup
[2]:children[3]:component:allow_children=0
[2]:children[3]:component:code=slide
[2]:children[3]:component:id=2
[2]:children[3]:component:name=Slide
[2]:children[3]:component_id=2
[2]:children[3]:disp_order=3
[2]:children[3]:id=8
[2]:children[3]:layout_id=1
[2]:children[3]:name=Slide+6
[2]:children[3]:parent=1
[2]:children_count=3
[2]:component:allow_children=1
[2]:component:code=slider_wrap
[2]:component:id=1
[2]:component:name=Slider+Wrap
[2]:component_id=1
[2]:disp_order=2
[2]:id=1
[2]:layout_id=1
[2]:name=Featured+Slider+2
[2]:parent=0
```

## Experimental Recusrive Component Rendering

### Caller
```xml
<mvt:assign name="l.settings:layout_code" value="'homepage'" />
<mvt:capture variable="l.null">
	<mvt:item name="readytheme" param="contentsection( 'load_layout' )" />
</mvt:capture>
<mvt:eval expr="l.settings:final_output" />
```

### ReadyTheme > Content Section > `load_layout`
```xml
<mvt:assign name="l.settings:final_output" 	value="''" />

<mvt:if expr="NOT len_var( l.settings:layout_code )">
	<mvt:exit />
</mvt:if>

<mvt:assign name="l.settings:layout" value="''" />
<mvt:item name="tgcomponent" param="Layout_Load_Code( l.settings:layout_code, l.settings:layout )"/>

<mvt:if expr="ISNULL l.settings:layout">
	<mvt:exit />
</mvt:if>

<mvt:if expr="NOT l.settings:layout_components:templ_id">
	<mvt:item name="readytheme" param="Load_ContentSection( 'layout_components', l.all_settings:layout_components )" />
</mvt:if>

<mvt:if expr="NOT l.settings:layout_components:templ_id">
	<mvt:exit />
</mvt:if>

<mvt:do file="g.Module_Feature_TUI_DB" name="l.loaded" value="ManagedTemplate_Load_ID( l.settings:layout_components:templ_id, l.settings:layout_components_rt )" />

<mvt:assign name="l.settings:layout_component:children" value="l.settings:layout" />
<mvt:assign name="l.settings:layout_component:children_count" value="miva_array_elements( l.settings:layout )" />

<mvt:assign name="g.Current_Component_Position" value="0" />

<mvt:capture variable="l.settings:final_output">
	<mvt:do file="g.Store_Template_Path $ l.settings:layout_components_rt:filename" name="l.success" value="Template_Render( l.null, l.settings )" />
</mvt:capture>

<mvt:assign name="l.settings:layout_code" value="''" />
```

### ReadyTheme > Content Section > `layout_components`
```xml
<mvt:if expr="NOT l.settings:layout_component:children">
	<mvt:exit />
</mvt:if>

<mvt:comment>
	To render children, use the following:

	<mvt:assign name="l.current_component" value="l.settings:current_component" />
	<mvt:assign name="l.layout_component" value="l.settings:layout_component" />
	<mvt:assign name="l.settings:layout_component" value="l.settings:current_component" />
	<mvt:do file="g.Store_Template_Path $ l.settings:layout_components_rt:filename" name="l.success" value="Template_Render( l.empty, l.settings )" />
	<mvt:assign name="l.settings:current_component" value="l.current_component" />
	<mvt:assign name="l.settings:layout_component" value="l.layout_component" />
</mvt:comment>

<mvt:foreach iterator="current_component" array="layout_component:children">
	<mvt:assign name="g.Current_Component_Position" value="g.Current_Component_Position + 1" />
	<mvt:if expr="l.settings:current_component:component:code EQ 'some_component'">
		<mvt:comment>
			name		Title
			children	children of section
		</mvt:comment>
		<mvt:assign name="l.settings:current_component:extra_css" value="''" />
		<mvt:if expr="l.settings:current_component:attributes:disable_on_mobile:value EQ 1">
			<mvt:assign name="l.settings:current_component:extra_css" value="' medium-show hide'" />
		</mvt:if>
		<div class="component_some_component&mvt:current_component:extra_css;">
			<div class="row">
				<div class="column whole">
					<h2 class="some_component--title bold heading-font align-center">&mvt:current_component:name;</h2>
				</div>
			</div>
			<div class="clearfix">
				<mvt:assign name="l.current_component" value="l.settings:current_component" />
				<mvt:assign name="l.layout_component" value="l.settings:layout_component" />
				<mvt:assign name="l.settings:layout_component" value="l.settings:current_component" />
				<mvt:do file="g.Store_Template_Path $ l.settings:layout_components_rt:filename" name="l.success" value="Template_Render( l.empty, l.settings )" />
				<mvt:assign name="l.settings:current_component" value="l.current_component" />
				<mvt:assign name="l.settings:layout_component" value="l.layout_component" />
			</div>
		</div>
	<mvt:elseif expr="l.settings:current_component:component:code EQ 'module_x'">
		<mvt:comment>
		|
		|	Product Listing Set Up
		|
		</mvt:comment>
		<mvt:assign name="l.width" value="400" />
		<mvt:assign name="l.height" value="500" />

		<mvt:if expr="NOT l.settings:current_component:attributes:imagetype:value">
			<mvt:do file="g.Module_Library_DB" name="l.success" value="ImageType_Load_Code( 'Default', l.default_imagetype )" />
			<mvt:assign name="l.settings:current_component:attributes:imagetype:value" value="l.default_imagetype:id" />
		</mvt:if>

		<mvt:assign name="l.hash" value="crypto_md5( l.settings:current_component:id $ l.settings:current_component:attributes:category:category:id )" />

		<mvt:if expr="NOT g.Transients_Off">
			<mvt:do file="g.Module_Root $ '/modules/util/transients.mvc'" name="l.products" value="Get_Transient( l.hash )" />
		</mvt:if>

		<mvt:if expr="NOT ISNULL l.products">
			<!-- Cached -->
			<mvt:assign name="l.settings:current_component:products" value="miva_array_deserialize( l.products )" />
		<mvt:else>
			<mvt:assign name="l.products" value="''" />

			<mvt:do file="g.Module_Library_DB" name="l.success" value="Runtime_ProductList_Load_Offset_Category_Sort( l.settings:current_component:attributes:category:category:id, 0, 8, 'disp_order_desc', l.nextoffset, l.settings:current_component:products )" />
			<mvt:foreach iterator="product" array="current_component:products">
				<mvt:assign name="l.settings:product:base_price" value="l.settings:product:price" />
			</mvt:foreach>
			<mvt:do name="l.void" file="g.Module_Feature_TUI_UT" value="CommonComponentFields_Initialize_Product_Discounts_Runtime( l.settings:current_component:products, miva_array_elements(l.settings:current_component:products))" />
			<mvt:foreach iterator="product" array="current_component:products">

				<mvt:assign name="l.productimage" value="NULL" />
				<mvt:assign name="l.temp" value="NULL" />
				<mvt:assign name="l.load_cropped" value="NULL" />

				<mvt:comment>
					Set-up
						Load in :link
						Load in `:imagetypes:Default` image type.
				</mvt:comment>
				<mvt:do file="g.Module_Feature_URI_UT" name="l.settings:product:link" value="Store_Product_URL( l.settings:product, l.flags )" />
				<mvt:item name="customfields" param="Read_Product_ID( l.settings:product:id, 'brand', l.settings:product:customfield_values:customfields:brand )" />

				<mvt:do file="g.Module_Library_DB" name="l.success" value="ProductImage_Load_Type( l.settings:product:id, l.settings:current_component:attributes:imagetype:value, l.temp:productimage )" />
				<mvt:if expr="( NOT l.temp:productimage:image_id ) AND ( l.default_imagetype:id NE l.settings:current_component:attributes:imagetype:value )">
					<mvt:do file="g.Module_Library_DB" name="l.success" value="ProductImage_Load_Type( l.settings:product:id, l.default_imagetype:id, l.temp:productimage )" />
				</mvt:if>
				<mvt:do file="g.Module_Library_DB" name="l.load_cropped" value="GeneratedImage_Load_Dimensions( l.temp:productimage:image_id, l.width, l.height, l.temp:cropped_image )" />

				<mvt:if expr="NOT l.load_cropped">
					<mvt:do file="g.Module_Library_DB" name="l.success" value="Image_Load_ID( l.temp:productimage:image_id, l.temp:imagedata  )" />
					<mvt:do file="g.Module_Library_DB" name="l.success" value="Image_Load_File( l.temp:imagedata:image, l.temp:product_image )" />
					<mvt:do file="g.Module_Library_DB" name="l.success" value="GeneratedImage_FindOrInsert_Image_Dimensions( l.temp:product_image, l.width, l.height, l.temp:cropped_image )" />
				</mvt:if>

				<mvt:assign name="l.settings:product:imagetypes:Default" value="l.temp:cropped_image:image" />

				<mvt:if expr="NOT ISNULL l.settings:product:imagetypes:Default">
					<mvt:assign name="l.settings:product:src" value="l.settings:product:imagetypes:Default" />
				<mvt:else>
					<mvt:assign name="l.settings:product:src" value="g.theme_path $ '/images/img_no_thumb.jpg'" />
				</mvt:if>

				<mvt:do file="g.Module_Store_Module_Currency" name="l.settings:product:formatted_base_price" value="CurrencyModule_AddFormatting( g.Store:currncy_mod, l.settings:product:base_price  )" />
				<mvt:do file="g.Module_Store_Module_Currency" name="l.settings:product:formatted_price" value="CurrencyModule_AddFormatting( g.Store:currncy_mod, l.settings:product:price  )" />
			</mvt:foreach>

			<mvt:if expr="NOT g.Transients_Off">
				<mvt:do file="g.Module_Root $ '/modules/util/transients.mvc'" name="l.set_transient" value="Set_Transient( l.hash, miva_array_serialize( l.settings:current_component:products ), 60*60*12)" />
			</mvt:if>
		</mvt:if>

		<mvt:assign name="l.settings:current_component:extra_css" value="''" />
		<mvt:if expr="l.settings:current_component:attributes:disable_on_mobile:value EQ 1">
			<mvt:assign name="l.settings:current_component:extra_css" value="' medium-show hide'" />
		</mvt:if>

		<mvt:assign name="l.counter" value="0" />
		<div class="column whole component_module_x slider-fade-inactive&mvt:current_component:extra_css;">
			<mvt:foreach iterator="product" array="current_component:products">
				<mvt:assign name="l.counter" value="l.counter + 1" />
				<div class="productslider-component-2 align-center column x-large-one-third">
					<div class="productslider-component-1__inner">

						<div class="productslider-component-1__image flex ai-center jc-center align-center">
							<a href="&mvt:product:link;">
								<mvt:if expr="g.Current_Component_Position GT 2 AND l.counter LE 4">
									<img data-src="&mvte:product:src;" alt="&mvte:product:name;" class="lazyload" />
								<mvt:elseif expr="l.counter GT 4">
									<img data-lazy="&mvte:product:src;" alt="&mvte:product:name;" />
								<mvt:else>
									<img src="&mvte:product:src;" alt="&mvte:product:name;" />
								</mvt:if>
							</a>
						</div>

						<mvt:if expr="l.settings:product:customfield_values:customfields:brand">
							<div class="productslider-component-1__brand medium large-align-left align-center">
								&mvt:product:customfield_values:customfields:brand;
							</div>
						</mvt:if>

						<h2 class="productslider-component-1__name bold large-align-left align-center"><a href="&mvt:product:link;" class="no-decoration">&mvt:product:name;</a></h2>

						<div class="productslider-component-1__pricing medium large-align-left align-center">
							<mvt:if expr="l.settings:product:base_price GT l.settings:product:price">
								<span class="productslider-component-1__base-price">&mvt:product:formatted_base_price;</span>
							</mvt:if>
							<span class="productslider-component-1__price">&mvt:product:formatted_price;</span>
						</div>
					</div>
				</div>
			</mvt:foreach>
		</div>
	</mvt:if>
</mvt:foreach>
```

## SQL to grab all image paths.
```mysql
SELECT s01_TGLayouts_Values.value FROM s01_TGLayouts_Values LEFT JOIN s01_TGComponent_Attrs ON s01_TGComponent_Attrs.id = s01_TGLayouts_Values.attr_id WHERE s01_TGComponent_Attrs.type = 'image'
```
