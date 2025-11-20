import { useState } from "react";

function BoutonLike() {
  const [lik, setLik] = useState(false);
  function like() {
    setLik(!lik);
  }
  return (
    <div>
      <button onClick={like}>{lik ? "❤️ " : " 🤍 "}</button>
      {/* 🤍 💛 */}
    </div>
  );
}

export default BoutonLike;
