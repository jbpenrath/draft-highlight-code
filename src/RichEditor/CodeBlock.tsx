import React, { PropsWithChildren, useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow.css'

const CodeBlock = ({ children }: PropsWithChildren<any>) => {
  const ref:React.RefObject<HTMLPreElement> = useRef(null);

  useEffect(() => {
    if (ref.current) {
      hljs.highlightBlock(ref.current);
    }
  }, [])

  return (
    <pre ref={ref}>
      {children}
    </pre>
  );
}

export default CodeBlock;
