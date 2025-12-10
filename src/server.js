import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { fetchLegacyXml, parseLegacyXml } from "./ingest/parseLegacy.js";
import { normalizeTransactions } from "./ingest/normalize.js";
import { insertTransactions, listMerchants, listTransactions } from "./storage/memoryStore.js";
import { getKnownCategories } from "./rules/categoryRules.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
const dataPath = path.join(__dirname, "../data/transactions.xml");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

function ingestLegacyData() {
  const xml = fetchLegacyXml(dataPath);
  const raw = parseLegacyXml(xml);
  const normalized = normalizeTransactions(raw);
  insertTransactions(normalized);
}

ingestLegacyData();

app.get("/api/transactions", (req, res) => {
  const { category } = req.query;
  const items = listTransactions({ category });
  res.json({ data: items });
});

app.get("/api/categories", (_req, res) => {
  res.json({ data: getKnownCategories() });
});

app.get("/api/merchants", (_req, res) => {
  res.json({ data: listMerchants() });
});

app.listen(PORT);

