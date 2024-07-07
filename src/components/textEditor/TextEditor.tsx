import {  FC } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './RichTextEditor.css';  // Import the custom CSS for RTL support


type props =  {
  setContent : (value: string) => void,
  content : string
}
const RichTextEditor: FC<props> = ({setContent ,content} ) => {

  const handleChange = (value: string) => {

    setContent(value);
  };


  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'video'],
      ['clean'],
    ],
  };

  return (
    <div className="rich-text-editor  w-full">
      <ReactQuill value={content } onChange={handleChange} modules={modules} className="h-80 mb-4" />
    </div>
  );
};

export default RichTextEditor;
