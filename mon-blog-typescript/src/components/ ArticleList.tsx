import { useEffect, useState } from "react";
import ArticleThumbnail from "./ArticleThumbnail";
import { Link } from "react-router-dom";
import ArticlesPage from "../pages/ArticlesPage";

interface Article {
  id: number | string;
  title: string;
  image: string;
  content: string;
  createdAt: Date;
  isPublished: boolean;
  likeCount: number;
  categoryName: string;
}

function ArticleList() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [sortOption, setSortOption] = useState<string>("Option 1");

  useEffect(() => {
    fetch("http://localhost:3000/articles")
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des articles :", error)
      );
  }, []);

  let filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === "Option 2") {
    // Descendant (du plus récent au plus ancien)
    filteredArticles = [...filteredArticles].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  if (sortOption === "Option 3") {
    filteredArticles = [...filteredArticles].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  return (
    <>
      <article className=" m-20 ">
        <ArticlesPage />
      </article>
      <section className="max-w-5xl m-auto">
        <section className="flex flex-wrap items-center justify-around">
          <div>
            <button className="px-4 py-2 bg-green-600 text-white rounded">
              <Link to="/articles/Create"> + Article</Link>
            </button>
          </div>

          <input
            type="text"
            placeholder="🔍  Filtrer ...."
            className="border p-2 m-4 w-80 rounded-4xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div>
            <form>
              <label htmlFor="select">Trier :</label>
              <select
                id="select"
                name="select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}>
                <option value="Option 1">Aucun tri</option>
                <option value="Option 2">Descendant ⬇️</option>
                <option value="Option 3">Ascendant ⬆️</option>
              </select>
            </form>
          </div>
        </section>

        {filteredArticles.length > 0 ? (
          <div className="flex flex-wrap gap-6 justify-center">
            {filteredArticles.map((article) => (
              <div key={article.id} className="w-80 border-4 p-3 rounded-lg">
                <ArticleThumbnail {...article} id={String(article.id)} />
              </div>
            ))}
          </div>
        ) : (
          <p>Aucun article trouvé.</p>
        )}
      </section>
    </>
  );
}

export default ArticleList;
