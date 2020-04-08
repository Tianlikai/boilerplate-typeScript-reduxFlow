import React, { Suspense } from "react";
import { RouteComponentProps } from "react-router";
import { RouterInfo } from "./interface";

const LazyArticleView = React.lazy(() => import("./view"));

export const Article = React.memo((props: RouteComponentProps<RouterInfo>) => (
  <Suspense fallback={null}>
    <LazyArticleView {...props} />
  </Suspense>
));
