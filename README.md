# Blocks

## Keys

- TGBlocks
- TGBlocks_Attrs
- TGBlocks_Attrs_Disp_Order
- TGBlocks_Options
- TTGBlocks_Options_Disp_Order
- TGBlock_Sets
- TGBlockSets_Block
- TGBlockSets_Disp_Order

---

## Table Structure

**Blocks**

**COLUMN NAME**|**TYPE**|**REFERENCE**|**NOTES**
-----|-----|-----|-----
id|Number| |StoreKey: TGBlocks
code|Char(255)| | 
name|Char(255)| | 
descrip|Char(255)| | 
image|Char(255)| | 
children|Bool| |Can haz childrens?

---

**Block_Attrs**

**COLUMN NAME**|**TYPE**|**REFERENCE**|**NOTES**
-----|-----|-----|-----
id|Number| |StoreKey: TGBlocks_Attrs
block_id|Number|Blocks.id| 
code|Char(255)| | 
prompt|Char(255)| | 
type|Char(255)| | 
required|Bool| | 
disp_order|Number| |StoreKey: TGBlocks_Attrs_Disp_Order

---

**TGBlock_Options**

**COLUMN NAME**|**TYPE**|**REFERENCE**|**NOTES**
-----|-----|-----|-----
id|Number| |StoreKey: block_attrs
attr_id|Number|Block_Attrs.id| 
prompt|Char(255)| | 
disp_order|Number| |StoreKey: TGBlocks_Options_Disp_Order

---

**Block_Sets**

**COLUMN NAME**|**TYPE**|**REFERENCE**|**NOTES**
-----|-----|-----|-----
id|Number| |StoreKey: TGBlock_Sets
code|Char(255)| | 
name|Char(255)| | 

---

**BlockSets_Blocks**

**COLUMN NAME**|**TYPE**|**REFERENCE**|**NOTES**
-----|-----|-----|-----
id|Number| |StoreKey: TGBlockSets_Block
block_set_id|Number|Block_Sets.id| 
block_id|Number|Blocks.id| 
parent|Number|BlockSets_Blocks.id or 0| 
active|Bool| | 
disp_order|Number| |StoreKey: TGBlockSets_Disp_Order

---

**BlockSets_Values**

**COLUMN NAME**|**TYPE**|**REFERENCE**
-----|-----|-----
blocksets_blocks_id|Number|BlockSets_Blocks.id
attr_id|Number|Block_Attrs.id
value|Memo| 

---

**Blocks_Cache**

**COLUMN NAME**|**TYPE**|**REFERENCE**|**NOTES**
-----|-----|-----|-----
blocksets_blocks_id|Number|BlockSets_Blocks.id| 
value|Memo| |structure of set for use at runtime

---

## Ideal Situation

```
l.settings:landing_page:blocks[1]:id
l.settings:landing_page:blocks[1]:code
l.settings:landing_page:blocks[1]:name
l.settings:landing_page:blocks[1]:attributes:image
l.settings:landing_page:blocks[1]:attributes:heading_text
l.settings:landing_page:blocks[1]:attributes:link
l.settings:landing_page:blocks[1]:children_count
l.settings:landing_page:blocks[1]:children[1]:id
l.settings:landing_page:blocks[1]:children[1]:code
l.settings:landing_page:blocks[1]:children[1]:name
l.settings:landing_page:blocks[1]:children[1]:attributes:button_text
l.settings:landing_page:blocks[1]:children[1]:attributes:heading_text
l.settings:landing_page:blocks[1]:children[1]:attributes:link
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