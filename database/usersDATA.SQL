-- First, clean up existing data in correct order
DELETE FROM Transactions WHERE account_id IN (SELECT account_id FROM Account WHERE user_id > 3);
DELETE FROM Account WHERE user_id > 3;
DELETE FROM User_roles WHERE user_id > 3;
DELETE FROM Users WHERE user_id > 3;

-- Reset sequences
SELECT setval('users_user_id_seq', 3, true);
SELECT setval('user_roles_role_id_seq', 3, true);
SELECT setval('account_account_id_seq', 3, true);

-- Create temporary tables for names
DROP TABLE IF EXISTS polish_first_names;
DROP TABLE IF EXISTS polish_last_names;

CREATE TEMPORARY TABLE polish_first_names (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    gender CHAR(1)
);

CREATE TEMPORARY TABLE polish_last_names (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60),
    gender CHAR(1)
);

-- Insert sample Polish first names
INSERT INTO polish_first_names (name, gender) VALUES
('Adam', 'M'), ('Piotr', 'M'), ('Krzysztof', 'M'), ('Andrzej', 'M'), ('Tomasz', 'M'),
('Jan', 'M'), ('Paweł', 'M'), ('Michał', 'M'), ('Marcin', 'M'), ('Jakub', 'M'),
('Marek', 'M'), ('Grzegorz', 'M'), ('Wojciech', 'M'), ('Łukasz', 'M'), ('Mariusz', 'M'),
('Rafał', 'M'), ('Robert', 'M'), ('Sebastian', 'M'), ('Szymon', 'M'), ('Bartosz', 'M'),
('Daniel', 'M'), ('Zbigniew', 'M'), ('Józef', 'M'), ('Kamil', 'M'), ('Mateusz', 'M'),
('Anna', 'F'), ('Maria', 'F'), ('Katarzyna', 'F'), ('Małgorzata', 'F'), ('Agnieszka', 'F'),
('Barbara', 'F'), ('Ewa', 'F'), ('Krystyna', 'F'), ('Magdalena', 'F'), ('Elżbieta', 'F'),
('Joanna', 'F'), ('Aleksandra', 'F'), ('Monika', 'F'), ('Zofia', 'F'), ('Teresa', 'F'),
('Dorota', 'F'), ('Natalia', 'F'), ('Danuta', 'F'), ('Martyna', 'F'), ('Julia', 'F'),
('Karolina', 'F'), ('Marta', 'F'), ('Beata', 'F'), ('Kinga', 'F'), ('Paulina', 'F');

-- Insert sample Polish last names
INSERT INTO polish_last_names (name, gender) VALUES
('Nowak', 'M'), ('Kowalski', 'M'), ('Wiśniewski', 'M'), ('Wójcik', 'M'), ('Kowalczyk', 'M'),
('Kamiński', 'M'), ('Lewandowski', 'M'), ('Dąbrowski', 'M'), ('Zieliński', 'M'), ('Szymański', 'M'),
('Woźniak', 'M'), ('Kozłowski', 'M'), ('Jankowski', 'M'), ('Mazur', 'M'), ('Wojciechowski', 'M'),
('Kwiatkowski', 'M'), ('Krawczyk', 'M'), ('Kaczmarek', 'M'), ('Piotrowski', 'M'), ('Grabowski', 'M'),
('Zając', 'M'), ('Pawłowski', 'M'), ('Michalski', 'M'), ('Król', 'M'), ('Wieczorek', 'M'),
('Nowak', 'F'), ('Kowalska', 'F'), ('Wiśniewska', 'F'), ('Wójcik', 'F'), ('Kowalczyk', 'F'),
('Kamińska', 'F'), ('Lewandowska', 'F'), ('Dąbrowska', 'F'), ('Zielińska', 'F'), ('Szymańska', 'F'),
('Woźniak', 'F'), ('Kozłowska', 'F'), ('Jankowska', 'F'), ('Mazur', 'F'), ('Wojciechowska', 'F'),
('Kwiatkowska', 'F'), ('Krawczyk', 'F'), ('Kaczmarek', 'F'), ('Piotrowska', 'F'), ('Grabowska', 'F'),
('Zając', 'F'), ('Pawłowska', 'F'), ('Michalska', 'F'), ('Król', 'F'), ('Wieczorek', 'F');

-- Functions remain the same
CREATE OR REPLACE FUNCTION random_id_number() RETURNS VARCHAR(10) AS
$$
DECLARE
    letters VARCHAR(3);
    numbers VARCHAR(6);
