# Components

*Current Version 1.018*

## Features

- Components
	- Add a **Code**, **Name**, Description, Image, and **Allow Nested Components**
	- Add specific attributes/ options for each component.
		- **Code**, **Prompt**, **Type**, **Required**
		- Types: Text Field, Radio Buttons, Drop-down List, Checkbox, Text Area, Image, Product, Category, Link
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
		<Allow_Nest>1</Allow_Nest>
	</Component_Add>

	<Component_Update code="My_Old_Code_Here">
		<Code>Your_Code_Here</Code>
		<Name>Your Name Here</Name>
		<Descrip>Your Description</Descrip>
		<Image>graphics/00000001/leia.png</Image>
		<Allow_Nest>1</Allow_Nest>
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
		<Active>1</Active>
		<Parent>Some Parent</Parent>
		<Parent_Code>Some_Parent_Code</Parent_Code>
		<Date_Start><![CDATA[12/05/2018 21:10:03]]></Date_Start>
		<Date_End><![CDATA[12/29/2018 21:10:05]]></Date_End>
		<Attributes>
			<Attribute code="MyAttribute">
				<Value>My Value Here</Value>
			</Attribute>
			<Attribute code="MyAttributeLink">
				<LinkType>Product</LinkType>
				<Value>My Value Here</Value>
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

```xml
<mvt:if expr="ISNULL l.settings:page:layout_code">
	<mvt:exit />
</mvt:if>

<mvt:assign name="l.settings:layout" value="''" />
<mvt:item name="tgcomponent" param="Layout_Load_Code( l.settings:page:layout_code, l.settings:layout )"/>

<mvt:if expr="ISNULL l.settings:layout">
	<mvt:exit />
</mvt:if>

<mvt:do file="g.Module_Library_Utilities" name="l.success" value="QuickSortArray( l.settings:layout, ':disp_order', -1 )" />

<mvt:assign name="l.components"				value="l.settings:layout" />
<mvt:assign name="l.data"					value="''" />
<mvt:assign name="l.components_count"		value="miva_array_elements( l.components )" />
<mvt:assign name="l.while_pos"				value="1" />
<mvt:assign name="l.settings:final_output" 	value="''" />
<mvt:assign name="l.settings:unique_id" 	value="'tgcl-parent'" />

<mvt:while expr="( l.while_pos LE l.components_count )">

	<mvt:assign name="l.settings:current_item" value="miva_variable_value( 'l.components[' $ l.while_pos $ ']' )" />

	<mvt:if expr="l.settings:current_item:component:code">
		<mvt:capture variable="l.data">
			<mvt:if expr="l.settings:current_item:component:code EQ 'shadows_hero'">
				<section class="o-layout">
					<div class="o-layout__item">
						<mvt:if expr="l.settings:current_item:attributes:link:value">
							<a class="x-hero" href="&mvte:current_item:attributes:link:value";">
								<img src="&mvte:current_item:attributes:image:value;" alt="&mvte:current_item:attributes:alt:value;">
							</a>
						<mvt:else>
							<span class="x-hero">
								<img src="&mvte:current_item:attributes:image:value;" alt="&mvte:current_item:attributes:alt:value;">
							</span>
						</mvt:if>
					</div>
				</section>
				<br>
			<mvt:elseif expr="l.settings:current_item:component:code EQ 'shadows_text'">
				<section class="o-layout t-storefront-about">
					<div class="o-layout__item u-text-center">
						<br>
						<h3 class="c-heading-charlie c-heading--keyline u-text-bold u-text-uppercase">
							<mvt:if expr="l.settings:current_item:attributes:subtitle:value">
								<span class="c-heading--subheading u-color-gray-30">&mvt:current_item:attributes:subtitle:value;</span>
								<mvt:if expr="l.settings:current_item:attributes:title:value"><br></mvt:if>
							</mvt:if>
							&mvt:current_item:attributes:title:value;
						</h3>
						<p>
							<span class="u-inline-block u-text-constrain t-storefront-about__brief">&mvt:current_item:attributes:text:value;</span>
						</p>
						<br>
					</div>
				</section>
				<br>
			<mvt:elseif expr="l.settings:current_item:component:code EQ 'shadows_large_promo'">
				<section class="o-layout">
					<div class="o-layout__item">
						<mvt:if expr="l.settings:current_item:attributes:link:value">
							<a href="&mvte:current_item:attributes:link:value";">
								<img src="&mvte:current_item:attributes:image:value;" alt="&mvte:current_item:attributes:alt:value;">
							</a>
						<mvt:else>
							<img src="&mvte:current_item:attributes:image:value;" alt="&mvte:current_item:attributes:alt:value;">
						</mvt:if>
					</div>
				</section>
				<br>
			<mvt:elseif expr="l.settings:current_item:component:code EQ 'shadows_small_promo_wrap'">
				<mvt:if expr="l.settings:current_item:children_count GT 0">
					<section class="o-layout u-grids-1 u-grids-2--m">
						<!--[&mvt:unique_id;:&mvt:current_item:id;]-->
					</section>
				</mvt:if>
			<mvt:elseif expr="l.settings:current_item:component:code EQ 'shadows_small_promo'">
				<p class="o-layout__item">
					<mvt:if expr="l.settings:current_item:attributes:link:value">
						<a href="&mvte:current_item:attributes:link:value";">
							<img src="&mvte:current_item:attributes:image:value;" alt="&mvte:current_item:attributes:alt:value;">
						</a>
					<mvt:else>
						<img src="&mvte:current_item:attributes:image:value;" alt="&mvte:current_item:attributes:alt:value;">
					</mvt:if>
				</p>
			</mvt:if>
		</mvt:capture>
	</mvt:if>

	<mvt:if expr="l.settings:current_item:children_count GT 0">
		<mvt:do file="g.Module_Library_Utilities" name="l.success" value="QuickSortArray( l.settings:current_item:children, ':disp_order', -1 )" />
		<mvt:assign name="l.components_count" value="miva_array_merge( l.settings:current_item:children, 1, l.settings:current_item:children_count, l.components, -1 )" />
	</mvt:if>
	
	<mvt:assign name="l.find_me" value="'<!--[' $ l.settings:unique_id $ ':' $ l.settings:current_item:parent $ ']-->'" />
	<mvt:assign name="l.index" value="indexof( l.find_me, l.settings:final_output, 1 )" />
	<mvt:if expr="l.index GT 0">
		<mvt:assign name="l.index_findme_length" value="l.index + len_var( l.find_me )" />
		<mvt:assign name="l.settings:final_output" value="substring_var( l.settings:final_output, 1, l.index_findme_length ) $ l.data $ substring_var( l.settings:final_output, l.index_findme_length, len_var( l.settings:final_output ) )" />
	<mvt:else>
		<mvt:assign name="l.settings:final_output" value="l.data $ l.settings:final_output" />
	</mvt:if>

	<mvt:assign name="l.while_pos" value="l.while_pos + 1" />
</mvt:while>
```

## SQL to grab all image paths.
```mysql
SELECT s01_TGLayouts_Values.value FROM s01_TGLayouts_Values LEFT JOIN s01_TGComponent_Attrs ON s01_TGComponent_Attrs.id = s01_TGLayouts_Values.attr_id WHERE s01_TGComponent_Attrs.type = 'image'
```
