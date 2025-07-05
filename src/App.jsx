import { useState } from "react";
import AtivosSelect from "./pages/AtivosSelect";
import DadosSalvos from "./pages/DadosSalvos";

function App() {
  const [pagina, setPagina] = useState("select");

  return (
    <div className="p-4">
      <nav className="mb-4">
        <button onClick={() => setPagina("select")} className="mr-2">Selecionar Ativos</button>
        <button onClick={() => setPagina("dados")}>Ver Dados</button>
      </nav>

      {pagina === "select" ? <AtivosSelect /> : <DadosSalvos />}
    </div>
  );
}

export default App;
