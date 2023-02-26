CREATE TABLE modAbilities(
    mod_abilities_Id serial PRIMARY KEY,
    abilities INT,
    modAbilities INT,
    bonusSpell1 INT,
    bonusSpell2 INT,
    bonusSpell3 INT,
    bonusSpell4 INT,
    bonusSpell5 INT,
    bonusSpell6 INT,
    bonusSpell7 INT,
    bonusSpell8 INT,
    bonusSpell9 INT
);

CREATE TABLE pg(
    pg_Id serial PRIMARY KEY,
      pgName VARCHAR(100)
);

CREATE TABLE races(
    races_Id serial PRIMARY KEY,
    races_Name VARCHAR(100), 
    sub_Races_Name VARCHAR(100),
    raceAbilities VARCHAR(300),
    raceSkills VARCHAR(300)
);

CREATE TABLE skills(
    skills_Id serial PRIMARY KEY,
    skillsName VARCHAR(50)
);

CREATE TABLE classes(
    class_Id serial PRIMARY KEY,
      className VARCHAR(100),
      classPrestige boolean,
      classBaseAttackBonus INT,
      classSavingThrow VARCHAR(3),
      classSkills VARCHAR(300)
);