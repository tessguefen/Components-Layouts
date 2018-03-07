# Components

## Keys

- TGComponents
- TGComponent_Attrs
- TGComponent_Attrs_Disp_Order
- TGComponents_Options
- TGComponents_Options_Disp_Order
- TGLayouts
- TGLayouts_Components
- TGLayouts_Disp_Order

---

## Table Structure

**Components**

**COLUMN NAME**|**TYPE**|**REFERENCE**|**NOTES**
-----|-----|-----|-----
id|Number| |StoreKey: TGComponents
code|Char(255)| | 
name|Char(255)| | 
descrip|Char(255)| | 
image|Char(255)| | 
children|Bool| |Can haz childrens?

---

**Component_Attrs**

**COLUMN NAME**|**TYPE**|**REFERENCE**|**NOTES**
-----|-----|-----|-----
id|Number| |StoreKey: TGComponent_Attrs
component_id|Number|Components.id| 
code|Char(255)| | 
prompt|Char(255)| | 
type|Char(255)| | 
required|Bool| | 
disp_order|Number| |StoreKey: TGComponent_Attrs_Disp_Order

---

**TGComponent_Options**

**COLUMN NAME**|**TYPE**|**REFERENCE**|**NOTES**
-----|-----|-----|-----
id|Number| |StoreKey: component_attrs
attr_id|Number|Component_Attrs.id| 
prompt|Char(255)| | 
disp_order|Number| |StoreKey: TGComponents_Options_Disp_Order

---

**Layouts**

**COLUMN NAME**|**TYPE**|**REFERENCE**|**NOTES**
-----|-----|-----|-----
id|Number| |StoreKey: TGLayouts
code|Char(255)| | 
name|Char(255)| | 

---

**Layouts_Components**

**COLUMN NAME**|**TYPE**|**REFERENCE**|**NOTES**
-----|-----|-----|-----
id|Number| |StoreKey: TGLayouts_Components
layout_id|Number|Layouts.id| 
component_id|Number|Components.id| 
parent|Number|Layouts_Components.id or 0| 
active|Bool| | 
disp_order|Number| |StoreKey: TGLayouts_Disp_Order

---

**Layouts_Values**

**COLUMN NAME**|**TYPE**|**REFERENCE**
-----|-----|-----
layouts_components_id|Number|Layouts_Components.id
attr_id|Number|Component_Attrs.id
value|Memo| 

---

**Components_Cache**

**COLUMN NAME**|**TYPE**|**REFERENCE**|**NOTES**
-----|-----|-----|-----
layouts_components_id|Number|Layouts_Components.id| 
value|Memo| |structure of set for use at runtime

---

## Ideal Situation

```
l.settings:landing_page:components[1]:id
l.settings:landing_page:components[1]:code
l.settings:landing_page:components[1]:name
l.settings:landing_page:components[1]:attributes:image
l.settings:landing_page:components[1]:attributes:heading_text
l.settings:landing_page:components[1]:attributes:link
l.settings:landing_page:components[1]:children_count
l.settings:landing_page:components[1]:children[1]:id
l.settings:landing_page:components[1]:children[1]:code
l.settings:landing_page:components[1]:children[1]:name
l.settings:landing_page:components[1]:children[1]:attributes:button_text
l.settings:landing_page:components[1]:children[1]:attributes:heading_text
l.settings:landing_page:components[1]:children[1]:attributes:link
```

---

## Attribute Types

- Dropdown
- Radio
- Checkbox
- Textfield
- Textarea
- Image Upload
- Category (supply ID)
- Product (supply ID)
- Page (necessary???)