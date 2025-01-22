package pl.kolendateam.dadcard.spells.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class SpellsTable implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @Enumerated(EnumType.STRING)
  SpellsEnum magicClass;

  @Enumerated(EnumType.STRING)
  SpellsEnum spellsDayKnown;

  @JdbcTypeCode(SqlTypes.JSON)
  List<SpellsInLevel> spellsInLevel = new ArrayList<>();
}
