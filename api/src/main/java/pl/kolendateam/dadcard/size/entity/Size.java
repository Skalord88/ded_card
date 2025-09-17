package pl.kolendateam.dadcard.size.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.modifier.entity.Prerequisite;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Size implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @Enumerated(EnumType.STRING)
  SizeEnum size;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(
    name = "modifiers_id",
    referencedColumnName = "id",
    nullable = true
  )
  Prerequisite modifiers;

  public Size(int n) {
    this.id = n;
  }
}
