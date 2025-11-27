import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
interface Article {
  id?: number;
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
    title: "the fox",
    content: "",
    image: "/1316886-un-renard-illustration.jpeg",
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
      <main className="flex items-center py-10">
        <form className="w-full max-w-lg m-auto">
          {/* Titre + Contenu */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Titre
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Titre"
                value={newArticle.title}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, title: e.target.value })
                }
              />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Contenu
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                placeholder="Contenu"
                value={newArticle.content}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, content: e.target.value })
                }
              />
            </div>
          </div>

          {/* Image */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Image
              </label>
              <input
                placeholder="image"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Catégorie + Date + Checkbox */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Catégorie
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Catégorie"
                value={newArticle.categoryName}
                onChange={(e) =>
                  setNewArticle({
                    ...newArticle,
                    categoryName: e.target.value,
                  })
                }
              />
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Date
              </label>
              <input
                placeholder="date"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="date"
                value={newArticle.createdAt}
                onChange={(e) =>
                  setNewArticle({
                    ...newArticle,
                    createdAt: e.target.value,
                  })
                }
              />
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 flex items-center gap-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Publier
              </label>
              <input
                placeholder="checkbox"
                className="h-5 w-5 cursor-pointer"
                type="checkbox"
                checked={newArticle.isPublished}
                onChange={(e) =>
                  setNewArticle({
                    ...newArticle,
                    isPublished: e.target.checked,
                  })
                }
              />
            </div>
          </div>

          {/* LikeCount */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Likes
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="number"
                placeholder="Nombre de likes"
                value={newArticle.likeCount}
                onChange={(e) =>
                  setNewArticle({
                    ...newArticle,
                    likeCount: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          {/* Bouton */}
          <div className="flex justify-between">
            <button className="bg-green-500 text-white py-3 px-8 rounded shadow hover:bg-green-600 transition">
              <Link to="/articles"> ＜ retour</Link>
            </button>
            <button
              type="button"
              onClick={NewArticle}
              className="bg-blue-500 text-white py-3 px-8 rounded shadow hover:bg-blue-600 transition">
              Créer ＋
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Create;
