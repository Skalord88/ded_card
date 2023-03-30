package pl.kolendateam.dadcard.classCharacter.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class ClassPg implements Serializable{
    
    int id;
    String name;
    int level;
    
}
