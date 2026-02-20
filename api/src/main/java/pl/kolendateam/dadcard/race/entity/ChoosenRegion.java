package pl.kolendateam.dadcard.race.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.criteria.CriteriaBuilder.In;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.race.dto.ChoosenRegionDTO;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ChoosenRegion implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @JdbcTypeCode(SqlTypes.JSON)
  LanguageEnum[] bonusLanguages;

  Integer preferedDeities;

  Integer regionalFeats;

  Integer[] regionalItems;

  Integer regionalAlignment;

  public ChoosenRegion(ChoosenRegionDTO choosenRegionDTO) {
    this.id = choosenRegionDTO.id;
    this.bonusLanguages = choosenRegionDTO.bonusLanguages;
    this.preferedDeities = choosenRegionDTO.preferedDeities;
    this.regionalFeats = choosenRegionDTO.regionalFeats;
    this.regionalItems = choosenRegionDTO.regionalItems;
    this.regionalAlignment = choosenRegionDTO.regionalAlignment;
  }
}
