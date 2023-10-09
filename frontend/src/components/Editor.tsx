import ReactQuill from 'react-quill';
interface EditorProps {
  onChange: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

export default function Editor({ value, onChange }: EditorProps) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };
  return <ReactQuill value={value} onChange={onChange} className="editor" theme={'snow'} modules={modules} />;
}
