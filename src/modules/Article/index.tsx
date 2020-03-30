import React, { Suspense } from "react";

const LazyArticleView = React.lazy(() => import("./view"));

export const Article = React.memo(() => (
  <Suspense fallback={null}>
    <LazyArticleView />
  </Suspense>
));
