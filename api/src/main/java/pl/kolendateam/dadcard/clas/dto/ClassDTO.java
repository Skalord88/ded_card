package pl.kolendateam.dadcard.clas.dto;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ClassDTO {
    public int id;
    public String className;
    public String avatarUrl;

    public ClassBaseDTO(Class class){
        this.avatarUrl = class.getAvatarUrl();
        this.className = class.getClassName();
        this.id = class.getId();
    }
    
}
