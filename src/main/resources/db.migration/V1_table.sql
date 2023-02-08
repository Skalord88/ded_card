CREATE TABLE ClassesPg(
    classesPgId serial PRIMARY KEY,
	  classesName VARCHAR(225),
      baseAttackBonus SMALLINT(10,1),
      hitDies SMALLINT(10,1),
      skillsPoint SMALLINT(10,1),
      fortitude SMALLINT(10,1),
      reflex SMALLINT(10,1),
      will SMALLINT(10,1),        
);

CREATE TABLE Skills(
    skillsId serial PRIMARY KEY,
    skillsName VARCHAR(50),
);

CREATE TABLE SubRace(
    subRaceId serial PRIMARY KEY,
    race VARCHAR(100), 
    subRaceName VARCHAR(100),
    lep SMALLINT(1),
    size VARCHAR(20),
    strenght SMALLINT(1),
    dextrity SMALLINT(1),
    constitution SMALLINT(1),
    intelligence SMALLINT(1),
    wisdom SMALLINT(1),
    charisma SMALLINT(1),
    movment SMALLINT(1),
    savingThrow VARCHAR(100),
    attackBonus VARCHAR(100),
    armorBonus VARCHAR(100),
    specialQuality1 VARCHAR(255),
    specialQuality2 VARCHAR(255),
    specialQuality3 VARCHAR(255),
    specialQuality4 VARCHAR(255),
    specialQuality5 VARCHAR(255),
    naturalArmorBonus SMALLINT(1),
);
