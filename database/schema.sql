-- DROPPING TABLES

DROP TABLE IF EXISTS Bets;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS Odds;
DROP TABLE IF EXISTS User_roles;
DROP TABLE IF EXISTS Transactions;
DROP TABLE IF EXISTS Promotions;
DROP TABLE IF EXISTS Odds;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Games;
DROP TYPE IF EXISTS role;
DROP TYPE IF EXISTS transactionStatus;
DROP TYPE IF EXISTS transactionType;
DROP TYPE IF EXISTS gameStatus;
DROP TYPE IF EXISTS sportType;
DROP TYPE IF EXISTS betResult;
DROP TYPE IF EXISTS betStatusType;
DROP TYPE IF EXISTS oddsType;
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

CREATE type transactionType as enum('');
CREATE type transactionStatus as enum();


create table Transactions(
    transaction_id serial NOT NULL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES Users,
    transaction_type transactionType NOT NULL,
    amount decimal(12, 2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status transactionType NOT NULL
);

create type gameStatus as enum('BEFORE', 'PLAYING', 'FINISHED');
create type sportType as enum('FOOTBALL', 'BASKETBALL', 'LEAGUE_OF_LEGENDS', 'CS_GO', 'BOXING', 'MMA');

create table Games(
    game_id serial NOT NULL PRIMARY KEY,
    home VARCHAR(100) NOT NULL,
    away VARCHAR(100) NOT NULL,
    event_name VARCHAR(100) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    game_status gameStatus NOT NULL,
    sport_type sportType NOT NULL
);

create type betStatusType as enum('SETTLED', 'UNSETTLED');
create type betResult  as enum('PLACEHOLDER');

create table Bets(
    bet_id serial not null PRIMARY KEY,
    user_id integer not null REFERENCES Users,
    game_id integer not null REFERENCES Games,
    bet_amount decimal(12, 2) NOT NULL,
    odds decimal(2, 2) NOT NULL,
    status BetStatusType NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    bet_result betResult
);

create type oddsType as enum('PLACEHOLDER');

create table Odds(
    odds_id serial NOT NULL PRIMARY KEY,
    game_id integer NOT NULL REFERENCES Games,
    odds int NOT NULL,
    odds_type oddsType NOT NULL
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

INSERT INTO Games (home, away, event_name, start_time, game_status, sport_type)
VALUES
    ('Los Angeles Lakers', 'Golden State Warriors', 'NBA', '2024-12-20 19:30:00', 'BEFORE', 'BASKETBALL'),
    ('G2 Esports', 'Team Vitality', 'LEC Winter Split', '2024-12-21 20:00:00', 'PLAYING', 'LEAGUE_OF_LEGENDS'),
    ('Astralis', 'Natus Vincere', 'PGL Major Copenhagen', '2024-12-22 18:00:00', 'BEFORE', 'CS_GO'),
    ('Manchester United', 'Liverpool', 'PREMIER LEAGUE', '2024-12-23 16:30:00', 'FINISHED', 'FOOTBALL'),
    ('Canelo Alvarez', 'Gennady Golovkin', 'The Trilogy', '2024-12-24 22:00:00', 'BEFORE', 'BOXING'),
    ('Conor McGregor', 'Nate Diaz', 'UFC 196', '2024-12-25 21:00:00', 'BEFORE', 'MMA');