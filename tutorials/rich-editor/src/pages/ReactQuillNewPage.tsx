import RichEditorReactQuillNew from "@/components/react-quill-new";
import React, { useEffect, useState } from "react";

const ReactQuillNewPage = () => {
  const [text, setText] =
    useState(`<h2>Start</h2><p><span style="color: rgb(33, 32, 28);">Content creation has been at the core to the web since its beginning. The&nbsp;</span><code style="color: rgb(33, 32, 28); background-color: rgb(240, 240, 240);">&lt;textarea&gt;</code><span style="color: rgb(33, 32, 28);">&nbsp;provides a native and essential solution to almost any web application. But at some point you may need to add formatting to text input. This is where rich text editors come in. There are many solutions to choose from, but Quill brings a few modern ideas to consider.</span></p><p><span style="color: rgb(33, 32, 28);">Quill requires a container where the editor will be appended. You can pass in either a CSS selector or a DOM object.</span></p><pre class="ql-syntax" spellcheck="false">const quill = new Quill('#editor');  // First matching element will be used
const container = document.getElementById('editor');
const quill = new Quill(container);
</pre><p><span style="color: rgb(33, 32, 28);">If the container is not empty, Quill will initialize with the existing contents.</span></p><pre class="ql-syntax" spellcheck="false">const options = {
&nbsp;debug: 'info',
&nbsp;modules: {
&nbsp;&nbsp;toolbar: true,
&nbsp;},
&nbsp;placeholder: 'Compose an epic...',
&nbsp;theme: 'snow'
};
const quill = new Quill('#editor', options);
</pre><h2><br></h2><h2>Theme</h2><blockquote><span style="color: rgb(33, 32, 28);">Themes allow you to easily make your editor look good with minimal effort. Quill features two officially supported themes:&nbsp;</span><a href="https://quilljs.com/docs/customization/themes#snow" rel="noopener noreferrer" target="_blank" style="color: var(--accent-a11);">Snow</a><span style="color: rgb(33, 32, 28);">&nbsp;and&nbsp;</span><a href="https://quilljs.com/docs/customization/themes#bubble" rel="noopener noreferrer" target="_blank" style="color: var(--accent-a11);">Bubble</a><span style="color: rgb(33, 32, 28);">.</span></blockquote><pre class="ql-syntax" spellcheck="false">import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

</pre>`);

  const [theme, setTheme] = useState(() => {
    return window.localStorage.getItem("react-quill-new-theme") || "snow";
  });
  useEffect(() => {
    window.localStorage.setItem("react-quill-new-theme", theme);
  }, [theme]);
  return (
    <div className="">
      {/* form  */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <span className="text-xl font-medium">
          Theme: {theme === `snow` ? `Snow` : `Bubble`}
        </span>
        {/* options  */}
        <select
          value={theme}
          onChange={(e) => {
            setTheme(e.target.value);
            window.location.reload();
          }}
          className="bg-gray-100 text-xs rounded cursor-pointer px-3 py-1"
        >
          <option value="snow">Snow</option>
          <option value="bubble">Bubble</option>
        </select>
      </div>

      <div className="bg-gray-100 rounded p-4 mb-10 shadow-md">
        <RichEditorReactQuillNew
          theme={theme as any}
          value={text}
          onChange={(e) => setText(e)}
        />
      </div>

      {/* description */}
      <div className="text-xl font-medium mb-4">Description</div>
      <div className="bg-gray-100 rounded p-4 shadow-md">
        <div className="text-[13px] ql-bubble ql-snow">
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ReactQuillNewPage;
