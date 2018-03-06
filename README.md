# Blocks

## Notes


Keys
blocks
block_sets
block_sets_blocks

Blocks
	id
	code
	name
	descrip
	image (?)
	children (BOOL)

BlockSets
	id
	code
	name
	descrip

Block_Attrs
	id
	block_id (Blocks.id)
	code
	name
	type
	required
	options (if specific types)

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





