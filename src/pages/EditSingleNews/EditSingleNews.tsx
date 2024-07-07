/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import RichTextEditor from "../../components/textEditor/TextEditor";
import { useParams } from "react-router-dom";

declare global {
  interface Window {
    cloudinary: any;
  }
}
export default function EditSingleNews() {
  const { id } = useParams<{ id: string }>();
  const [image, setImage] = useState<string>('');
  const [header , setHeader ] = useState<string>('');
  const [content , setContent ] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log("Edit Single News")
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/articles/${id}`);
        console.log({response})
        setContent(response.data.content);
        setImage(response.data.imageUrl);
        setHeader(response.data.header);

        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching article');
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div> Loading...</div>;
  if (error) return <div>{error}</div>;
  const handleSubmit = async () => {
    try {
      const response = await axios.put('http://localhost:4000/api/v1/articles/' + id, {
        header,
        content,
        imageUrl: image
      });
      console.log('Article created:', response.data);
      // Clear the form
      setHeader('');
      setContent('');
      setImage('');
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };
const handleImageUpload = () => {
window.cloudinary.openUploadWidget(
  { 
    cloudName: import.meta.env.VITE_TEST_CLOUDNAME
    , 
    uploadPreset: import.meta.env.VITE_TEST_UPLOADPRESET 
    ,
    sources: ['local', 'url', 'camera'],
    cropping: false,
    
    multiple: false,
    defaultSource: 'local',
  },
  (error: any, result: any) => {
    if (!error && result && result.event === "success") {
      setImage(result.info.secure_url);
    } else if (error) {
      console.error("Cloudinary upload error:", error);
    }
  }
);
};
  return (
    <div className="px-10 sm:px-20 lg:px-[15%] flex flex-col gap-4 md:gap-8 py-20 min-h-screen">
      {/* Header */}
      
      <input
      type="text"
        value={header}
        onChange={(e) => setHeader(e.target.value)}
        name="header"
        placeholder="Enter The Title Of The Article"
        className="bg-transparent outline-none text-xl md:text-2xl lg:text-4xl font-bold"
      />

      {/* Image */}
      <div>
        {image ? (
          <div className='relative'>
            <img className="w-full  max-h-[462px] rounded-xl" src={image} alt="Uploaded" />
            <button onClick={handleImageUpload} className="bg-blue-500 absolute bottom-0 right-0 text-white px-4 py-2 rounded mt-2">
              Change Image
            </button>
          </div>
        ) : (
          <button onClick={handleImageUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
            Upload Image
          </button>
        )}
      </div>
      {/* End Image */}
      
      {/* Body */}
      <div>
        <RichTextEditor content={content}  setContent={setContent} />
      </div>
      <button onClick={handleSubmit} className='bg-blue-500 rounded-lg w-fit px-4 py-1 text-white'>Submit</button>
    </div>
  );
}
