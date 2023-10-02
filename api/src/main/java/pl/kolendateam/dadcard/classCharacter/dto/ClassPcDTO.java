package pl.kolendateam.dadcard.classCharacter.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class ClassPcDTO {

    public int id;
    public String className;
    public int level;
    public int[] classStudyId;

}
