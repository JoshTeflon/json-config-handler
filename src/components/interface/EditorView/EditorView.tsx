import React from 'react'
import * as monaco from 'monaco-editor'
import Editor from '@monaco-editor/react'
import ev from './EditorView.module.css'

interface EditorViewProps {
  value: string
  onChange: (value: string | undefined, ev: monaco.editor.IModelContentChangedEvent) => void
  onValidate?: (markers: monaco.editor.IMarker[]) => void
  options?: any
}

const EditorView: React.FC<EditorViewProps> = ({ value, onChange, onValidate, options }) => {
  return (
    <div className={ev.editorContainer}>
        <Editor
          height="24rem"
          defaultLanguage="json"
          value={value}
          onChange={onChange}
          onValidate={onValidate}
          options={options}
        />
    </div>
  )
}

export default EditorView