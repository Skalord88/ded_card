package pl.kolendateam.dadcard.feats;

import pl.kolendateam.dadcard.feats.entity.CharacterFeat;

public class MapperCharacterFeatSpecial {

    public static String toCharacterFeatSpecial(CharacterFeat characterFeats){

        String characterFeatSpecial = switch(characterFeats.getCharacterFeatName()){
            case "Rage" -> 
                characterFeats.getLevelOfFeat()+"/day";
            case "Trap sense" -> 
                "+"+characterFeats.getLevelOfFeat();
            case "Damage reduction" ->
                "DR"+characterFeats.getLevelOfFeat();
            case "Inspire courage" ->
                "+"+characterFeats.getLevelOfFeat();
            case "Wild Shape" -> 
                characterFeats.wildShape(characterFeats.getLevelOfFeat());
            case "Fighter Bonus Feats" ->
                characterFeats.getLevelOfFeat()+" bonus feats";
            case "Monk Bonus Feats" ->
                characterFeats.getLevelOfFeat()+" bonus feats";
            case "Flurry of Blows" ->
                characterFeats.flurryOfBlows(characterFeats.getLevelOfFeat());
            case "Unarmed Strike" ->
                characterFeats.unarmedStrike(characterFeats.getLevelOfFeat());
            case "Slow Fall" ->
                characterFeats.slowFall(characterFeats.getLevelOfFeat());
            case "AC Bonus" ->
                characterFeats.aCBonus(characterFeats.getLevelOfFeat());
            case "Ki Strike" ->
                characterFeats.kiStrike(characterFeats.getLevelOfFeat());
            case "Smite Evil" ->
                characterFeats.getLevelOfFeat()+"/day";
            case "Remove Disease" ->
                characterFeats.getLevelOfFeat()+"/week";
            case "Favored Enemy" ->
                characterFeats.favoredEnemy(characterFeats.getLevelOfFeat());
            case "Combat Style" ->
                "archery or two-weapon combat";
            case "Improved Combat Style" ->
                "archery or two-weapon combat";
            case "Combat Style Mastery" ->
                "archery or two-weapon combat";
            case "Sneak Attack" ->
                characterFeats.getLevelOfFeat()+"d6";
            default -> null;
        };
        return characterFeatSpecial;
    }
    
}
