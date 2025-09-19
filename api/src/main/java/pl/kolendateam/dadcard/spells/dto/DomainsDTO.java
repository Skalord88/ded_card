package pl.kolendateam.dadcard.spells.dto;

import java.util.Set;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.spells.MapperSpells;
import pl.kolendateam.dadcard.spells.entity.Domains;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;
import pl.kolendateam.dadcard.spells.repository.SpellsRepository;

@NoArgsConstructor
public class DomainsDTO {

  public int id;
  public SpellsEnum domain;
  public String grantedPower;
  public Set<DomainSpellDTO> domainSpells;

  public DomainsDTO(Domains d, SpellsRepository spellsRepository) {
    this.id = d.getId();
    this.domain = d.getDomain();
    this.grantedPower = d.getGrantedPower();
    this.domainSpells =
      MapperSpells.toDomainSpellDTOSet(d.getDomainSpells(), spellsRepository);
  }
}
