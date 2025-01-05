import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import { Spin } from "antd";
import Home from "./components/home";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<Spin size="large" />}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
