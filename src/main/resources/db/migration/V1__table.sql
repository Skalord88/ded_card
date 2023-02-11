CREATE TABLE ClassesPg(
    classPgId serial PRIMARY KEY,
	  nameClassPg VARCHAR(225),
      baseAttackBonus INT        
);

CREATE TABLE Skills(
    skillsId serial PRIMARY KEY,
    skillsName VARCHAR(50)
);

CREATE TABLE SubRace(
    racesId serial PRIMARY KEY,
    racesName VARCHAR(100), 
    subRacesName VARCHAR(100),
    strenght INT
);