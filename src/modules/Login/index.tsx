import React, { Suspense } from "react";

const LazyLoginView = React.lazy(() => import("./view"));

export const Login = React.memo(() => (
  <Suspense fallback={null}>
    <LazyLoginView />
  </Suspense>
));
