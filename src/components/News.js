import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "ca",
    // pageSize: "9",
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    // pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      loading: true,
      totalResults: 0,
      pageSize: 9,
    };
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=83cb9670aa4646a0bac1b5652d839882&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    this.props.setProgress(30);
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
      pageSize: this.state.pageSize + 9,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = () => {
    this.setState({
      pageSize: this.state.pageSize,
    });
    this.updateNews();
  };

  render() {
    return (
      <>
        <h2 className="text-center">Top Headlines around the World</h2>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="row container">
            {this.state.articles.map((element) => {
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
}

export default News;
