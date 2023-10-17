package pl.kolendateam.dadcard.spells.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SpellLevel implements Serializable{

    int level;
    SpellsEnum classDomain;

}
