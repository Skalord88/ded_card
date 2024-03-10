package pl.kolendateam.dadcard.items.wondrous_items.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.entity.Items;

@Entity
@NoArgsConstructor
@DiscriminatorValue(value = "WONDROUS_ITEM")
public class WondrousItems extends Items {}
