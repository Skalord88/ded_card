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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.feats.dto.FeatsDTO;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "feats_pc")
public class FeatsPc implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  int level;

  @ManyToOne
  @JoinColumn(name = "character_card_id")
  Character character;

  @ManyToOne
  @JoinColumn(name = "feats_id")
  Feats feat;

  @ManyToOne
  @JoinColumn(name = "class_feats_id")
  ClassFeats classFeat;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(
    name = "selected_id",
    referencedColumnName = "id",
    nullable = true
  )
  Prerequisite selected;

  public FeatsPc(int charId, int levelDTO, FeatsDTO featDTO) {
    this.level = levelDTO;
    this.character = new Character(charId);
    this.feat = new Feats(featDTO.id);
  }
}
