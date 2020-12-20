DROP FUNCTION IF EXISTS get_credentials_by_user_type;
CREATE OR REPLACE FUNCTION get_credentials_by_user_type(user_type text)
  RETURNS SETOF user_types AS $$
DECLARE
	user_type_check BOOLEAN;
BEGIN
	 SELECT EXISTS(
 		SELECT * FROM user_types
	  WHERE name = user_type
  ) INTO user_type_check;
	
	IF (user_type_check = false) THEN
 		RAISE EXCEPTION 'User type with provided name does not exist'; 
 	END IF;
	
	RETURN QUERY
	SELECT * FROM user_types
	WHERE name = user_type;
END;
$$ LANGUAGE plpgsql;