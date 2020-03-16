import React, { Suspense } from "react";

const LazyArticleListView = React.lazy(() => import("./view"));

export const ArticleList = React.memo(() => (
  <Suspense fallback={null}>
    <LazyArticleListView />
  </Suspense>
));
