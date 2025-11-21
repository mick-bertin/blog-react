import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import ArticleList from "./components/ ArticleList";
import AboutPage from "./pages/AboutPage";
import ArticlePage from "./pages/ArticlePage";
import UpdateArticlePage from "./pages/UpdateArticlePage";
import NotFoundPage from "./pages/NotFoundPage ";
import Create from "./pages/Create";
import { Toaster } from "sonner";


function App() {
  return (
    <>
      <Toaster richColors position="bottom-right" />
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/create" element={<Create />} />
        <Route path="/articles" element={<ArticleList />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/create" element={<Create />} />
        <Route path="/articles/:id/edit" element={<UpdateArticlePage />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
