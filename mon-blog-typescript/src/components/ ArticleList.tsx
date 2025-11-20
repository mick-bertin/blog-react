import { useEffect, useState } from "react";
import ArticleThumbnail from "./ArticleThumbnail";

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

  useEffect(() => {
    fetch("http://localhost:3000/articles")
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des articles :", error)
      );
  }, []);

  // console.log(articles);

  // Filtrage insensible à la casse
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className="max-w-5xl m-auto">
        <input
          type="text"
          placeholder="🔍  Filtrer ....  "
          className="border p-2 w-full m-4 rounded-4xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredArticles.length > 0 ? (
          <div className="flex flex-wrap gap-6 justify-center">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="w-80 border-4 border- p-3 rounded-lg">
                <ArticleThumbnail
                  id={String(article.id)}
                  title={article.title}
                  image={article.image}
                  content={article.content}
                  isPublished={article.isPublished}
                  likeCount={article.likeCount}
                  categoryName={article.categoryName}
                  createdAt={article.createdAt}
                />
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
