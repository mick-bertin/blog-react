import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ArticlePage() {
  interface Article {
    id: string;
    title: string;
    content: string;
    image: string;
    createdAt: Date;
    isPublished: boolean;
    likeCount: number;
    categoryName: string;
    isLiked: boolean;
  }
  const [article, setArticle] = useState<Article | null>(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/articles/${id}`)
      .then((response) => response.json())
      .then((data) => setArticle(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des articles :", error)
      );
  }, [id]);
  if (!article) {
    return <p>Aucun article trouvé.</p>;
  } else {
    return (
      <>
        <figure>
          <h1>Article : {id}</h1>
          <h2>{article.title}</h2>
          <img src={article.image} alt={article.title} className="h-200" />
          <figcaption>
            <p>{article.content}</p>
          </figcaption>
          <figcaption>
            <p>{article.categoryName}</p>
          </figcaption>
          <figcaption>
            <p>{article.createdAt.toLocaleString()}</p>
          </figcaption>
          <figcaption>
            <p>{article.isPublished}</p>
          </figcaption>
          <figcaption>
            <p>{article.likeCount}</p>
          </figcaption>
          <figcaption>
            <p>{article.isLiked}</p>
          </figcaption>
        </figure>
        <Link to={`/articles/edit${id}`}>modifier</Link>
      </>
    );
  }
}
export default ArticlePage;
