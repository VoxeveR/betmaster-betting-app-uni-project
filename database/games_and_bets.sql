CREATE OR REPLACE FUNCTION add_games_and_bets() RETURNS void AS $$
DECLARE
    i INT;
    v_game_id INT;  -- Zmieniona nazwa zmiennej
    v_user_id INT;  -- Zmieniona nazwa zmiennej
    v_bet_id INT;   -- Zmieniona nazwa zmiennej
    odds_one INT;
    odds_x INT;
    odds_two INT;
    current_sport_type sportType;  -- Zmienna do przechowywania sportType
    event_name TEXT;               -- Zmienna do przechowywania nazwy eventu
    event_counter INT := 1;        -- Licznik eventów
    games_per_event INT;           -- Liczba gier w jednym evencie
    game_start_time TIMESTAMP;     -- Data rozpoczęcia gry
    game_status gameStatus;        -- Status gry
    bet_status betStatusType;      -- Status zakładu
    bet_result_result betResult;   -- Wynik zakładu
    bet_created_at TIMESTAMP;      -- Data stworzenia zakładu
BEGIN
    -- Dodajemy 10 tysięcy gier
    FOR i IN 1..10000 LOOP
            -- Co 10 gier tworzymy nowy event
            IF (i % 10 = 1) THEN
                event_name := 'Event ' || event_counter;
                event_counter := event_counter + 1;
                games_per_event := (random() * 5 + 5)::INT;  -- Losowa liczba gier w evencie (5-10)
            END IF;

            -- Rzutowanie tekstu na typ sportType
            current_sport_type :=
                    CASE (i % 6)
                        WHEN 0 THEN 'FOOTBALL'::sportType
                        WHEN 1 THEN 'BASKETBALL'::sportType
                        WHEN 2 THEN 'LEAGUE_OF_LEGENDS'::sportType
                        WHEN 3 THEN 'CS_GO'::sportType
                        WHEN 4 THEN 'BOXING'::sportType
                        ELSE 'MMA'::sportType
                        END;

            -- Losowy status gry
            game_status :=
                    CASE (i % 3)
                        WHEN 0 THEN 'BEFORE'::gameStatus
                        WHEN 1 THEN 'PLAYING'::gameStatus
                        ELSE 'FINISHED'::gameStatus
                        END;

            -- Losowa data rozpoczęcia gry
            IF game_status = 'BEFORE' THEN
                game_start_time := NOW() + (random() * 30 || ' days')::INTERVAL;  -- Gry w przyszłości
            ELSIF game_status = 'PLAYING' THEN
                game_start_time := NOW() - (random() * 2 || ' hours')::INTERVAL;  -- Gry w trakcie
            ELSE
                game_start_time := NOW() - (random() * 30 || ' days')::INTERVAL;  -- Gry w przeszłości
            END IF;

            INSERT INTO Games (home, away, event_name, start_time, game_status, sport_type)
            VALUES (
                       'Team ' || i,
                       'Team ' || (i + 1),
                       event_name,  -- Użycie tej samej nazwy eventu dla kilku gier
                       game_start_time,
                       game_status,  -- Losowy status gry
                       current_sport_type     -- Użycie zmiennej z rzutowaniem
                   ) RETURNING game_id INTO v_game_id;  -- Użycie zmiennej v_game_id

            -- Generujemy kursy dla każdej gry
            odds_one := (random() * 10 + 1)::INT;
            odds_x := (random() * 10 + 1)::INT;
            odds_two := (random() * 10 + 1)::INT;

            INSERT INTO Odds (game_id, odds, odds_type)
            VALUES
                (v_game_id, odds_one, 'One'::gameResult),  -- Użycie zmiennej v_game_id
                (v_game_id, odds_x, 'X'::gameResult),      -- Użycie zmiennej v_game_id
                (v_game_id, odds_two, 'Two'::gameResult);  -- Użycie zmiennej v_game_id
        END LOOP;

    -- Dodajemy 10 tysięcy zakładów
    FOR i IN 1..10000 LOOP
            -- Losowo wybieramy użytkownika z istniejących 10 tysięcy
            SELECT user_id INTO v_user_id FROM Users ORDER BY random() LIMIT 1;  -- Użycie zmiennej v_user_id

            -- Losowo wybieramy grę dla zakładu
            SELECT game_id INTO v_game_id FROM Games ORDER BY random() LIMIT 1;  -- Użycie zmiennej v_game_id

            -- Losowy status zakładu
            IF (i % 3 = 0) THEN
                bet_status := 'SETTLED'::betStatusType;
                bet_result_result :=
                        CASE (i % 2)
                            WHEN 0 THEN 'WON'::betResult
                            ELSE 'LOST'::betResult
                            END;
            ELSE
                bet_status := 'UNSETTLED'::betStatusType;
                bet_result_result := NULL;
            END IF;

            -- Losowa data stworzenia zakładu
            bet_created_at := NOW() - (random() * 30 || ' days')::INTERVAL;

            -- Dodajemy zakład
            INSERT INTO Bets (user_id, bet_amount, odds, status, bet_result, created_at)
            VALUES (
                       v_user_id,  -- Użycie zmiennej v_user_id
                       (random() * 100 + 1)::decimal(12, 2),
                       (random() * 10 + 1)::decimal(4, 2),
                       bet_status,  -- Losowy status zakładu
                       bet_result_result,  -- Losowy wynik zakładu
                       bet_created_at  -- Losowa data stworzenia zakładu
                   ) RETURNING bet_id INTO v_bet_id;  -- Użycie zmiennej v_bet_id

            -- Łączymy zakład z grą
            INSERT INTO BetsGames (bet_id, game_id, expected_result)
            VALUES (
                       v_bet_id,  -- Użycie zmiennej v_bet_id
                       v_game_id,  -- Użycie zmiennej v_game_id
                       CASE (i % 3)
                           WHEN 0 THEN 'One'::gameResult  -- Rzutowanie na gameResult
                           WHEN 1 THEN 'X'::gameResult    -- Rzutowanie na gameResult
                           ELSE 'Two'::gameResult         -- Rzutowanie na gameResult
                           END
                   );
        END LOOP;
END;
$$ LANGUAGE plpgsql;

select add_games_and_bets();