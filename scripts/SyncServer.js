// scripts/syncServer.js
import express from 'express';
import cors from 'cors';
import yahooFinance from 'yahoo-finance2';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "XXXXXX"
};

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/gravar-ativos", async (req, res) => {
  const { ativos } = req.body; // ex: ["PETR4.SA", "AAPL"]

  try {
    for (const ticker of ativos) {
      const result = await yahooFinance.quoteSummary(ticker, { modules: ['price'] });
      const preco = result.price.regularMarketPrice;
      const dataAtual = new Date().toISOString().split('T')[0];

      await addDoc(collection(db, "ativos", ticker, "historico"), {
        preco,
        data: dataAtual
      });
    }

    res.status(200).json({ status: "ok", mensagem: "Dados gravados com sucesso!" });
  } catch (err) {
    console.error("Erro:", err);
    res.status(500).json({ status: "erro", erro: err.toString() });
  }
});

app.listen(4000, () => {
  console.log("Servidor rodando em http://localhost:4000");
});
