-- DROP FUNCTION IF EXISTS get_users_by_email;
-- CREATE OR REPLACE FUNCTION get_users_by_email(user_email text)
-- 		RETURNS SETOF users AS $$
-- 	SELECT * FROM users
-- 	WHERE email = user_email;
-- $$ LANGUAGE SQL;


