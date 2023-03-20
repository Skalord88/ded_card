package pl.kolendateam.dadcard.characterCard.dto;

import java.util.HashMap;

import org.json.JSONArray;

import pl.kolendateam.dadcard.characterCard.entity.AbilityEnum;

public class AbilityMapperDTO {

    public static String toMapAbilityDTO(AbilityDTO abilityDTO){

        HashMap <AbilityEnum,Integer> abilityMap = new HashMap();

        abilityMap.put(AbilityEnum.STRENGHT, abilityDTO.streght);
        abilityMap.put(AbilityEnum.DEXTRITY, abilityDTO.dextrity);
        abilityMap.put(AbilityEnum.CONSTITUTION, abilityDTO.constitution);
        abilityMap.put(AbilityEnum.INTELLIGENCE, abilityDTO.intelligence);
        abilityMap.put(AbilityEnum.WISDOM, abilityDTO.wisdom);
        abilityMap.put(AbilityEnum.CHARISMA, abilityDTO.charisma);

        JSONArray jsonAbilityMap = new JSONArray(abilityMap);
        String jsonAbilityString = jsonAbilityMap.toString();

        return jsonAbilityString;

    }
}
