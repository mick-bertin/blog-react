const Youtubes = () => {
  return (
    <>
      <section className="flex flex-wrap h-80  w-full justify-around mt-10 mb-10 gap-3">
        <div>
          <iframe
            className="w-auto h-full"
            src="https://www.youtube.com/embed/jofNR_WkoCE?si=pU9QJbme7SqownnB"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </div>
        <div>
          <iframe
            className="w-auto h-full"
            src="https://www.youtube.com/embed/ojULkWEUsPs?si=CWe_I44IYnx38snh"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </div>
      </section>
    </>
  );
};

export default Youtubes;
