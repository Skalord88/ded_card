package pl.kolendateam.dadcard.spells.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SpellsInLevel implements Serializable {

    int level;
    Integer[] spells;

}
