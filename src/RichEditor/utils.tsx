import { ContentBlock, DefaultDraftBlockRenderMap } from "draft-js"
import { Map } from 'immutable';
import CodeBlock from './CodeBlock';

export const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
]

export const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
]

export const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
}

export const getBlockStyle = (block: ContentBlock) => {
  switch(block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return '';
  }
}

const customBlockRenderMap = Map({
  'code-block': {
    element: 'pre',
    wrapper: <CodeBlock />
  }
})

export const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(customBlockRenderMap);
