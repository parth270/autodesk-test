import React, { Suspense } from "react";

const TalkPage = React.lazy(() => import("../view/Talk.jsx"));

const Talk = () => {
  return (
    <Suspense fallback={null}>
      <TalkPage />
    </Suspense>
  );
};

export default Talk;
