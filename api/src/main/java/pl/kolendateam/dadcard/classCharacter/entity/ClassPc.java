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
public class ClassPc implements Serializable {

    int id;
    String name;
    int level;
    String savingThrow;
    double classBab;

    public void incrementLevel() {
        this.level += 1;
    }

    public int findIndexInArrayById(ArrayList<ClassPc> classPcList) {
        for (int i = 0; i < classPcList.size(); i++) {
            if (this.id == classPcList.get(i).getId()) {
                return i;
            }
        }
        return -1;
    }

    public int findLevelInArrayById(ArrayList<ClassPc> classPcList, int id) {
        for (ClassPc clPc : classPcList) {
            if (this.id == id && clPc.level == 1) {
                return clPc.getLevel();
            }
        }
        return 0;
    }
}
