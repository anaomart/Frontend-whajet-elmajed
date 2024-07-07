import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

interface Article {
  _id: string;
  header: string;
  content: string;
  imageUrl: string;
  author: string;
  createdAt: string;
}

const DisplaySingleNews: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/articles/${id}`);
        setArticle(response.data);
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

  return (
    <div className="px-10 sm:px-20 lg:px-[15%] flex flex-col gap-4 md:gap-8 py-20 min-h-screen">
      {/* Header */}
      {article && (
        <>
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
            {article.header}
          </h1>
          <div className="flex text-xs sm:text-base gap-4 md:gap-8 text-[#696A75]">
            <div>
              Created By : <span className="font-bold">{'Omar'}</span>
            </div>
            <span className="font-bold">{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>
          {/*  end Header*/}

          {/* Image */}
          <div>
            <img className="w-full max-h-[462px] 2xl:max-h-max rounded-xl" src={article.imageUrl} alt="Article" />
          </div>
          {/*  end Image*/}

          {/* Body */}
          <div className=''>
            <p className="text-[#3B3C4A]  w-full text-base md:text-lg  lg:text-xl">
            <div
              className="prose prose-h2:my-3 prose-h1:my-5  max-w-screen-2xl  text-[#3B3C4A] text-base md:text-lg lg:text-xl"
              dangerouslySetInnerHTML={{ __html:  DOMPurify.sanitize(article.content)  }}
            />            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default DisplaySingleNews;
