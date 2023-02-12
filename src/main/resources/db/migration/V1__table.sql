CREATE TABLE Pg(
    class_pg_id serial PRIMARY KEY,
	  pg_races_name VARCHAR(100),
      pg_sub_races_name VARCHAR(100),
      pg_strenght INT,
      pg_base_attack_bonus INT       
);

CREATE TABLE Skills(
    skills_id serial PRIMARY KEY,
    skills_name VARCHAR(50)
);

CREATE TABLE Races(
    races_id serial PRIMARY KEY,
    races_name VARCHAR(100), 
    sub_races_name VARCHAR(100),
    strenght INT
);