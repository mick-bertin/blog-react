import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function ArticlePage1() {
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
  const [showPanel, setShowPanel] = useState(false);
  const [panelMode, setPanelMode] = useState<"edit" | "delete" | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();
  function notify() {
    toast.success("Article supprimé avec succès !", {
      closeButton: true,
    });
  }

  useEffect(() => {
    fetch(`http://localhost:3000/articles/${id}`)
      .then((response) => response.json())
      .then((data) => setArticle(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des articles :", error)
      );
  }, [id]);

  const openEditPanel = () => {
    setPanelMode("edit");
    setShowPanel(true);
  };

  const openDeletePanel = () => {
    setPanelMode("delete");
    setShowPanel(true);
  };

  const closePanel = () => {
    setShowPanel(false);
  };

  if (!article) return <p>Aucun article trouvé.</p>;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Récupération du nom du fichier
      const fileName: string = file.name;

      // Chemin final
      const finalImagePath: string = "\\" + fileName;

      // Mise à jour du state article
      setArticle((prev) => (prev ? { ...prev, image: finalImagePath } : null));
    } else {
      // Pas de fichier sélectionné → vider
      setArticle((prev) => (prev ? { ...prev, image: "" } : null));
    }
  };

  return (
    <>
      <main>
        <section className="flex flex-row justify-evenly items-start  m-auto pt-20 w-auto">
          <div>
            <button className="px-4 py-2 bg-green-600 text-white rounded">
              <Link to="/articles"> ＜ retour</Link>
            </button>
          </div>
          <figure className="flex items-center gap-16">
            <div>
              <h1 className="text-5xl pb-20 text-center">{article.title}</h1>
              <img src={article.image} alt={article.title} className="h-200" />

              {/* Boutons */}
              <div className="flex justify-between gap-5 mt-4 ">
                <button
                  onClick={openEditPanel}
                  className="px-4 py-2 bg-blue-600 text-white rounded">
                  Modifier
                </button>

                <button
                  onClick={openDeletePanel}
                  className="px-4 py-2 bg-red-600 text-white rounded">
                  Supprimer
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-8 h-screen justify-evenly items-center">
              <figcaption className="w-48">
                <p>{article.content}</p>
              </figcaption>

              <figcaption>
                <p>{article.categoryName}</p>
              </figcaption>

              <figcaption>
                <p>{new Date(article.createdAt).toLocaleString()}</p>
              </figcaption>

              <figcaption>
                <p>{article.isPublished ? "Publié" : "Non publié"}</p>
              </figcaption>

              <figcaption>
                <p>Likes : {article.likeCount}</p>
              </figcaption>
            </div>
          </figure>
        </section>
        {/* --- PANEL QUI SLIDE --- */}
        <section
          className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 p-5
          ${showPanel ? "translate-x-0" : "translate-x-full"}
        `}>
          <button
            onClick={closePanel}
            className="float-right text-xl font-bold">
            ✕
          </button>

          {/* FORMULAIRE D’ÉDITION */}
          {panelMode === "edit" && (
            <div className="mt-10">
              <h2 className="text-lg font-bold mb-4">Modifier l'article</h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  const formData = new FormData(e.currentTarget);

                  /* Modifier */

                  fetch(`http://localhost:3000/articles/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      title: formData.get("title"),
                      content: formData.get("content"),
                      categoryName: formData.get("categorie"),
                      image: article.image,
                      createdAt: formData.get("createdAt"),
                    }),
                  }).then(() => {
                    closePanel();

                    window.location.href = "/articles";
                  });
                }}>
                <label className="block mb-2">Titre :</label>
                <input
                  placeholder="titre"
                  name="title"
                  defaultValue={article.title}
                  className="border-4cursor-pointer w-full mb-4  bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight"
                />
                <label className="block mb-2">categorie :</label>
                <input
                  className="border-4cursor-pointer w-full mb-4  bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight"
                  placeholder="categorie"
                  name="categorie"
                  defaultValue={article.categoryName}
                />
                <label className="block mb-2">Image :</label>
                <input
                  placeholder="image"
                  className="border-4cursor-pointer w-full mb-4  bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  name="image"
                  onChange={handleImageChange}
                />
                <input
                  placeholder="date"
                  name="createdAt"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  type="date"
                  defaultValue={article.createdAt.toLocaleString()}
                />
                {article.image && (
                  <p className="text-sm text-gray-600">
                    Image sélectionnée : {article.image}
                  </p>
                )}

                <label className="block mb-2">Contenu :</label>
                <textarea
                  placeholder="contenu"
                  name="content"
                  defaultValue={article.content}
                  className="border p-2 w-full mb-4 h-40  bg-gray-200 text-gray-700  border-gray-300 rounded py-3 px-4 leading-tight"
                />

                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  Enregistrer
                </button>
              </form>
            </div>
          )}

          {/* CONFIRMATION SUPPRESSION */}
          {panelMode === "delete" && (
            <div className="mt-10">
              <h2 className="text-lg font-bold mb-4">Supprimer l'article ?</h2>
              <p className="mb-6">
                Cette action est irréversible. Voulez-vous continuer ?
              </p>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  fetch(`http://localhost:3000/articles/${id}`, {
                    method: "DELETE",
                  }).then(() => {
                    notify();
                    setTimeout(() => navigate("/articles"), 800);
                  });
                }}>
                Oui, supprimer
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default ArticlePage1;
