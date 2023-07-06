import React from 'react'
import Editor from '@monaco-editor/react';
import ev from './EditorView.module.css'

const EditorView: React.FC = () => {
  return (
    <div className={ev.editorContainer}>
        <Editor height="75vh" defaultLanguage="json" defaultValue="// some comment" />
    </div>
  )
}

export default EditorView