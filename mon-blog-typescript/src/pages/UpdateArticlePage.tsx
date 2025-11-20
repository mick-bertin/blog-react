import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ArticleDelete from "./ArticleDelete";

interface Article {
  id?: number | string;
  title: string;
  content?: string;
  image: string;
  createdAt: Date;
  isPublished: boolean;
  likeCount: number;
  categoryName: string;
  isLiked: boolean;
}

function UpdateArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);
  function notifyerreur() {
    toast.error("Erreur serveur", {
      closeButton: true,
    });
  }
  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3000/articles/${id}`)
      .then((res) => {
        if (!res.ok) {
          notifyerreur();
          throw new Error("Erreur serveur");
        }
        return res.json();
      })
      .then((data: Article) => setArticle(data))
      .catch((err) => setError(err.message));
  }, [id]);
  function notify() {
    toast.success("Article mis à jour avec succès !", {
      closeButton: true,
    });
  }
  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setError(null);
    if (!article || !id) return;

    fetch(`http://localhost:3000/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    })
      .then((res) => {
        if (!res.ok) {
          notifyerreur();
          console.error("Erreur serveur");
          throw new Error("Erreur serveur");
        }
        return res.json();
      })
      .then((data: Article) => {
        setArticle(data);
        notify();
        setTimeout(() => navigate("/articles"), 800);
      })
      .catch((err) => setError(err.message));
  }

  if (!article) return <p>Aucun article trouvé.</p>;
  // Gestionnaire d'événement dédié pour le champ 'image'
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Vérifie si un fichier a été sélectionné
    if (e.target.files && e.target.files.length > 0) {
      // ⭐ Étape clé : On récupère uniquement le nom du fichier
      const fileName = e.target.files[0].name;

      // On crée le chemin formaté : "\nom-du-fichier.jpg"
      const finalImagePath = "\\" + fileName;

      // Met à jour l'état newArticle avec le chemin nettoyé
      setArticle({
        ...article,
        image: finalImagePath,
      });
    } else {
      // Si l'utilisateur annule la sélection, on vide le champ image
      setArticle({
        ...article,
        image: "",
      });
    }
  };

  // ... (suite du code)

  return (
    <main className="flex items-center h-96">
      <form>
        <input
          type="text"
          placeholder="titre"
          value={article.title}
          onChange={(e) => setArticle({ ...article, title: e.target.value })}
        />
        <input
          className="border-4 border-amber-300 bg-sky-500/100 cursor-pointer"
          type="text"
          placeholder="contenu"
          value={article.content}
          onChange={(e) => setArticle({ ...article, content: e.target.value })}
        />
        <input
          className="border-4 border-amber-300 bg-sky-500/100 cursor-pointer"
          type="file"
          accept=".jpg, .jpeg, .png"
          placeholder="image"
          // Retire l'attribut value ici !
          onChange={handleImageChange} // Utilisez le nouveau gestionnaire
        />
        <input
          className="border-4 border-amber-300 bg-sky-500/100 cursor-pointer"
          type="text"
          placeholder="categorie"
          value={article.categoryName}
          onChange={(e) =>
            setArticle({ ...article, categoryName: e.target.value })
          }
        />

        <button type="button" onClick={handleSubmit}>
          Enregistrer
        </button>
        {error && <p>{error}</p>}
      </form>
      <button type="button" title="Supprimer l'article" aria-label="Supprimer l'article">
        <ArticleDelete/>
      </button>
    </main>
  );
}
export default UpdateArticlePage;
