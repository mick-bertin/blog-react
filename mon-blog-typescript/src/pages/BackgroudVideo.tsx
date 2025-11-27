// import "./BackgroudVideo.css";
import videoBg from "../assets/img/gettyimages-1392403744-640_adpp.mp4";
const BackgroudVideo = () => {
  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
      <video
        src={videoBg}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Bboy-Fox</h1>
        <p className="text-xl md:text-2xl mb-8 ml-20 mr-20">
          Tu portes une affection tranquille aux animaux, comme si chacun d’eux
          déposait une étincelle différente dans ton regard. Parmi tous, le
          renard occupe une place singulière : sa présence souple, son
          intelligence vive et son allure presque chuchotée résonnent
          profondément avec toi. C’est l’animal qui t’accompagne en pensée,
          celui dont tu admires la liberté élégante et l’esprit curieux. 🦊
        </p>
      </div>
    </div>
  );
};

export default BackgroudVideo;
