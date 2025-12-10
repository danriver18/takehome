import { XMLParser } from "fast-xml-parser";
import { readFileSync } from "fs";

export function fetchLegacyXml(xmlPath) {
  return readFileSync(xmlPath, "utf8");
}

export function parseLegacyXml(xmlString) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true
  });
  const parsed = parser.parse(xmlString);
  let transactions = parsed?.transactions?.transaction;

  if (!transactions) {
    throw new Error("Legacy payload missing transactions");
  }
  if (!Array.isArray(transactions)) {
    transactions = [transactions];
  }

  return transactions;
}

