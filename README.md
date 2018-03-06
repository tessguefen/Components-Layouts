# Blocks

##Keys

- blocks
- block_attrs
- block_sets
- blocksets_blocks
- blocksets_disp_order

---

## Table Structure

**Blocks**

**COLUMN NAME**|**TYPE**|**REFERENCE**|**NOTES**
-----|-----|-----|-----
id|Number| |StoreKey: blocks
code|Char(255)| | 
name|Char(255)| | 
descrip|Char(255)| | 
image|Char(255)| | 
children|Bool| |Can haz childrens?

---

**Block_Attrs**

**COLUMN NAME**|**TYPE**|**REFERENCE**|**NOTES**
-----|-----|-----|-----
id|Number| |StoreKey: block_attrs
block_id|Number|Blocks.id| 
code|Char(255)| | 
prompt|Char(255)| | 
type|Char(255)| | 
required|Bool| | 
options|Memo|array structure to be stored in here.| 

---

**Block_Sets**

**COLUMN NAME**|**TYPE**|**REFERENCE**|**NOTES**
-----|-----|-----|-----
id|Number| |StoreKey: block_sets
code|Char(255)| | 
name|Char(255)| | 

---

**BlockSets_Blocks**

**COLUMN NAME**|**TYPE**|**REFERENCE**|**NOTES**
-----|-----|-----|-----
id|Number| |StoreKey: blocksets_blocks
block_set_id|Number|Block_Sets.id| 
block_id|Number|Blocks.id| 
parent|Number|BlockSets_Blocks.id or 0| 
active|Bool| | 
disp_order|Number| |StoreKey: blocksets_disp_order

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
l.settings:landing_page:blocks[1]:children[1]:
```