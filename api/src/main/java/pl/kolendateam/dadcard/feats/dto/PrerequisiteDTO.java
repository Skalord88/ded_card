package pl.kolendateam.dadcard.feats.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.MapperAbilitysToDTO;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;
import pl.kolendateam.dadcard.items.dto.ItemsDTO;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.race.dto.RaceDTO;
import pl.kolendateam.dadcard.race.dto.SubRaceDTO;
import pl.kolendateam.dadcard.race.entity.Race;
import pl.kolendateam.dadcard.race.entity.SubRace;
import pl.kolendateam.dadcard.size.dto.SizeDTO;
import pl.kolendateam.dadcard.size.entity.Size;
import pl.kolendateam.dadcard.skills.dto.SkillsDTO;

@AllArgsConstructor
@NoArgsConstructor
public class PrerequisiteDTO {

  public String type;
  public int value;

  // public Object prerequisite;

  public PrerequisiteDTO(Prerequisite pre) {
    this.type = pre.getType();
    this.value = pre.getValue();
    // this.prerequisite = null;
  }
  // public PrerequisiteDTO(Prerequisite pre){
  // , Object obj
  // ) {
  // this.type = pre.getType();
  // this.value = pre.getValue();
  // if (pre.getType().equals("feat")) {
  //   this.prerequisite = new FeatsDTO((Feats) obj);
  // } else if (pre.getType().equals("item")) {
  //   this.prerequisite = new ItemsDTO((Items) obj);
  // } else if (pre.getType().equals("race")) {
  //   this.prerequisite = new RaceDTO((Race) obj);
  // } else if (pre.getType().equals("subRace")) {
  //   this.prerequisite = new SubRaceDTO((SubRace) obj);
  // } else if (pre.getType().equals("size")) {
  //   this.prerequisite = new SizeDTO((Size) obj);
  // }
  // else if (pre.getType().equals("bab")) {
  //   this.prerequisite = pre.getValue();
  // } else if (
  //   pre.getType().equals("strength") ||
  //   pre.getType().equals("dextrity") ||
  //   pre.getType().equals("constitution") ||
  //   pre.getType().equals("intelligence") ||
  //   pre.getType().equals("wisdom") ||
  //   pre.getType().equals("charisma")
  // ) {
  //   this.prerequisite = MapperAbilitysToDTO.toAbilityDTO((Abilitys) obj);
  // } else if (pre.getType().equals("race")) {
  //   this.prerequisite = new RaceDTO((Race) obj);
  // } else if (pre.getType().equals("subRace")) {
  //   this.prerequisite = new SubRaceDTO((SubRace) obj);
  // } else if (pre.getType().equals("fortitude")) {
  //   this.prerequisite = pre.getValue();
  // } else if (pre.getType().equals("reflex")) {
  //   this.prerequisite = pre.getValue();
  // } else if (pre.getType().equals("will")) {
  //   this.prerequisite = pre.getValue();
  // }
  // }
}
