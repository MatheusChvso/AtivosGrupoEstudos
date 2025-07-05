import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collectionGroup, getDocs } from "firebase/firestore";

export default function DadosSalvos() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const fetchDados = async () => {
      const snapshot = await getDocs(collectionGroup(db, "historico"));
      const resultados = [];
      snapshot.forEach((doc) => {
        const partes = doc.ref.path.split("/");
        const ticker = partes[1];
        resultados.push({ ticker, ...doc.data() });
      });
      setDados(resultados);
    };

    fetchDados();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Histórico Salvo</h2>
      <ul>
        {dados.map((d, idx) => (
          <li key={idx}>
            {d.ticker} - {d.data} - R$ {d.preco}
          </li>
        ))}
      </ul>
    </div>
  );
}
