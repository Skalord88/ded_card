package pl.kolendateam.dadcard.characterCard.dto;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class AbilityDTO {

    public int streght;
    public int dextrity;
    public int constitution;
    public int intelligence;
    public int wisdom;
    public int charisma;


    public AbilityDTO(int streght, int dextrity, int constitution, int intelligence, int wisdom, int charisma){

        this.streght = streght;
        this.dextrity = dextrity;
        this.constitution = constitution;
        this.intelligence = intelligence;
        this.wisdom = wisdom;
        this.charisma = charisma;

    }
    
}
