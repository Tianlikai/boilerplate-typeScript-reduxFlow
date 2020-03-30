import React from "react";
import { STRING } from "../constanst";
import "./index.scss";

const PREFIX = "ARTICLE";

export default class ARTICLE extends React.PureComponent<{}> {
  componentDidMount() {
    //
  }

  render() {
    return (
      <div className={PREFIX}>
        <div className={`${PREFIX}-auth`}>
          <div className={`${PREFIX}-authAvator`}></div>
          <div className={`${PREFIX}-authInfo`}>
            <div className={`${PREFIX}-authName`}>name</div>
            <div className={`${PREFIX}-article`}>
              <span className={`${PREFIX}-articleTime`}>2020年03月26日</span>
              <span className={`${PREFIX}-articleCount`}>阅读 14190</span>
            </div>
          </div>
        </div>
        <div className={`${PREFIX}-title`}>title</div>
        <div
          className={`${PREFIX}-wrap`}
          dangerouslySetInnerHTML={{ __html: STRING }}
        ></div>
      </div>
    );
  }
}
