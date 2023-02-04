package ded_card;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class RunClasses {

    private ClassesRepo classesRepo;

    @Autowired
    public RunClasses(ClassesRepo classesRepo) {
        this.classesRepo = classesRepo;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void runClass() {
        Classes classes1 = new Classes("Barbarian", "fight");
        classesRepo.save(classes1);
        Classes classes2 = new Classes("Bard", "cast");
        classesRepo.save(classes2);
        Classes classes3 = new Classes("Cleric", "cast");
        classesRepo.save(classes3);
        Classes classes4 = new Classes("Druid", "cast");
        classesRepo.save(classes4);
        Classes classes5 = new Classes("Fighter", "fight");
        classesRepo.save(classes5);
        Classes classes6 = new Classes("Monk", "fight");
        classesRepo.save(classes6);
        Classes classes7 = new Classes("Paladin", "fight");
        classesRepo.save(classes7);
        Classes classes8 = new Classes("Ranger", "fight");
        classesRepo.save(classes8);
        Classes classes9 = new Classes("Rougue", "fight");
        classesRepo.save(classes9);
        Classes classes10 = new Classes("Sourcerer", "cast");
        classesRepo.save(classes10);
        Classes classes11 = new Classes("Wizard", "cast");
        classesRepo.save(classes11);
    }
}
