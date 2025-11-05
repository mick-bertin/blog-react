import "./App.css";
import ArticleList from "./assets/components/ArticleList";

import Header from "./assets/layout/Header";

function App() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="content">
        <div className="articlelists">
          <ArticleList />
          <ArticleList />
          <ArticleList />
          <ArticleList />
        </div>
        <div className="articlelists">
          <ArticleList />
          <ArticleList />
          <ArticleList />
          <ArticleList />
        </div>
        <div className="articlelists">
          <ArticleList />
          <ArticleList />
          <ArticleList />
          <ArticleList />
        </div>
      </div>
    </>
  );
}

export default App;
