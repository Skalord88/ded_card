package pl.kolendateam.dadcard.feats.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.feats.dto.FeatPcDTO;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
public class FeatPc implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  Integer level;

  @ManyToOne
  @JoinColumn(name = "character_card_id")
  Character character;

  @ManyToOne
  @JoinColumn(name = "feat_id")
  Feat feat;

  @ManyToOne
  @JoinColumn(name = "class_feat_id")
  ClassFeat classFeat;

  @OneToOne(cascade = CascadeType.MERGE, orphanRemoval = true)
  @JoinColumn(
    name = "selected_id",
    referencedColumnName = "id",
    nullable = true
  )
  Prerequisite selected;

  public FeatPc(int charId, FeatPcDTO fDTO) {
    this.level = fDTO.level;
    this.character = new Character(charId);
    this.feat = fDTO.feat != null ? new Feat(fDTO.feat.id) : null;
    this.classFeat =
      fDTO.classFeat != null ? new ClassFeat(fDTO.classFeat.id) : null;
    if (fDTO.selected != null) {
      this.selected =
        fDTO.selected.id != null
          ? new Prerequisite(fDTO.selected.id)
          : new Prerequisite();
      //   if (fDTO.selected.feats != null && !fDTO.selected.feats.isEmpty()) {
      //     List<Feat> newFeats = MapperFeats.toFeats(fDTO.selected.feats);
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
