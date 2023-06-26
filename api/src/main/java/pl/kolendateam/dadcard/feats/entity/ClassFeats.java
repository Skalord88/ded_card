package pl.kolendateam.dadcard.feats.entity;

import java.util.HashSet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class ClassFeats {

    int level;
    HashSet <String> classFeats;
    
}
