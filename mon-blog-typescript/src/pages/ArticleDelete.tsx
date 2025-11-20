import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function ArticleDelete() {
  // 1. Déstructure les hooks nécessaires
  const { id } = useParams();
  const navigate = useNavigate();

  // 2. Ajout d'un état pour gérer les erreurs (optionnel mais recommandé)
  const [error, setError] = useState(null);
  function notifyerreur() {
    toast.error("Erreur serveur", {
      closeButton: true,
    });
  }
  function notify() {
    toast.success("Article supprimé avec succès !", {
      closeButton: true,
    });
  }
  // 3. Fonction pour gérer la suppression
  const deleteArticle = () => {
    fetch(`http://localhost:3000/articles/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        // Vérifie si la requête a réussi (statut 200-299)
        if (!response.ok) {
          notifyerreur();
          // Si la suppression échoue côté serveur, on rejette la promesse
          throw new Error(
            "Impossible de supprimer l’article (Statut: " +
              response.status +
              ")"
          );
        }
        notify();
        // La suppression a réussi, redirige l'utilisateur
        setTimeout(() => navigate("/articles"), 800);
      })

      .catch((err) => {
        // Gère les erreurs réseau ou celles lancées par le throw ci-dessus
        console.error(err);
        setError(
          err.message || "Une erreur est survenue lors de la suppression"
        );
      });
  }; // Fin de la fonction deleteArticle

  // 4. Le composant doit retourner son JSX (le code était mal imbriqué ici)
  return (
    <>
      {error && <p>Erreur: {error}</p>}
      <button onClick={deleteArticle}>Supprimer l'article {id}</button>
    </>
  );
} // Fin du composant ArticleDelete

export default ArticleDelete;
