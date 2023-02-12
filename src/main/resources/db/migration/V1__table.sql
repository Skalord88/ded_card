CREATE TABLE Pg(
    classPgId serial PRIMARY KEY,
	  PgracesName VARCHAR(100),
      PgsubRacesName VARCHAR(100),
      Pgstrenght INT,
      PgBaseAttackBonus INT       
);

CREATE TABLE Skills(
    skillsId serial PRIMARY KEY,
    skillsName VARCHAR(50)
);

CREATE TABLE Races(
    racesId serial PRIMARY KEY,
    racesName VARCHAR(100), 
    subRacesName VARCHAR(100),
    strenght INT
);