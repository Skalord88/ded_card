package pl.kolendateam.dadcard.items.wondrous_items.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.wondrous_items.dto.WondrousItemsDTO;
import pl.kolendateam.dadcard.spells.entity.Spells;

@Entity
@Getter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@DiscriminatorValue(value = "WONDROUS_ITEM")
public class WondrousItems extends Items {

  @Enumerated(EnumType.STRING)
  ItemTypeEnum wondrousType;

  @ManyToMany(cascade = CascadeType.MERGE)
  @JoinTable(
    name = "items_spells",
    joinColumns = @JoinColumn(name = "items_id"),
    inverseJoinColumns = @JoinColumn(name = "spells_id")
  )
  Set<Spells> spells;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(
    name = "modifiers_id",
    referencedColumnName = "id",
    nullable = true
  )
  Prerequisite modifiers;

  public WondrousItems(WondrousItemsDTO item) {
    super(item);
  }

  public WondrousItems(int idZero) {
    super(idZero);
  }

  @Override
  public String toString() {
    return (
      "id=" +
      getId() +
      ", getType()=" +
      getItemType() +
      ", WondrousItems [wondrousType=" +
      wondrousType +
      ", spells=" +
      spells +
      ", modifiers=" +
      modifiers +
      ", getCost()=" +
      getCost() +
      ", getName()=" +
      getName() +
      "]"
    );
  }
}
