import ToolbarButton from './ToolbarButton'

const InlineStyleControls = (props) => {
  const INLINE_STYLES = [
    {label: 'Bold', icon: 'fas fa-bold', style: 'BOLD'},
    {label: 'Italic', icon: 'fas fa-italic', style: 'ITALIC'},
    {label: 'Underline', icon: 'fas fa-underline', style: 'UNDERLINE'}
  ]

  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    INLINE_STYLES.map(type => 
      <ToolbarButton
        key={type.label}
        icon={type.icon}
        mouseDown={props.onToggle}
        style={type.style}
        active={currentStyle.has(type.style)}
      />
    )
  )
} 

export default InlineStyleControls