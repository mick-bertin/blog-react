import { Route, Routes } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/Homepage";
import ArticleList from "./components/ ArticleList";
import AboutPage from "./pages/AboutPage";
import UpdateArticlePage from "./pages/UpdateArticlePage";
import NotFoundPage from "./pages/NotFoundPage ";
import Create from "./pages/Create";
import { Toaster } from "sonner";
import ArticlePage1 from "./pages/ArticlePage1";
import Layout1 from "./layout/Layout1";
import Layout2 from "./layout/Layout2";

function App() {
  return (
    <>
      <Toaster richColors position="bottom-right" />

      <Routes>
        <Route element={<Layout2 />}>
          <Route path="/" element={<Homepage />}></Route>
        </Route>
        <Route element={<Layout1 />}>
          <Route path="/articles" element={<ArticleList />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/articles/Create" element={<Create />} />
          <Route path="/articles/:id/edit" element={<UpdateArticlePage />} />
          <Route path="/articles/:id" element={<ArticlePage1 />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
