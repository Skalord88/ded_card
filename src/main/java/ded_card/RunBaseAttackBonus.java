package ded_card;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class RunBaseAttackBonus{

    private BaseAttackBonusRepo baseAttackBonusRepo;
    
    @Autowired
    public RunBaseAttackBonus(BaseAttackBonusRepo baseAttackBonusRepo){
        this.baseAttackBonusRepo = baseAttackBonusRepo;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void runBaseAttackBonus(){
        BaseAttackBonus bonusAttackBonus1 = new BaseAttackBonus("high",1,1);
        baseAttackBonusRepo.save(bonusAttackBonus1);
        BaseAttackBonus bonusAttackBonus2 = new BaseAttackBonus("medium",0.75,0.75);
        baseAttackBonusRepo.save(bonusAttackBonus2);
        BaseAttackBonus bonusAttackBonus3 = new BaseAttackBonus("low",0,0.5);
        baseAttackBonusRepo.save(bonusAttackBonus3);
    }
}