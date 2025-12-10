const merchants = new Map();
const transactions = [];

export function upsertMerchant(name) {
  if (!merchants.has(name)) {
    merchants.set(name, merchants.size + 1);
  }
  return merchants.get(name);
}

export function insertTransactions(normalizedTxns) {
  for (const txn of normalizedTxns) {
    const merchantId = upsertMerchant(txn.merchant);
    transactions.push({
      id: transactions.length + 1,
      merchantId,
      ...txn
    });
  }
}

export function listTransactions(filter = {}) {
  const { category } = filter;
  return transactions.filter((txn) => {
    if (category && category !== "All" && txn.category !== category) {
      return false;
    }
    return true;
  });
}

export function listMerchants() {
  return Array.from(merchants.entries()).map(([name, id]) => ({ id, name }));
}

