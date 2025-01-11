-- Reset the sequence for transaction_id
SELECT setval('transactions_transaction_id_seq', 1, false);

-- Function to generate skewed amount
CREATE OR REPLACE FUNCTION generate_skewed_amount() RETURNS numeric AS
$$
DECLARE
    base_amount numeric;
    rand numeric;
BEGIN
    rand := random();
    
    IF rand < 0.80 THEN
        -- 80% transakcji: kwoty od 10 do 200
        base_amount := 10 + (random() * 190);
    ELSIF rand < 0.95 THEN
        -- 15% transakcji: kwoty od 200 do 1000
        base_amount := 200 + (random() * 800);
    ELSE
        -- 5% transakcji: kwoty od 1000 do 5000
        base_amount := 1000 + (random() * 4000);
    END IF;
    
    RETURN ROUND(base_amount::numeric, 2);
END;
$$ LANGUAGE plpgsql;

-- Generate transactions
DO $$
BEGIN
  FOR i IN 1..50000 LOOP
    INSERT INTO Transactions (account_id, transaction_type, amount, status, transaction_date)
    VALUES (
      (SELECT account_id FROM Account ORDER BY RANDOM() LIMIT 1),
      (CASE
        WHEN RANDOM() < 0.15 THEN 'BET_TRANSACTION'::transactionType
        WHEN RANDOM() < 0.40 THEN 'WITHDRAWAL'::transactionType
        ELSE 'DEPOSIT'::transactionType
      END),
      generate_skewed_amount(),
      (CASE
        WHEN RANDOM() < 0.80 THEN 'CREDITED'::transactionStatus
        WHEN RANDOM() < 0.95 THEN 'PENDING'::transactionStatus
        ELSE 'CANCELED'::transactionStatus
      END),
      NOW() - (random() * interval '1 year')
    );
  END LOOP;
END $$;

DROP FUNCTION IF EXISTS generate_skewed_amount();