DROP TABLE IF EXISTS user_types CASCADE;
DROP FUNCTION IF EXISTS fill_data;

CREATE OR REPLACE FUNCTION fill_data(default_password_hash text)
	RETURNS void AS $$
BEGIN

		CREATE TABLE user_types (
    	id SERIAL,
	   	name text,
			password_hash text,
	   	scope text[]
		);

		INSERT INTO user_types(name, password_hash, scope)
		VALUES
			('commonUser', default_password_hash, array['profile:me:read']),
			('admin', default_password_hash, array['profile:me:read', 'profile:delete']);
	
END;
$$ LANGUAGE plpgsql;