BEGIN
    letters := chr(65 + floor(random() * 26)::integer) ||
               chr(65 + floor(random() * 26)::integer) ||
               chr(65 + floor(random() * 26)::integer);
    numbers := LPAD(floor(random() * 1000000)::TEXT, 6, '0');
    RETURN letters || numbers;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION random_pesel() RETURNS numeric AS
$$
DECLARE
    year_num INTEGER;
    month_num INTEGER;
    day_num INTEGER;
    serial_num INTEGER;
    control_num INTEGER;
    pesel_str TEXT;
BEGIN
    year_num := floor(random() * (99-70 + 1) + 70)::INTEGER;
    month_num := floor(random() * 12 + 1)::INTEGER;
    day_num := floor(random() * 28 + 1)::INTEGER;
    serial_num := floor(random() * 9999 + 1)::INTEGER;
    pesel_str := LPAD(year_num::TEXT, 2, '0') ||
                 LPAD(month_num::TEXT, 2, '0') ||
                 LPAD(day_num::TEXT, 2, '0') ||
                 LPAD(serial_num::TEXT, 4, '0') ||
                 floor(random() * 10)::TEXT;
    RETURN pesel_str::numeric;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_email(first_name TEXT, last_name TEXT, unique_number INTEGER) RETURNS TEXT AS
$$
DECLARE
    normalized_first TEXT;
    normalized_last TEXT;
BEGIN
    normalized_first := lower(translate(first_name, 'ąćęłńóśźżĄĆĘŁŃÓŚŹŻ', 'acelnoszz'));
    normalized_last := lower(translate(last_name, 'ąćęłńóśźżĄĆĘŁŃÓŚŹŻ', 'acelnoszz'));
    RETURN normalized_first || '.' || normalized_last || unique_number || '@gmail.com';
END;
$$ LANGUAGE plpgsql;

-- Generate users with a different approach
WITH RECURSIVE number_series AS (
    SELECT 4 as n
    UNION ALL
    SELECT n + 1 FROM number_series WHERE n < 10000
),
random_genders AS (
    SELECT
        n as unique_id,
        CASE WHEN random() < 0.5 THEN 'M' ELSE 'F' END as gender
    FROM number_series
),
first_names AS (
    SELECT
        rg.unique_id,
        pf.name as first_name
    FROM random_genders rg
    JOIN polish_first_names pf ON pf.gender = rg.gender
    WHERE random() <= 1.0/25  -- Ensure even distribution across all names
),
last_names AS (
    SELECT
        rg.unique_id,
        pl.name as last_name
    FROM random_genders rg
    JOIN polish_last_names pl ON pl.gender = rg.gender
    WHERE random() <= 1.0/25  -- Ensure even distribution across all names
),
generated_users AS (
    INSERT INTO Users (
        username,
        password,
        name,
        surname,
        email,
        PESEL,
        id_number,
        phone_number,
        is_verified,
        created_at
    )
    SELECT
        lower(f.first_name || '.' || l.last_name || ns.n) AS username,
        encode(sha256(random()::text::bytea), 'hex') AS password,
        f.first_name AS name,
        l.last_name AS surname,
        generate_email(f.first_name, l.last_name, ns.n) AS email,
        random_pesel() AS PESEL,
        random_id_number() AS id_number,
        floor(random() * (999999999-100000000 + 1) + 100000000)::numeric AS phone_number,
        random() < 0.9 AS is_verified,
        timestamp '2020-01-01' + random() * (timestamp '2024-01-05' - timestamp '2020-01-01') AS created_at
    FROM number_series ns
    JOIN first_names f ON f.unique_id = ns.n
    JOIN last_names l ON l.unique_id = ns.n
    RETURNING user_id
),
user_roles_insert AS (
    INSERT INTO User_roles (user_id, role_name)
    SELECT
        user_id,
        CASE
            WHEN random() < 0.98 THEN 'USER'::role
            WHEN random() < 0.5 THEN 'ADMIN'::role
            ELSE 'ANALYST'::role
        END
    FROM generated_users
)
INSERT INTO Account (user_id, balance)
SELECT
    user_id,
    (random() * 10000)::decimal(15,2)
FROM generated_users;

-- Clean up
DROP FUNCTION IF EXISTS random_id_number();
DROP FUNCTION IF EXISTS random_pesel();
DROP FUNCTION IF EXISTS generate_email(TEXT, TEXT, INTEGER);
DROP TABLE IF EXISTS polish_first_names;
DROP TABLE IF EXISTS polish_last_names;