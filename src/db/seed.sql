DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS positions CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP FUNCTION IF EXISTS fill_data;
DROP FUNCTION IF EXISTS random_between;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION random_between(low INT ,high INT) 
   RETURNS INT AS $$
BEGIN
   RETURN floor(random()* (high-low + 1) + low);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fill_data(users_number integer, default_password_hash text)
	RETURNS void AS $$
BEGIN

	CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	  email text,
	  passwordHash text
	);
	
	INSERT INTO users(id, email, passwordHash)
		SELECT
			uuid_generate_v4(),
      substr(md5(random()::text), 0, 6) || s || '@testmail.com',
			default_password_hash
		FROM generate_series(1, users_number) AS s(id);	
END;
$$ LANGUAGE plpgsql;

