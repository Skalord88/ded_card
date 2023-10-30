package pl.kolendateam.dadcard.spells.entity;

import java.io.Serializable;
import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class SpellsInCharLevel implements Serializable {

    int level;
    ArrayList<Integer> spells;

}
