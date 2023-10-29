package pl.kolendateam.dadcard.characterCard.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class SpellsInCharLevel implements Serializable {

    int level;
    ArrayList<Integer> spells;

}
