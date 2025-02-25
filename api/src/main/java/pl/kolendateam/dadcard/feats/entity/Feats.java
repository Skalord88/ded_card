package pl.kolendateam.dadcard.feats.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.feats.dto.FeatsDTO;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteFeatsDTO;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "feats")
@ToString
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

  @OneToOne(cascade = CascadeType.MERGE)
  @JoinColumn(
    name = "modifiers_id",
    referencedColumnName = "id",
    nullable = true
  )
  Prerequisite modifiers;

  @OneToOne(cascade = CascadeType.MERGE)
  @JoinColumn(
    name = "prerequisite_list_id",
    referencedColumnName = "id",
    nullable = true
  )
  Prerequisite prerequisiteList;

  @OneToOne(cascade = CascadeType.MERGE)
  @JoinColumn(
    name = "to_select_id",
    referencedColumnName = "id",
    nullable = true
  )
  Prerequisite toSelect;

  @OneToOne(cascade = CascadeType.MERGE)
  @JoinColumn(
    name = "selected_id",
    referencedColumnName = "id",
    nullable = true
  )
  Prerequisite selected;

  public Feats(int idDTO) {
    this.id = idDTO;
  }

  public Feats(FeatsDTO dto) {
    this.id = dto.id;
    this.featName = dto.featName;
    this.featType = dto.featType;
    this.benefit = dto.benefit;
    this.normal = dto.normal;
    this.special = dto.special;
  }

  public Feats(PrerequisiteFeatsDTO featDTO) {
    System.out.println("PrerequisiteFeatsDTO Selected: " + featDTO);
    this.id = featDTO.id;
  }
}
