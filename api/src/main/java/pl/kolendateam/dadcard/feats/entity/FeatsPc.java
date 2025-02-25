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
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.feats.MapperFeats;
import pl.kolendateam.dadcard.feats.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.feats.dto.FeatsPcDTO;
import pl.kolendateam.dadcard.items.MapperItems;
import pl.kolendateam.dadcard.items.entity.Items;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "feats_pc")
@ToString
public class FeatsPc implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  Integer level;

  @ManyToOne
  @JoinColumn(name = "character_card_id")
  Character character;

  @ManyToOne
  @JoinColumn(name = "feats_id")
  Feats feat;

  @ManyToOne
  @JoinColumn(name = "class_feats_id")
  ClassFeats classFeat;

  @OneToOne(cascade = CascadeType.MERGE, orphanRemoval = true)
  @JoinColumn(
    name = "selected_id",
    referencedColumnName = "id",
    nullable = true
  )
  Prerequisite selected;

  public FeatsPc(int charId, FeatsPcDTO fDTO) {
    this.level = fDTO.level;
    this.character = new Character(charId);
    this.feat = fDTO.feat != null ? new Feats(fDTO.feat.id) : null;
    this.classFeat =
      fDTO.classFeat != null ? new ClassFeats(fDTO.classFeat.id) : null;
    if (fDTO.selected != null) {
      this.selected =
        fDTO.selected.id != null
          ? new Prerequisite(fDTO.selected.id)
          : new Prerequisite();
      //   if (fDTO.selected.feats != null && !fDTO.selected.feats.isEmpty()) {
      //     List<Feats> newFeats = MapperFeats.toFeats(fDTO.selected.feats);
      //     this.selected.setFeats(new ArrayList<>(newFeats));
      //   } else {
      //     this.selected.setFeats(null);
      //   }
      //   if (fDTO.selected.items != null && !fDTO.selected.items.isEmpty()) {
      //     List<Items> items = MapperItems.toItemsListFromDTOList(
      //       fDTO.selected.items
      //     );
      //     this.selected.setItems(new ArrayList<>(items));
      //   } else {
      //     this.selected.setItems(null);
      //   }
    }
  }
}
