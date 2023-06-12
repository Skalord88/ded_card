package pl.kolendateam.dadcard.size.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Size {
    
    SizeEnum size;
    int bonusAttackAc;
    int hide;
    int grapple;

    public void sizeBonus(SizeEnum sizeEnum){
        this.size=sizeEnum;

        int bonusSize=0;
        int hideSize=0;
        int grappleSize=0;
        switch (size) {
            case TINY:
            bonusSize = 2;
            hideSize = 8;
            grappleSize = -8;
            break;
            case SMALL:
            bonusSize = 1;
            hideSize = 4;
            grappleSize = -4;
            break;
            case MEDIUM:
            bonusSize = 0;
            hideSize = 0;
            grappleSize = 0;
            break;
            case LARGE:
            bonusSize = -1;
            hideSize = -4;
            grappleSize = 4;
            break;
        }
        this.bonusAttackAc=bonusSize;
        this.hide=hideSize;
        this.grapple=grappleSize;
    }

}
