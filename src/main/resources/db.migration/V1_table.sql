CREATE TABLE ClassesPg(
    ClassesPgId INT PRIMARY KEY,
	  ClassesName VARCHAR(225),
      BaseAttackBonus SMALLINT(10,1),
      HitDies SMALLINT(10,1),
      SkillsPoint SMALLINT(10,1),
      Fortitude SMALLINT(10,1),
      Reflex SMALLINT(10,1),
      Will SMALLINT(10,1),        
);

CREATE TABLE Skills(
    SkillsId INT PRIMARY KEY,
    SkillsName VARCHAR(50),
);

CREATE TABLE SubRace(
    SubRaceId INT PRIMARY KEY,
    Race VARCHAR(100), 
    SubRaceName VARCHAR(100),
    Lep SMALLINT(1),
    Size VARCHAR(20),
    Strenght SMALLINT(1),
    Dextrity SMALLINT(1),
    Constitution SMALLINT(1),
    Intelligence SMALLINT(1),
    Wisdom SMALLINT(1),
    Charisma SMALLINT(1),
    Movment SMALLINT(1),
    SavingThrow VARCHAR(100),
    AttackBonus VARCHAR(100),
    ArmorBonus VARCHAR(100),
    SpecialQuality1 VARCHAR(255),
    SpecialQuality2 VARCHAR(255),
    SpecialQuality3 VARCHAR(255),
    SpecialQuality4 VARCHAR(255),
    SpecialQuality5 VARCHAR(255),
    NaturalArmorBonus SMALLINT(1),
);
