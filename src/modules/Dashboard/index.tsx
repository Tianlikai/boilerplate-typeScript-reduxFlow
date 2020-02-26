import React, { Suspense } from "react";

const LazyDashboardView = React.lazy(() => import("./view"));

export const Dashboard = React.memo(() => (
  <Suspense fallback={null}>
    <LazyDashboardView />
  </Suspense>
));
