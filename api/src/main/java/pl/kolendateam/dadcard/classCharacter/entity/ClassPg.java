package pl.kolendateam.dadcard.classCharacter.entity;

import java.io.Serializable;
import java.util.ArrayList;

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
    String savingThrow;
    double classBab;

    public void incrementLevel(){
        this.level +=1;
    }

    public int findIndexInArrayById(ArrayList<ClassPg> classPgList){
        for(int i = 0; i < classPgList.size(); i++) {
            if(this.id == classPgList.get(i).getId()){
                return i;
            }  
        }return -1;
    }

    public int findLevelInArrayById(ArrayList<ClassPg> classPgList, int id) {
        for(ClassPg clPg : classPgList) {
            if(this.id == id && clPg.level == 1){
                return clPg.getLevel();
            }
        }return 0;
    }
}
