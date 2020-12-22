DROP TABLE IF EXISTS user_types CASCADE;
DROP FUNCTION IF EXISTS fill_data;

CREATE OR REPLACE FUNCTION fill_data(default_password_hash text)
	RETURNS void AS $$
BEGIN

		CREATE TABLE user_types (
    	id SERIAL,
	   	name text,
			password_hash text,
	   	scope text[],
			ttl text
		);

		INSERT INTO user_types(name, password_hash, scope, ttl)
		VALUES
			('commonUser', default_password_hash, array['profile:me:read'], '365d'),
			('admin', default_password_hash, array['profile:me:read', 'profile:delete'], '365d');
	
END;
$$ LANGUAGE plpgsql;

