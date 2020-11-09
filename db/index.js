const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL || 'postges://postgres:JerryPine@localhost/travels')

const syncAndSeed = async() => {

    const SQL = `
        DROP TABLE IF EXISTS "Countries";
        DROP TABLE IF EXISTS "Continent";

        CREATE TABLE "Continent"(
            id INTEGER PRIMARY KEY,
            name VARCHAR(100) NOT NULL
        );
        CREATE TABLE "Countries"(
            id INTEGER PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            continent_id INTEGER REFERENCES "Continent"(id)
        );
        INSERT INTO "Continent"(id, name) VALUES(1, 'North America');
        INSERT INTO "Continent"(id, name) VALUES(2, 'South America');
        INSERT INTO "Continent"(id, name) VALUES(3, 'Europe');
        INSERT INTO "Continent"(id, name) VALUES(4, 'Asia');
        INSERT INTO "Countries"(id, name, continent_id) VALUES(1, 'Canada', 1);
        INSERT INTO "Countries"(id, name, continent_id) VALUES(2, 'Mexico', 1);
        INSERT INTO "Countries"(id, name, continent_id) VALUES(3, 'Peru', 2);
        INSERT INTO "Countries"(id, name, continent_id) VALUES(4, 'Chile', 2);
        INSERT INTO "Countries"(id, name, continent_id) VALUES(5, 'Spain', 3);
        INSERT INTO "Countries"(id, name, continent_id) VALUES(6, 'England', 3);
        INSERT INTO "Countries"(id, name, continent_id) VALUES(7, 'China', 4);
        INSERT INTO "Countries"(id, name, continent_id) VALUES(8, 'Japan', 4);
        `;

    await client.query(SQL);
};

module.exports = {
    client,
    syncAndSeed
};