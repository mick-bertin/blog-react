function ArticleThumbnail() {
  const article = {
    title: "Titre de l'article",
    content: "Voici le contenu de l'article.",
    image: "https://placehold.co/150x150",
    createdAt: new Date(),
    isPublished: false,
    likeCount: 0,
    categoryName: "React",
  };
  return (
    <div className="articlecard ">
      <img src={article.image} alt={article.title} />
      <p className="articlep"> {article.title}</p>
      <p className="articlep"> {article.content}</p>
      <p className="articlep">{article.createdAt.toLocaleDateString()} </p>
      <p className="articlep">{article.isPublished} </p>
      <p className="articlep">{article.likeCount}</p>
      <p className="articlep">{article.categoryName}</p>
    </div>
  );
}

export default ArticleThumbnail;
