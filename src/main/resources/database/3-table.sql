--liquibase formatted sql
--changeset orzepowski:1

INSERT INTO public.races (racesName, subRacesName, strenght, dextrity, consitution, intelligence, wisdom, charisma) VALUES('Ork','Half Ork',2,0,0,-2,0,-2);
INSERT INTO public.races (racesName, subRacesName, strenght, dextrity, consitution, intelligence, wisdom, charisma) VALUES('Dwarf','Shild Dwarf',0,0,2,0,0,-2);
INSERT INTO public.races (racesName, subRacesName, strenght, dextrity, consitution, intelligence, wisdom, charisma) VALUES('Elf','Moon Elf',0,2,-2,0,0,0);
INSERT INTO public.races (races_name, sub_races_name, strenght, dextrity, consitution, intelligence, wisdom, charisma) VALUES('Gnome','Rock Gnome',-2,0,2,0,0,0);
INSERT INTO public.races  (races_name, sub_races_name, strenght, dextrity, consitution, intelligence, wisdom, charisma) VALUES('Halfling','Lightfoot Halfling',-2,2,0,0,0,0);
INSERT INTO public.races  (races_name, sub_races_name, strenght, dextrity, consitution, intelligence, wisdom, charisma) VALUES('Human','Damaran',0,0,0,0,0,0);
INSERT INTO public.races  (races_name, sub_races_name, strenght, dextrity, consitution, intelligence, wisdom, charisma) VALUES('Human','Calishite',0,0,0,0,0,0);
INSERT INTO public.races  (races_name, sub_races_name, strenght, dextrity, consitution, intelligence, wisdom, charisma) VALUES('Human','Chondathan',0,0,0,0,0,0);
INSERT INTO public.races  (races_name, sub_races_name, strenght, dextrity, consitution, intelligence, wisdom, charisma) VALUES('Human','Illuskan',0,0,0,0,0,0);
INSERT INTO public.races  (races_name, sub_races_name, strenght, dextrity, consitution, intelligence, wisdom, charisma) VALUES('Human','Mulan',0,0,0,0,0,0);
INSERT INTO public.races  (races_name, sub_races_name, strenght, dextrity, consitution, intelligence, wisdom, charisma) VALUES('Human','Rashem',0,0,0,0,0,0);
INSERT INTO public.races  (races_name, sub_races_name, strenght, dextrity, consitution, intelligence, wisdom, charisma) VALUES('Human','Tethyrian',0,0,0,0,0,0);