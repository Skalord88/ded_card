package pl.kolendateam.dadcard.items.wondrous_items.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.wondrous_items.dto.WondrousItemsDTO;

@Entity
@Getter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@DiscriminatorValue(value = "WONDROUS_ITEM")
public class WondrousItems extends Items {

    public WondrousItems(WondrousItemsDTO item) {
        super(item);
    }

    public WondrousItems(int idZero) {
        super(idZero);
    }
}
