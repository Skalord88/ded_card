package ded_card;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class RunHitDie {
    
    private HitDieRepo hitDieRepo;

    @Autowired
    public RunHitDie(HitDieRepo hitDieRepo){
        this.hitDieRepo = hitDieRepo;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void runHitDie(){
        HitDie hitDie1 = new HitDie("d12", 12);
        hitDieRepo.save(hitDie1);
        HitDie hitDie2 = new HitDie("d10", 10);
        hitDieRepo.save(hitDie2);
        HitDie hitDie3 = new HitDie("d8", 8);
        hitDieRepo.save(hitDie3);
        HitDie hitDie4 = new HitDie("d6", 6);
        hitDieRepo.save(hitDie4);
        HitDie hitDie5 = new HitDie("d4", 4);
        hitDieRepo.save(hitDie5);
    }
}
