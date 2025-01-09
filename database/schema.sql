-- DROPPING TABLES

DROP TABLE IF EXISTS BetsGames;
DROP TABLE IF EXISTS Bets;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS User_roles;
DROP TABLE IF EXISTS Transactions;
DROP TABLE IF EXISTS Promotions;
DROP TABLE IF EXISTS Odds;
DROP TABLE IF EXISTS Account;
DROP TABLE IF EXISTS SelfExclusion;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Games;
DROP TYPE IF EXISTS role;
DROP TYPE IF EXISTS transactionStatus;
DROP TYPE IF EXISTS transactionType;
DROP TYPE IF EXISTS gameStatus;
DROP TYPE IF EXISTS sportType;
DROP TYPE IF EXISTS betResult;
DROP TYPE IF EXISTS betStatusType;
DROP TYPE IF EXISTS gameResult;
DROP TYPE IF EXISTS promotionType;
DROP TYPE IF EXISTS positionTypes;

-- CREATING TABLE STRUCTURE

create table Users(
                      user_id serial NOT NULL PRIMARY KEY,
                      username VARCHAR(40) NOT NULL,
                      password TEXT NOT NULL,
                      name VARCHAR(40) NOT NULL,
                      surname VARCHAR(60) NOT NULL,
                      email TEXT NOT NULL,
                      PESEL numeric(11),
                      id_number VARCHAR(10),
                      phone_number numeric(11),
                      is_verified BOOLEAN,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE type role as enum('USER', 'ADMIN', 'ANALYST');

create table User_roles(
                           role_id serial NOT NULL PRIMARY KEY,
                           user_id integer NOT NULL REFERENCES Users,
                           role_name role
);

create table SelfExclusion(
                              self_exclusion_id serial NOT NULL PRIMARY KEY,
                              user_id integer NOT NULL REFERENCES Users,
                              start_date TIMESTAMP NOT NULL,
                              end_date TIMESTAMP NOT NULL
);

CREATE table Account(
                        account_id serial NOT NULL PRIMARY KEY,
                        user_id integer NOT NULL REFERENCES Users,
                        balance decimal(15, 2) NOT NULL DEFAULT 0.00
);


CREATE type transactionType as enum('BET_TRANSACTION', 'WITHDRAWAL', 'DEPOSIT');
CREATE type transactionStatus as enum('PENDING', 'CANCELED', 'CREDITED');


create table Transactions(
                             transaction_id serial NOT NULL PRIMARY KEY,
                             account_id integer NOT NULL REFERENCES Account,
                             transaction_type transactionType NOT NULL,
                             amount decimal(12, 2) NOT NULL,
                             transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             status transactionStatus NOT NULL
);

create type gameStatus as enum('BEFORE', 'PLAYING', 'FINISHED');
create type sportType as enum('FOOTBALL', 'BASKETBALL', 'LEAGUE_OF_LEGENDS', 'CS_GO', 'BOXING', 'MMA');
create type gameResult as enum('One', 'X', 'Two');

create table Games(
                      game_id serial NOT NULL PRIMARY KEY,
                      home VARCHAR(100) NOT NULL,
                      away VARCHAR(100) NOT NULL,
                      event_name VARCHAR(100) NOT NULL,
                      start_time TIMESTAMP NOT NULL,
                      game_status gameStatus NOT NULL,
                      sport_type sportType NOT NULL,
                      game_result gameResult
);

create type betStatusType as enum('SETTLED', 'UNSETTLED');
create type betResult  as enum('WON', 'LOST');

create table Bets(
                     bet_id serial not null PRIMARY KEY,
                     user_id integer not null REFERENCES Users,
                     bet_amount decimal(12, 2) NOT NULL,
                     odds decimal(4, 2) NOT NULL,
                     status BetStatusType NOT NULL,
                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                     bet_result betResult
);


create table BetsGames(
                          bet_id integer NOT NULL REFERENCES Bets,
                          game_id integer NOT NULL REFERENCES Games,
                          expected_result gameResult NOT NULL,
                          PRIMARY KEY (bet_id, game_id)
);

create table Odds(
                     odds_id serial NOT NULL PRIMARY KEY,
                     game_id integer NOT NULL REFERENCES Games,
                     odds decimal NOT NULL,
                     odds_type gameResult NOT NULL
);

create type promotionType as enum('PLACEHOLDER');

create table Promotions(
                           promotion_id serial NOT NULL PRIMARY KEY,
                           user_id integer NOT NULL REFERENCES Users,
                           promotion_name VARCHAR(200) NOT NULL,
                           promotion_type promotionType NOT NULL,
                           start_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           end_date TIMESTAMP NOT NULL,
                           requirements VARCHAR(200) NOT NULL
);

-- INSERTING SAMPLE DATA

-- INSERT TEST USERS
INSERT INTO Users (username, password, name, surname, email, PESEL, id_number, phone_number, is_verified)
VALUES
    ('test', 'test', 'John', 'Doe', 'test_user@example.com', '12345678901', 'AB123456', '123456789', TRUE), -- Regular User
    ('admin', 'admin', 'Jane', 'Smith', 'test_admin@example.com', '98765432109', 'CD654321', '987654321', TRUE); -- Admin User

-- ASSIGN ROLES TO USERS
INSERT INTO User_roles (user_id, role_name)
VALUES
    (1, 'USER'),   -- Assign 'USER' role to the first user
    (2, 'ADMIN');  -- Assign 'ADMIN' role to the second user

-- CREATE ACCOUNT FOR REGULAR USER
INSERT INTO Account (user_id, balance)
VALUES
    (1, 1000.00); -- Initial balance for the regular user


-- INSERT TEST GAMES AND ODDS

INSERT INTO Games (home, away, event_name, start_time, game_status, sport_type)
VALUES
    ('Los Angeles Lakers', 'Golden State Warriors', 'NBA', '2024-12-20 19:30:00', 'BEFORE', 'BASKETBALL'),
    ('G2 Esports', 'Team Vitality', 'LEC Winter Split', '2024-12-21 20:00:00', 'PLAYING', 'LEAGUE_OF_LEGENDS'),
    ('Astralis', 'Natus Vincere', 'PGL Major Copenhagen', '2024-12-22 18:00:00', 'BEFORE', 'CS_GO'),
    ('Manchester United', 'Liverpool', 'PREMIER LEAGUE', '2024-12-23 16:30:00', 'FINISHED', 'FOOTBALL'),
    ('Canelo Alvarez', 'Gennady Golovkin', 'The Trilogy', '2024-12-24 22:00:00', 'BEFORE', 'BOXING'),
    ('Conor McGregor', 'Nate Diaz', 'UFC 196', '2024-12-25 21:00:00', 'BEFORE', 'MMA');

INSERT INTO Odds (game_id, odds, odds_type)
VALUES
    (1, 2.5, 'One'),   -- Los Angeles Lakers win
    (1, 3.0, 'X'),     -- Draw
    (1, 1.8, 'Two'),   -- Golden State Warriors win
    (2, 1.6, 'One'),   -- G2 Esports win
    (2, 2.4, 'X'),     -- Draw
    (2, 2.2, 'Two'),   -- Team Vitality win
    (3, 1.9, 'One'),   -- Astralis win
    (3, 2.6, 'X'),     -- Draw
    (3, 2.1, 'Two'),   -- Natus Vincere win
    (4, 2.3, 'One'),   -- Manchester United win
    (4, 3.1, 'X'),     -- Draw
    (4, 1.7, 'Two'),   -- Liverpool win
    (5, 1.4, 'One'),   -- Canelo Alvarez win
    (5, 2.9, 'Two'),   -- Gennady Golovkin win
    (6, 1.5, 'One'),   -- Conor McGregor win
    (6, 2.7, 'Two');   -- Nate Diaz win

INSERT INTO Games (home, away, event_name, start_time, game_status, sport_type)
VALUES
    ('Brooklyn Nets', 'Boston Celtics', 'NBA', '2024-12-27 19:30:00', 'BEFORE', 'BASKETBALL'),
    ('Miami Heat', 'Chicago Bulls', 'NBA', '2024-12-28 20:00:00', 'BEFORE', 'BASKETBALL'),
    ('Milwaukee Bucks', 'Dallas Mavericks', 'NBA', '2024-12-29 18:00:00', 'BEFORE', 'BASKETBALL'),
    ('Phoenix Suns', 'Denver Nuggets', 'NBA', '2024-12-30 21:00:00', 'BEFORE', 'BASKETBALL'),
    ('Golden State Warriors', 'Los Angeles Clippers', 'NBA', '2024-12-31 23:30:00', 'BEFORE', 'BASKETBALL');

INSERT INTO Odds (game_id, odds, odds_type)
VALUES
    (7, 1.9, 'One'),   -- Brooklyn Nets win
    (7, 2.4, 'X'),     -- Draw
    (7, 2.0, 'Two'),   -- Boston Celtics win
    (8, 1.8, 'One'),   -- Miami Heat win
    (8, 2.6, 'X'),     -- Draw
    (8, 1.9, 'Two'),   -- Chicago Bulls win
    (9, 1.7, 'One'),   -- Milwaukee Bucks win
    (9, 2.7, 'X'),     -- Draw
    (9, 2.2, 'Two'),   -- Dallas Mavericks win
    (10, 1.8, 'One'),  -- Phoenix Suns win
    (10, 2.5, 'X'),    -- Draw
    (10, 2.3, 'Two'),  -- Denver Nuggets win
    (11, 1.6, 'One'),  -- Golden State Warriors win
    (11, 3.0, 'X'),    -- Draw
    (11, 2.1, 'Two');  -- Los Angeles Clippers win
