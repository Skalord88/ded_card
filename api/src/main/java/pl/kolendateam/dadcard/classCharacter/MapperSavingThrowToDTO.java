package pl.kolendateam.dadcard.classCharacter;

import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.classCharacter.dto.SavingThrowDTO;
import pl.kolendateam.dadcard.classCharacter.entity.SavingThrow;

public class MapperSavingThrowToDTO {
    public static SavingThrowDTO toSavingThrowDTO(SavingThrow savingThrow, Abilitys abilitys){
    
    SavingThrowDTO savingThrowDTO = new SavingThrowDTO(
        (int)savingThrow.getFortitude()+abilitys.bonusConstitution(abilitys),
        (int)savingThrow.getReflex()+abilitys.bonusDextrity(abilitys),
        (int)savingThrow.getWill()+abilitys.bonusWisdom(abilitys)
        );      

        return savingThrowDTO;
    } 
}
