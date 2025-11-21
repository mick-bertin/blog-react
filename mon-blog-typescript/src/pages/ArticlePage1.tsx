import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  const { id } = useParams();

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
          <p>{new Date(article.createdAt).toLocaleString()}</p>
        </figcaption>

        <figcaption>
          <p>{article.isPublished ? "Publié" : "Non publié"}</p>
        </figcaption>

        <figcaption>
          <p>Likes : {article.likeCount}</p>
        </figcaption>
      </figure>

      {/* Boutons */}
      <div className="flex gap-3 mt-4">
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

      {/* --- PANEL QUI SLIDE --- */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 p-5
          ${showPanel ? "translate-x-0" : "translate-x-full"}
        `}>
        <button onClick={closePanel} className="float-right text-xl font-bold">
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

                fetch(`http://localhost:3000/articles/${id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    title: formData.get("title"),
                    content: formData.get("content"),
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
                className="border p-2 w-full mb-4"
              />

              <label className="block mb-2">Contenu :</label>
              <textarea
                placeholder="contenu"
                name="content"
                defaultValue={article.content}
                className="border p-2 w-full mb-4 h-40"
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
                  window.location.href = "/articles";
                });
              }}>
              Oui, supprimer
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ArticlePage1;
