CREATE DATABASE "SFXDX";

\c SFXDX

CREATE TABLE Orders (
    Id int,
    OrdersId NUMERIC(78,0),
    AmountA NUMERIC(78,0),
    AmountB NUMERIC(78,0),
    TokenA CHAR(42),
    TokenB CHAR(42),
    UserAddres CHAR(42),
    IsMarket BOOLEAN,
    IsActive BOOLEAN
);