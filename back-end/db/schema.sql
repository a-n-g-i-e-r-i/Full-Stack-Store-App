DROP DATABASE IF EXISTS boutique_dev;
CREATE DATABASE boutique_dev;

\c boutique_dev;

CREATE TABLE boutique (
    id SERIAL PRIMARY KEY, 
    name TEXT,
    brand TEXT,
    category TEXT,
    price INT,
    in_stock BOOLEAN,
    url TEXT
);