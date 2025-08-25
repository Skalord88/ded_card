package pl.kolendateam.dadcard.items.common_item.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.entity.Item;

@Entity
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@DiscriminatorValue(value = "COMMON_ITEM")
public class CommonItems extends Item {

  public CommonItems(int idZero) {
    super(idZero);
  }
}
