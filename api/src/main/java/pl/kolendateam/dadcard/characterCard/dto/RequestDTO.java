package pl.kolendateam.dadcard.characterCard.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class RequestDTO {

    @NotNull
    public int id;

    @Positive(message = "shold be more that 0")
    public int rankToAdd;
    
}
