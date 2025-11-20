import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
interface Article {
  id: number;
  title: string;
  image: string;
  content: string;
  createdAt: Date;
  isPublished: boolean;
  likeCount: number;
  categoryName: string;
}

function Create() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    image: "",
    createdAt: "",
    isPublished: false,
    likeCount: 0,
    categoryName: "",
  });

  // ... (code avant le return)

  // Gestionnaire d'événement dédié pour le champ 'image'
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Vérifie si un fichier a été sélectionné
    if (e.target.files && e.target.files.length > 0) {
      // ⭐ Étape clé : On récupère uniquement le nom du fichier
      const fileName = e.target.files[0].name;

      // On crée le chemin formaté : "\nom-du-fichier.jpg"
      const finalImagePath = "\\" + fileName;

      // Met à jour l'état newArticle avec le chemin nettoyé
      setNewArticle({
        ...newArticle,
        image: finalImagePath,
      });
    } else {
      // Si l'utilisateur annule la sélection, on vide le champ image
      setNewArticle({
        ...newArticle,
        image: "",
      });
    }
  };

  // ... (suite du code)
  const navigate = useNavigate();
  function notify() {
    toast.success("Article créé avec succès !", {
      closeButton: true,
    });
  }
  function notifyerreur() {
    toast.error("Erreur serveur", {
      closeButton: true,
    });
  }
  function NewArticle(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setError(null);
    fetch("http://localhost:3000/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArticle),
    })
      .then((res) => {
        if (!res.ok) {
          notifyerreur();
          throw new Error("Erreur serveur");
        }
        return res.json();
      })

      .then((data) => {
        setArticles([...articles, data]);
        setNewArticle({
          title: "",
          content: "",
          image: "",
          createdAt: "",
          isPublished: false,
          likeCount: 0,
          categoryName: "",
        });
        notify();
        setTimeout(() => navigate("/articles"), 800);
      })
      .catch((err) => setError(err.message));
  }
  return (
    <>
      <div className="text-center mt-30">cree ton nouvel article</div>

      {error && <div className="text-red-500 mt-2 text-center">{error}</div>}

      <main className="flex items-center h-96">
        <form className="flex flex-col gap-2 w-90 m-auto">
          <input
            className="border-4 border-amber-300 bg-sky-500/100 cursor-pointer"
            type="text"
            name="titre"
            placeholder="titre"
            value={newArticle.title}
            onChange={(e) =>
              setNewArticle({ ...newArticle, title: e.target.value })
            }
          />
          <input
            className="border-4 border-amber-300 bg-sky-500/100 cursor-pointer"
            type="text"
            placeholder="contenu"
            value={newArticle.content}
            onChange={(e) =>
              setNewArticle({ ...newArticle, content: e.target.value })
            }
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
            value={newArticle.categoryName}
            onChange={(e) =>
              setNewArticle({ ...newArticle, categoryName: e.target.value })
            }
          />
          <input
            className="border-4 border-amber-300 bg-sky-500/100 cursor-pointer"
            type="date"
            placeholder="createdA"
            value={newArticle.createdAt}
            onChange={(e) =>
              setNewArticle({ ...newArticle, createdAt: e.target.value })
            }
          />
          <label htmlFor="plublier">plublier</label>
          <input
            className="border-4 border-amber-300 bg-sky-500/100 cursor-pointer"
            type="checkbox"
            placeholder="plublier"
            checked={newArticle.isPublished}
            onChange={(e) =>
              setNewArticle({ ...newArticle, isPublished: e.target.checked })
            }
          />

          <input
            className="border-4 border-amber-300 bg-sky-500/100 cursor-pointer"
            type="number"
            placeholder="likeCount"
            value={newArticle.likeCount}
            onChange={(e) =>
              setNewArticle({
                ...newArticle,
                likeCount: Number(e.target.value),
              })
            }
          />
          <button
            type="button"
            onClick={NewArticle}
            className="border-4 border-amber-300 bg-sky-500/100 cursor-pointer ">
            Créer
          </button>
        </form>
      </main>
    </>
  );
}

export default Create;
