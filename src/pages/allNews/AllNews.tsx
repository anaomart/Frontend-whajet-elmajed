import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Article {
  _id: string;
  header: string;
  content: string;
  imageUrl: string;
  author: string;
  createdAt: string;
}

const DisplayAllNews: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    console.log("delete article")
    try {
      await axios.delete(`http://localhost:4000/api/v1/articles/${id}`);
      const updatedArticles = articles.filter((article) => article._id !== id);
      setArticles(updatedArticles);
    } catch (err) {
      console.error("Error deleting article:", err);
    }
  };  

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/articles"
        );
        setArticles(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching articles");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-10 sm:px-20 lg:px-[15%] py-20 min-h-screen">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10">
        Latest News
      </h1>
      <Link to={`/news/${articles[0]._id}`}>

      <div className="my-10 relative ">
      <div className="absolute z-20 flex gap-1 flex-row-reverse top-1 right-1 ">
            <button className=" hover:scale-105 transition-transform  text-white rounded-md px-2 py-1 text-sm font-semibold bg-blue-800 ">
              <Link to={`/news/edit/${articles[0]._id}`}>Edit</Link>
            </button>
            <button  onClick={() => handleDelete(articles[0]._id)} className=" hover:scale-105 transition-transform  text-white rounded-md px-2 py-1 text-sm font-semibold bg-red-800 ">
             
              <Link to={`/news/`}>      
              Delete        
              </Link>

            </button>
            </div>
        <img
          className="w-full max-h-[462px] rounded-xl"
          src={articles[0].imageUrl}
          alt="Article"
        />
        <div className="absolute bottom-0 left-0 right-0 inset-0 bg-black bg-opacity-30 rounded-xl" />
        <div
          className="absolute bottom-0
             left-0 p-4 capitalize  text-white"
        >
          <div className="font-semibold right-0 text-lg  md:text-2xl lg:text-3xl">
            {" "}
            {articles[0].header}
          </div>
          <div className="flex items-center gap-4 py-3   rounded-md shadow-sm">
            <span className="text-sm text-white font-semibold">
              Created By: Omar
            </span>
            <span className="text-sm text-white font-semibold">
              Created at :{" "}
              {new Date(articles[0].createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {articles.slice(1).map((article) => (
          <Link
            to={`/news/${article._id}`}
            className=" relative h-[250px] md:h-[250px]  min-w-[250px]"
          >
            <img
              className="w-full  h-full rounded-xl"
              src={article.imageUrl}
              alt={article.header}
            />
            <div className="absolute bottom-0 left-0 right-0 inset-0 bg-black bg-opacity-30 rounded-xl" />
            <div
              className="absolute bottom-0
             left-0 p-4 capitalize right-0 font-semibold text-lg lg:text-2xl md:text-xl text-white"
            >
              {article.header.length > 30
                ? article.header.substring(0, 30) + "..."
                : article.header.substring(0, 30)}
            </div>
            <div className="absolute flex gap-1 flex-row-reverse top-1 right-1 ">
            <button className=" hover:scale-105 transition-transform  text-white rounded-md px-2 py-1 text-sm font-semibold bg-blue-800 ">
              <Link to={`/news/edit/${article._id}`}>Edit</Link>
            </button>
            <button  onClick={() => handleDelete(article._id)} className=" hover:scale-105 transition-transform  text-white rounded-md px-2 py-1 text-sm font-semibold bg-red-800 ">
              <Link to={`/news/`}>        
              Delete
      
              </Link>

            </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DisplayAllNews;
