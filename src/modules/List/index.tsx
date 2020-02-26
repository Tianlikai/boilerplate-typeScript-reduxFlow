import React, { Suspense } from "react";

const LazyListView = React.lazy(() => import("./view"));

export const List = React.memo(() => (
  <Suspense fallback={null}>
    <LazyListView />
  </Suspense>
));
