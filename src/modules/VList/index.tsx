import React, { Suspense } from "react";

const LazyVListView = React.lazy(() => import("./view/index"));

export const VList = React.memo(() => (
  <Suspense fallback={null}>
    <LazyVListView />
  </Suspense>
));
