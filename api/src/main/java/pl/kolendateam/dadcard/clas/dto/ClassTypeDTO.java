package pl.kolendateam.dadcard.clas.dto;

import java.util.ArrayList;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ClassTypeDTO {

    public String classType;
    public String avatarClassTypeUrl;

    public ArrayList<ClassDTO> classes;

    public ClassTypeBaseDTO(Class class){
        this.avatarClassTypeUrl = class.getAvatarUrl();
        this.classType = class.getClassType();
        ClassBaseDTO tempClass = new ClassBaseDTO(class);
        this.classes = new ArrayList<ClassesBaseDTO>();
        this.classes.add(tempClass);
    }
    
}
