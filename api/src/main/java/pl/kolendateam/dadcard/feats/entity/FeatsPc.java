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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.characterCard.entity.Character;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "feats_pc")
public class FeatsPc implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @ManyToOne
  @JoinColumn(name = "character_card_id")
  Character character;

  @ManyToOne
  @JoinColumn(name = "feats_id")
  Feats feat;

  @JdbcTypeCode(SqlTypes.JSON)
  List<Prerequisite> selected;
}
