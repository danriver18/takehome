import { categorize } from "../rules/categoryRules.js";

function normalizeAmount(amountStr) {
  if (typeof amountStr !== "string" && typeof amountStr !== "number") {
    throw new Error("Invalid amount");
  }
  const cleaned = String(amountStr).replace(/[^0-9.-]/g, "");
  const value = Number.parseFloat(cleaned);
  if (Number.isNaN(value)) {
    throw new Error(`Unparseable amount: ${amountStr}`);
  }
  return Math.round(value * 100); // cents
}

function normalizeDate(dateStr) {
  const candidate = Date.parse(dateStr);
  if (Number.isNaN(candidate)) {
    throw new Error(`Unparseable date: ${dateStr}`);
  }
  return new Date(candidate).toISOString();
}

function normalizeMerchant(description) {
  const merchantName = description
    .replace(/\*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return merchantName || "Unknown Merchant";
}

export function normalizeTransactions(rawTxns) {
  return rawTxns.map((txn) => {
    const description = txn.description?.trim() ?? "";
    const merchant = normalizeMerchant(description);
    return {
      externalId: txn.txn_id,
      description,
      merchant,
      amountCents: normalizeAmount(txn.amount),
      currency: txn.currency?.trim() || "USD",
      transactedAt: normalizeDate(txn.date),
      category: categorize(description)
    };
  });
}

