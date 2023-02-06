package ded_card.exemple;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    //...

    @OneToOne(cascade = CascadeType.ALL)
    @JoinTable(name = "emp_workstation", 
      joinColumns = 
        { @JoinColumn(name = "employee_id", referencedColumnName = "id") },
      inverseJoinColumns = 
        { @JoinColumn(name = "workstation_id", referencedColumnName = "id") })
    private WorkStation workStation;

    public WorkStation getWorkStation() {
        return workStation;
    }

    public void setWorkStation(WorkStation workStation) {
        this.workStation = workStation;
    }

    //... getters and setters
}
