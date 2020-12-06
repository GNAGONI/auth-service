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

CREATE OR REPLACE FUNCTION fill_data(users_id text[], default_password_hash text)
	RETURNS void AS $$
DECLARE
	user_id text;
BEGIN

	CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	  email text,
	  password_hash text
	);

	FOREACH user_id IN ARRAY users_id
		LOOP
			INSERT INTO users(id, email, password_hash)
			SELECT
				user_id::uuid,
				'user' || s || '@testmail.com',
			  default_password_hash
			FROM generate_series(1, 1) AS s(id);
		END LOOP;
END;
$$ LANGUAGE plpgsql;

