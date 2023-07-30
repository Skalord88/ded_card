package pl.kolendateam.items.entity;

import java.io.Serializable;

import jakarta.persistence.Inheritance;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Inheritance
public class Items implements Serializable{

    String name;
    double cost;
    double weight;
    String description;
    
}