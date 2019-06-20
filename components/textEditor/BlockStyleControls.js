import ToolbarButton from './ToolbarButton'

const BlockStyleControls = (props) => {

  const BLOCK_TYPES = [
    {label: 'H2', icon: 'fas fa-heading', style: 'header-two'},
    {label: 'UL', icon: 'fas fa-list-ul', style: 'unordered-list-item'},
    {label: 'OL', icon: 'fas fa-list-ol', style: 'ordered-list-item'}
  ]

  const { editorState } = props;
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    BLOCK_TYPES.map(type => 
      <ToolbarButton 
        key={type.label} 
        icon={type.icon} 
        mouseDown={props.onToggle} 
        active={type.style === blockType} 
        style={type.style} 
      />
    )
  )
}

export default BlockStyleControls