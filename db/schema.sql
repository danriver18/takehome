CREATE TABLE merchants (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  external_id TEXT NOT NULL UNIQUE,
  merchant_id INTEGER NOT NULL REFERENCES merchants(id) ON DELETE RESTRICT,
  description TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency CHAR(3) NOT NULL,
  transacted_at TIMESTAMPTZ NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_transactions_merchant_id ON transactions (merchant_id);
CREATE INDEX idx_transactions_category ON transactions (category);

