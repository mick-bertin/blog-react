import { useState } from "react";

function BoutonLike() {
  const [lik, setLik] = useState(false);
  function like() {
    setLik(!lik);
  }
  return (
    <div className="text-2xl">
      <button onClick={like}>{lik ? "❤️ " : "  💛 "}</button>
      {/* 🤍 🤍 */}
    </div>
  );
}

export default BoutonLike;
