package pl.kolendateam.dadcard.characterCard.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@AllArgsConstructor
public class CharactertAbilityDTO {

    public String ability;

    public void setAbilityDTO(String ability){
        this.ability = ability;
    }
    
}
