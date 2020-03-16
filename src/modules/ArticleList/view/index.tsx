import React from "react";
import { Article } from "../interface";
import { PhoneSingleArticle } from "../components/PhoneSingleArticle";
import { WebSingleArticle } from "../components/WebSingleArticle";
import "./index.scss";

const ARTICLE = {
  imgUrl:
    "https://img.huxiucdn.com/article/cover/202003/16/200539438309.jpg?imageView2/1/w/522/h/295/|imageMogr2/strip/interlace/1/quality/85/format/jpg",
  title: "《王国》：他来了，他和丧尸一起来了",
  author: "长江公寓",
  publishTime: Date.now(),
  reviews: 1,
  likes: 1,
};
const DATA: Article[] = [];
for (let i = 0; i < 20; i += 1) {
  DATA.push({ ...ARTICLE, id: i });
}

const PREFIX = "ArticleList";

export default class ArticleList extends React.PureComponent<{}> {
  render() {
    return (
      <div className={PREFIX}>
        <PhoneSingleArticle articles={DATA} />
        <WebSingleArticle articles={DATA} />
      </div>
    );
  }
}
