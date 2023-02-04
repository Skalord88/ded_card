@Component
public class Start {
    
    private ClassesRepo classesRepo;
    
    public Start(ClassesRepo classesRepo){
        this.classesRepo=classesRepo;
    }

    public void runClasses(){
        Classes classes = new Classes("Barbarian","fight");
        classesRepo.save(classes);
    }
}
