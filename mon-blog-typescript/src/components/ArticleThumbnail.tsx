import { Link } from "react-router-dom";
import BoutonLike from "./BoutonLike";
interface ArticleThumbnailProps {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: Date;
  isPublished: boolean;
  likeCount: number;
  categoryName: string;
}
function ArticleThumbnail({
  id,
  title,
  content,
  image,
  categoryName,
  createdAt,
}: ArticleThumbnailProps) {
  return (
    <>
      <article className="flex flex-col h-full">
        <img src={image} alt={title} className="h-100" />
        <h2>{title}</h2>
        <p>{content}</p>
        <p>{categoryName}</p>
        <div className="flex justify-between items-center mt-auto pt-4 text-sm text-gray-600">
          <p>{createdAt.toLocaleString()}</p>
          <BoutonLike />
        </div>
        <Link to={`/articles/${id}`}>Lire l’article</Link>
      </article>
    </>
  );
}

export default ArticleThumbnail;
