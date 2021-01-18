import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertFromHTML, ContentState } from 'draft-js';
import { BlockStyleControls, InlineStyleControls } from './Controls';
import { styleMap, getBlockStyle, extendedBlockRenderMap } from './utils';

const htmlContent = `
  <pre>
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
const editorRef: React.RefObject<Editor> = useRef(null);
const className = useMemo(() => {
  const contentState = editorState.getCurrentContent();
  if (!contentState.hasText() && contentState.getBlockMap().first().getType() !== 'unstyled') {
    return 'RichEditor-editor RichEditor-hidePlaceholder';
  }
  return 'RichEditor-editor';
}, [editorState]);
  </pre>
`

const blocksFromHTML = convertFromHTML(htmlContent);
const state = ContentState.createFromBlockArray(
  blocksFromHTML.contentBlocks,
  blocksFromHTML.entityMap,
);

const RichEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createWithContent(state))
  const editorRef: React.RefObject<Editor> = useRef(null);
  const className = useMemo(() => {
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText() && contentState.getBlockMap().first().getType() !== 'unstyled') {
      return 'RichEditor-editor RichEditor-hidePlaceholder';
    }
    return 'RichEditor-editor';
  }, [editorState]);


  const handleFocus = useCallback(() => {
      if(editorRef.current !== null) {
        editorRef.current.focus();
      }
  }, [editorRef]);

  const handleChange = useCallback((nextEditorState) => {
    setEditorState(nextEditorState);
  }, [setEditorState])

  const toggleBlockType = useCallback((blockType: string) => {
    handleChange(RichUtils.toggleBlockType(
      editorState,
      blockType
    ));
  }, [handleChange, editorState]);

  const toggleInlineStyle = useCallback((inlineType: string) => {
    handleChange(RichUtils.toggleInlineStyle(
      editorState,
      inlineType
    ));
  }, [handleChange, editorState]);

  const handleKeyCommand = useCallback((command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }, [handleChange]);

  const mapKeyToEditorCommand = useCallback((e) => {
    if (e.keyCode === 9) {
      const newEditorState = RichUtils.onTab(
        e,
        editorState,
        4
      );

      if (newEditorState !== editorState) {
        handleChange(newEditorState);
      }
      return null;
    }
    return getDefaultKeyBinding(e);
  }, [editorState, handleChange])

  return (
    <div className="RichEditor-root">
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
      <div className={className} onClick={handleFocus}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={handleChange}
          placeholder="Tell a story..."
          ref={editorRef}
          spellCheck={true}
          blockRenderMap={extendedBlockRenderMap}
        />
      </div>
    </div>
  )
};

export default RichEditor;

