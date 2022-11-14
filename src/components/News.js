import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props) => {
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  // const [page,setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [pageSize, setPageSize] = useState(9)
  
  useEffect(() => {
    updateNews(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []) 

  const updateNews =async ()=> {
    props.setProgress(10);
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=954cc5069e654e6698e2401c55127372&page=1&pageSize=${props.pageSize}`;
    props.setProgress(30);
    
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    setPageSize(pageSize);
    props.setProgress(100);
  }
  
  
  const fetchMoreData = async () => {    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=954cc5069e654e6698e2401c55127372&page=1&pageSize=${pageSize +9}`;
    props.setProgress(30);
    setPageSize(pageSize+9)
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    
    props.setProgress(100);
  };
    return (
      <>
        <h2 style={{marginTop: '80px'}} className="text-center">Top Headlines around Canada</h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="row container">
            {articles.map((element) => {
              return (
                <div key={element.url} className="col-md-4">
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    source={element.source.name}
                    author={element.author}
                    date={element.publishedAt}
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://www.bcitfsa.ca/wp-content/uploads/2014/04/news2.jpg"
                    }
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>{" "}
        </InfiniteScroll>
      </>
    );
  }
News.defaultProps = {
  country: "ca",
  category: "general",

};
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
