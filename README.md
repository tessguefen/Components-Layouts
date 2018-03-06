# Blocks

## Notes


Keys

blocks
block_sets
block_sets_blocks

**Blocks**

**COLUMN NAME**|**TYPE**|**REFERENCE**|**NOTES**
-----|-----|-----|-----
id|Number| |StoreKey: blocks
code|Char(255)| | 
name|Char(255)| | 
descrip|Char(255)| | 
image|Char(255)| | 



```
Block_Attrs
	id
	block_id (Blocks.id)
	code
	name
	type
	required
	options (if specific types)

BlockSets
	id
	code
	name
	descrip


BlockSets_Blocks
	id
	block_set_id (BlockSets.id)
	block_id (Blocks.id)
	parent (BlockSets_Blocks.id)
	active
	disp_order

BlockSets_Values
	blocksets_blocks_id (BlockSets_Blocks.id)
	attr_id
	value
```