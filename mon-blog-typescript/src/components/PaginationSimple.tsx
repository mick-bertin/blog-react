import { useState, useEffect } from "react";

interface Article {
  id: number | string;
  title: string;
  image?: string;
  content?: string;
  isPublished?: boolean;
  likeCount?: number;
  categoryName?: string;
  createdAt?: string;
  name: string;
  ki: number | string;
  type: string;
}

const PaginationSimple = () => {
  const [posts, setPosts] = useState<Article[]>([]);
  const [page, setPage] = useState(1);

  const LIMIT = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/transformations?_page=${page}&_per_page=${LIMIT}`
        );
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error("Erreur de chargement:", error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <>
      <div className="h-full">
        <div className="flex flex-wrap justify-around gap-14 ">
          {posts.map((article) => (
            <div key={article.id} className="w-80 border p-3 rounded-lg ">
              <figure className="">
                <div className="h-96">
                  <title>{`Page ${page} ${article.name} `}</title>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-96"
                  />
                </div>
                <div className="text-center text-fuchsia-600 bg-amber-300 ">
                  <figcaption>
                    <p> {String(article.name)} </p>
                  </figcaption>
                  <figcaption>
                    <p>{String(article.ki)} </p>
                  </figcaption>
                </div>
              </figure>
            </div>
          ))}
        </div>

        <div className="pt-7 text-center">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded">
            ＜ Précédent
          </button>

          <span className="p-5 ">Page {page}</span>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setPage(page + 1)}
            disabled={posts.length < LIMIT}>
            Suivant ＞
          </button>
        </div>
      </div>
    </>
  );
};

export default PaginationSimple;
