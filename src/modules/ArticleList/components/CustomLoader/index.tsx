import React from "react";
import ContentLoader from "react-content-loader";

export const MyWebLoader = () => (
  <ContentLoader
    speed={2}
    width={1036}
    height={160}
    viewBox="0 0 1036 160"
    backgroundColor="#ecebeb"
    foregroundColor="#f3f3f3"
  >
    <rect x="0" y="10" width="410" height="15" rx="3" />
    <rect x="0" y="40" width="810" height="15" rx="3" />
    <rect x="0" y="70" width="810" height="15" rx="3" />
  </ContentLoader>
);

export const MyPhoneLoader = () => (
  <ContentLoader
    speed={2}
    width={375}
    height={120}
    viewBox="0 0 360 120"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="10" y="10" rx="3" ry="3" width="178" height="15" />
    <rect x="10" y="40" rx="3" ry="3" width="365" height="15" />
    <rect x="10" y="70" rx="3" ry="3" width="365" height="15" />
  </ContentLoader>
);
