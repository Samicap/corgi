-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS parents CASCADE;
CREATE TABLE parents (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);


DROP TABLE IF EXISTS childs CASCADE;
CREATE TABLE childs (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL, 
  avatar_url VARCHAR(255) NOT NULL
);


DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  message TEXT,
  child_id_to INTEGER REFERENCES childs(id) ON DELETE CASCADE,
  child_id_from INTEGER REFERENCES childs(id) ON DELETE CASCADE
);

