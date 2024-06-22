import { useEffect, useState } from "react";
import {
  Armor,
  ClassPc,
  Enchantment,
  ItemsList,
  Shield,
  Weapon
} from "./interfaces";
import { emptyItemsList, enchantItems } from "./variables";
import {
  EnchantmentCost,
  NameEnchanted,
  addToDrop,
  itemInDrop,
  updateEnchantment
} from "./functions";
import { AddedNewItems } from "./AddedNewItems";

export interface DropdownProps {
  options: itemInDrop[];
  action: (option: any) => void;
}

export const DropdownComponent: React.FC<DropdownProps> = ({
  options,
  action
}) => {
  const [dropItem, setDropItem] = useState<itemInDrop>();
  const selectItem = (option: itemInDrop) => {
    action(option.item);
    setIsOpen(false);
    setDropItem(option);
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="rpgui-dropdown-imp"
        onMouseLeave={handleMouseLeave}
        style={{ flex: 1 }}
      >
        <p
          className="rpgui-dropdown-imp-header"
          onClick={() => setIsOpen(!isOpen)}
        >
          {">"}
          {dropItem?.name}
        </p>
        {isOpen && (
          <ul
            className="rpgui-dropdown-imp"
            style={{
              position: "absolute",
              display: "block"
            }}
          >
            {options.map((o, index) => (
              <li key={index} onClick={() => selectItem(o)}>
                {o.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export interface DropdownClassProms {
  options: ClassPc[];
  action: (option: ClassPc) => void;
}

export const DropdownClass: React.FC<DropdownClassProms> = ({
  options,
  action
}) => {
  const handleSelect = (option: ClassPc) => {
    action(option);
  };

  const listOfClass = addToDrop(options, "class");

  return (
    <>
      <DropdownComponent options={listOfClass} action={handleSelect} />
    </>
  );
};

export interface DropdownItemsProps {
  options: ItemsList;
}

export const DropdownItems: React.FC<DropdownItemsProps> = ({ options }) => {
  const [selected, setSelected] = useState<itemInDrop[]>([]);
  const [filterText, setFilterText] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [item, setItem] = useState<Armor | Shield | Weapon | undefined>();

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleFilter = (text: string, list: Armor[] | Shield[] | Weapon[]) => {
    setSelected(addToDrop(list, "items"));
    setFilterText(text);
    setIsOpen(false);
  };

  useEffect(() => {
    setItem(item);
  }, [item]);

  useEffect(() => {
    setItem(undefined);
  }, [selected]);

  const filter = [
    { text: "armor", list: options.armorsList },
    { text: "shield", list: options.shieldList },
    { text: "weapon", list: options.weaponsList }
  ];

  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <p>Create new item:</p>
        </div>

        <div
          className="rpgui-dropdown-imp"
          onMouseLeave={handleMouseLeave}
          style={{ flex: 1 }}
        >
          <p
            className="rpgui-dropdown-imp-header"
            onClick={() => setIsOpen(!isOpen)}
          >
            {">"}
            {filterText}
          </p>
          {isOpen && (
            <ul
              className="rpgui-dropdown-imp"
              style={{
                position: "absolute",
                width: "310px",
                display: "block"
              }}
            >
              {filter.map((f, index) => (
                <li key={index} onClick={() => handleFilter(f.text, f.list)}>
                  {f.text}
                </li>
              ))}
            </ul>
          )}
        </div>
        <DropdownSelectedItem options={selected} onSelect={setItem} />
      </div>
      {item? <AddItemCreated item={item} /> : <></>}
      
    </>
  );
};

export interface AddItemCreatedProps {
  item: Armor | Shield | Weapon ;
}

export const AddItemCreated: React.FC<AddItemCreatedProps> = ({ item }) => {
  const [newItems, setNewItems] = useState<ItemsList>(emptyItemsList);
  const [i, setItem] = useState<Armor | Shield | Weapon | undefined>(item)

  const createItems = (e: any) => {
    setNewItems((prevItems) => {
      const updatedItems = { ...prevItems };

      if (e.itemType === "ARMOR") updatedItems.armorsList.push(e as Armor);
      if (e.itemType === "SHIELD") updatedItems.shieldList.push(e as Shield);
      if (e.itemType === "WEAPON") updatedItems.weaponsList.push(e as Weapon);

      return updatedItems;
    });
  };

  useEffect(() => {
    setItem(i)
  },[i])

  return (
    <>
      {i? (
        <>
          <p>{NameEnchanted(i)} {EnchantmentCost([i])} gp</p>
          
          <button className="rpgui-button" onClick={() => createItems(item)}>
            <p>abb</p>
          </button>
          <br></br>
        </>
       ) : (
        <></>
      )}

      <AddedNewItems newItemsList={newItems} />
    </>
  );
};

export interface DropdownSelectedItemsProps {
  options: itemInDrop[];
  onSelect: (option: Armor | Shield | Weapon) => void;
}

export const DropdownSelectedItem: React.FC<DropdownSelectedItemsProps> = ({
  options,
  onSelect
}) => {
  const [selectedOption, setSelectedOption] = useState<
    Armor | Shield | Weapon
  >();

  const handleSelect = (option: Armor | Shield | Weapon) => {
    setSelectedOption(option);
  };

  const handleEnchantem = (e: any) => {
    if (selectedOption && e) {
      let item: Armor | Shield | Weapon = updateEnchantment(selectedOption, e);
      setSelectedOption(item);
    }
  };

  useEffect(() => {
    setSelectedOption(undefined);
  }, [options]);

  useEffect(() => {
    if (selectedOption) onSelect(selectedOption);
  }, [selectedOption]);

  return (
    <>
      <DropdownComponent
        options={addToDrop(options, "items")}
        action={handleSelect}
      />
      {selectedOption ? (
        <DropdownComponent 
          options={addToDrop(enchantItems, "enchant")}
          action={handleEnchantem}
        />
      ) : (
        <></>
      )}
    </>
  );
};
