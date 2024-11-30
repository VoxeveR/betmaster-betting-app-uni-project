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

create type gameStatus as enum('BEFORE', 'PLAYING', 'AFTER');
create type sportType as enum('FOOTBALL', 'BASKETBALL', 'LEAGUE OF LEGENDS', 'CS:GO', 'BOXING', 'MMA');

create table Games(
    game_id serial NOT NULL PRIMARY KEY,
    home VARCHAR(100) NOT NULL,
    away VARCHAR(100) NOT NULL,
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
    bet_amout decimal(12, 2) NOT NULL,
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

create type promotioType as enum('PLACEHOLDER');

create table Promotions(
    promotion_id serial NOT NULL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES Users,
    promotion_name VARCHAR(200) NOT NULL,
    promotion_type promotioType NOT NULL,
    start_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP NOT NULL,
    requirements VARCHAR(200) NOT NULL
);

create type positionTypes as enum('PLACEHOLDER');

create table Employees(
    employee_id serial NOT NULL PRIMARY KEY,
    name varchar(60) NOT NULL,
    surname varchar(60) NOT NULL,
    position positionTypes NOT NULL,
    email VARCHAR(20) NOT NULL,
    phone_number numeric(11) NOT NULL,
    salary decimal(12, 2) NOT NULL,
    nr_konta numeric(26) NOT NULL
);