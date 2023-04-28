package pl.kolendateam.dadcard.classCharacter;

import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.classCharacter.dto.SavingThrowDTO;
import pl.kolendateam.dadcard.classCharacter.entity.SavingThrow;

public class MapperSavingThrowToDTO {
    public static SavingThrowDTO toSavingThrowDTO(SavingThrow savingThrow, Abilitys abilitys){
    
    SavingThrowDTO savingThrowDTO = new SavingThrowDTO(
        (int)savingThrow.getFortitude()+abilitys.getConstitutionBonus(),
        (int)savingThrow.getReflex()+abilitys.getDextrityBonus(),
        (int)savingThrow.getWill()+abilitys.getWisdomBonus());      

        return savingThrowDTO;
    } 
}
