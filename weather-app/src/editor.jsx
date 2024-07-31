import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
function Editor() {
  const [theme, setTheme] = useState('light');
  const editor= useRef(null);
  const [content, setContent] = useState('');
 return(
  <div className='editor'>
    <JoditEditor ref={editor} value={content} onChange={newContent => setContent(newContent)} setReadOnly = {false}/>
  </div>
 ) 
}

export default Editor;
//react import

