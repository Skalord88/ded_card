import ded_card.Entity;
import ded_card.Id;

@Entity
public class Classes {
    
    
    @Id
    private Long id;

    private String name;
    
    private String type;

    public Classes() {
    }

    public Classes(String name, String type) {
        this.name = name;
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }



}
