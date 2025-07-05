import { useState } from "react";
import axios from "axios";

const listaAtivos = ["PETR4.SA", "VALE3.SA", "AAPL", "GOOG", "MSFT"];

export default function AtivosSelect() {
  const [selecionados, setSelecionados] = useState([]);
  const [status, setStatus] = useState("");

  const toggleAtivo = (ativo) => {
    setSelecionados((prev) =>
      prev.includes(ativo) ? prev.filter((a) => a !== ativo) : [...prev, ativo]
    );
  };

  const enviar = async () => {
    try {
      const resposta = await axios.post("http://localhost:4000/gravar-ativos", {
        ativos: selecionados,
      });
      setStatus(resposta.data.mensagem);
    } catch (e) {
      setStatus("Erro ao enviar: " + e.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Selecione os Ativos</h2>
      {listaAtivos.map((ativo) => (
        <div key={ativo}>
          <label>
            <input
              type="checkbox"
              value={ativo}
              checked={selecionados.includes(ativo)}
              onChange={() => toggleAtivo(ativo)}
            />
            {" "}{ativo}
          </label>
        </div>
      ))}
      <button onClick={enviar} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Gravar no Firestore
      </button>
      {status && <p className="mt-2 text-green-600">{status}</p>}
    </div>
  );
}
