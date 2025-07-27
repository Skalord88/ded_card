package pl.kolendateam.dadcard.feats.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.classCharacter.entity.ClassCharacter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "class_feats")
public class ClassFeats implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  int level;

  @ManyToOne
  @JoinColumn(
    name = "class_character_id",
    foreignKey = @jakarta.persistence.ForeignKey(
      name = "fk_class_feats_class_character"
    )
  )
  ClassCharacter classCharacter;

  @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.REFRESH })
  @JoinColumn(
    name = "feats_id",
    foreignKey = @jakarta.persistence.ForeignKey(name = "fk_class_feats_feats")
  )
  Feats feats;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(
    name = "selected_id",
    referencedColumnName = "id",
    nullable = true,
    foreignKey = @jakarta.persistence.ForeignKey(
      name = "fk_class_feats_selected"
    )
  )
  Prerequisite selected;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(
    name = "to_select_id",
    referencedColumnName = "id",
    nullable = true,
    foreignKey = @jakarta.persistence.ForeignKey(
      name = "fk_class_feats_to_select"
    )
  )
  Prerequisite toSelect;

  public ClassFeats(int idDTO) {
    this.id = idDTO;
  }
}
