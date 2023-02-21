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
	  pg_Races_Name VARCHAR(100),
      pg_SubRaces_Name VARCHAR(100),
      pg_Strenght INT,
      pg_Modpg_Strenght INT,
      pg_Dextrity INT,
      pg_Modpg_Dextrity INT,
      pg_Consitution INT,
      pg_Modpg_Consitution INT,
      pg_Intelligence INT,
      pg_Modpg_Intelligence INT,
      pg_Wisdom INT,
      pg_Modpg_Wisdom INT,
      pg_Charisma INT,
      pg_Modpg_Charisma INT,
      pg_Base_Attack_Bonus INT,
      appraise boolean,
      balance boolean,
      bluff boolean,
      climb boolean,
      concentration boolean,
      craft boolean,
      diplomacy boolean,
      disable_device boolean,
      disguise boolean,
      escape_artist boolean,
      gather_information boolean,
      handle_animal boolean,
      heal boolean,
      intimidate boolean,
      jump boolean,
      knowledge boolean,
      listen boolean,
      move_silently boolean,
      perform boolean,
      profession boolean,
      ride boolean,
      search boolean,
      sense_motive boolean,
      sleight_of_hand boolean,
      spellcraft boolean,
      spot boolean,
      survival boolean,
      swim boolean,
      tumble boolean,
      use_magic_device boolean,
      use_rope boolean
);

CREATE TABLE races(
    races_Id serial PRIMARY KEY,
    races_Name VARCHAR(100), 
    sub_Races_Name VARCHAR(100),
    raceAbilities VARCHAR(6),
    raceSkills VARCHAR(300),
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