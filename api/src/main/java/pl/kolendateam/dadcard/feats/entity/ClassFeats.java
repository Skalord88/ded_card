package pl.kolendateam.dadcard.feats.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
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
  @JoinColumn(name = "class_character_id")
  ClassCharacter classCharacter;

  @ManyToOne
  @JoinColumn(name = "feats_id")
  Feats feats;

  @JdbcTypeCode(SqlTypes.JSON)
  List<Prerequisite> listOfBonus;
}
