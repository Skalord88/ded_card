package pl.kolendateam.dadcard.characterCard.dto;
import java.util.ArrayList;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.characterCard.entity.Abilitys;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPg;

@NoArgsConstructor
public class CharacterDTO {
    public String characterName;
    public String playerName;
    public Abilitys ability;
    public ArrayList <ClassPg> classPgList = new ArrayList<>();

    public CharacterDTO(Character character){
        this.characterName = character.getCharacterName();
        this.playerName = character.getPlayerName();
        this.ability = character.getAbilitys();
        this.classPgList = character.getClassPgArray();
    }
}