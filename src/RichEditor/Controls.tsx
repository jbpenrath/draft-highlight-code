import { EditorState } from 'draft-js';
import React, { useMemo, useCallback } from 'react';
import { BLOCK_TYPES, INLINE_STYLES } from './utils';

interface StyleButtonProps {
  onToggle: (style: string) => void
  style: string
  active: boolean
  label: string
}
const StyleButton = ({ onToggle, style, active, label }: StyleButtonProps) => {
  const className = useMemo(() => {
    return active
      ? 'RichEditor-styleButton RichEditor-activeButton'
      : 'RichEditor-styleButton'
  }, [active]);

  const handleToggle = useCallback((e) => {
    e.preventDefault();
    onToggle(style)
  }, [onToggle, style]);

  return (
    <span className={className} onMouseDown={handleToggle}>
      {label}
    </span>
  )
}

interface ControlsProps {
  editorState: EditorState
  onToggle: (style: string) => void
}

export const BlockStyleControls = ({ editorState, onToggle }: ControlsProps) => {
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  return (
    <div className="RicheEditor-controls">
      {
        BLOCK_TYPES.map(({ label, style }) =>
          <StyleButton
            key={label}
            active={style === blockType}
            label={label}
            onToggle={onToggle}
            style={style}
          />
        )
      }
    </div>
  )
}

export const InlineStyleControls = ({ editorState, onToggle }: ControlsProps) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(({ label, style }) => 
        <StyleButton
          key={label}
          active={currentStyle.has(style)}
          label={label}
          onToggle={onToggle}
          style={style}
        />
      )}
    </div>
  )
}

