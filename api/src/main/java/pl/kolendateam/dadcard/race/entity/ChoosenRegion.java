package pl.kolendateam.dadcard.race.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.criteria.CriteriaBuilder.In;
import java.io.Serializable;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.race.dto.ChoosenRegionDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "choosen_region")
public class ChoosenRegion {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @JdbcTypeCode(SqlTypes.JSON)
  @Column(name = "bonus_languages")
  private Set<Integer> bonusLanguages;

  @Column(name = "prefered_deities")
  private Integer preferedDeities;

  @Column(name = "regional_feats")
  private Integer regionalFeats;

  @JdbcTypeCode(SqlTypes.JSON)
  @Column(name = "regional_items")
  private Set<Integer> regionalItems;

  @Column(name = "regional_alignment")
  private Integer regionalAlignment;

  public ChoosenRegion(ChoosenRegionDTO choosenRegionDTO) {
    this.id = choosenRegionDTO.id;
    this.bonusLanguages = choosenRegionDTO.bonusLanguages;
    this.preferedDeities = choosenRegionDTO.preferedDeities;
    this.regionalFeats = choosenRegionDTO.regionalFeats;
    this.regionalItems = choosenRegionDTO.regionalItems;
    this.regionalAlignment = choosenRegionDTO.regionalAlignment;
  }
}
