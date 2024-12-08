package pl.kolendateam.dadcard.feats.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "feats")
public class Feats implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  String featName;

  @JdbcTypeCode(SqlTypes.JSON)
  FeatsTypeEnum[] featType;

  String benefit;
  String normal;
  String special;

  // @JdbcTypeCode(SqlTypes.JSON)
  // Set<ModifierBonus> modifiers = new HashSet<>();

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(
    name = "modifiers_id",
    referencedColumnName = "id",
    nullable = true
  )
  Prerequisite modifiers;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(
    name = "prerequisite_list_id",
    referencedColumnName = "id",
    nullable = true
  )
  Prerequisite prerequisiteList;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(
    name = "to_select_id",
    referencedColumnName = "id",
    nullable = true
  )
  Prerequisite toSelect;

  public Feats(int idDTO) {
    this.id = idDTO;
  }
}
