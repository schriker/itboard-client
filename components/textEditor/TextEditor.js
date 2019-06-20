import { useState, useRef, useEffect } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import Toolbar from './Toolbar'
import InlineStyleControls from './InlineStyleControls'
import BlockStyleControls from './BlockStyleControls'

const TextEditor = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() =>{
    setLoaded(true)
  })
  
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const editorRef = useRef()

  useEffect(() => {
    if (loaded) {
    editorRef.current.focus()
    }
  }, [loaded])

  const onChange = value => setEditorState(value)
  const toggleInlineStyle = inlineStyle => onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  const toggleBlockStyle = blockStyle => onChange(RichUtils.toggleBlockType(editorState, blockStyle))

  return (
    <div className="white-box wrapper">
      <Toolbar>
        <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />
        <BlockStyleControls editorState={editorState} onToggle={toggleBlockStyle} />
      </Toolbar>
      {loaded && 
        <div onClick={() => editorRef.current.focus()}>
          <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={value => onChange(value)}
          placeholder="Content of your offer!"
          />
        </div>
      }
    </div>
  )
}

export default TextEditor