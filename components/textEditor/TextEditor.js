import { useState, useRef, useEffect, Fragment } from 'react'
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import Toolbar from './Toolbar'
import InlineStyleControls from './InlineStyleControls'
import BlockStyleControls from './BlockStyleControls'
import Notification from '../ui/Notifiaction'

const TextEditor = () => {
  
  const [withErrors, setWithErrors] = useState(false)
  const [errorsArray, setErrorsArray] = useState([])
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


  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true
    }
    return false
  }

  const submit = () => {
    const html = stateToHTML(editorState.getCurrentContent())
    // setErrorsArray(['Blad'])
    console.log(html)
    setWithErrors(true)
  }

  const styleMap = {
    BOLD: {
      color: '#015fff',
      fontWeight: 800
    }
  }

  return (
    <Fragment>
      <Notification open={withErrors} type="error" close={() => setWithErrors(false)}>
        <p>Something went wrong :(</p>
        <ul>
          {errorsArray.map((error, index) => {
              return <li key={index}>{error}</li>
            }
          )}
        </ul>
      </Notification>
      <div className="white-box wrapper white-box--content">
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
            customStyleMap={styleMap}
            handleKeyCommand={handleKeyCommand}
            />
          </div>
        }
        <div className="row">
          <button className="btn btn--blue btn--blue-white" onClick={() => submit()}>Done</button>
        </div>
        <style jsx>
          {`
            .row {
              padding: 40px;
            }
          `}
        </style>
      </div>
    </Fragment>
  )
}

export default TextEditor