import { useEffect, useState } from "react";
import {
  Armor,
  ClassPc,
  Enchantment,
  ItemsList,
  Shield,
  Weapon
} from "./interfaces";
import { enchantItems } from "./variables";
import { EnchantmentCost, NameEnchanted, OnlyEnchantedName, updateEnchantment } from "./functions";

export interface DropdownClassProps {
  options: ClassPc[];
  onSelect: (option: ClassPc) => void;
}

export const DropdownClass: React.FC<DropdownClassProps> = ({
  options,
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<ClassPc>();

  const handleSelect = (option: ClassPc) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="rpgui-dropdown-imp" onMouseLeave={handleMouseLeave}>
      <p
        className="rpgui-dropdown-imp-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        {"> "}
        {selectedOption?.className}
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
          {options.map((option) => (
            <li key={option.id} onClick={() => handleSelect(option)}>
              {option.className}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export interface DropdownItemsProps {
  options: ItemsList;
  onCreate: (newOption: Armor | Shield | Weapon) => void;
}

export const DropdownItems: React.FC<DropdownItemsProps> = ({
   options,
   onCreate
  }) => {
  const [selected, setSelected] = useState<Armor[] | Shield[] | Weapon[]>([]);
  const [filterText, setFilterText] = useState<string>("-");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [item, setItem] = useState<Armor | Shield | Weapon>();

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleFilter = (text: string, list: Armor[] | Shield[] | Weapon[]) => {
    setSelected(list);
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

      {item ? (
        <>
          <br></br>
          <div className="rpgui-center rpgui-container-framed-golden">
            <p>
              {NameEnchanted(item)} {EnchantmentCost([item])}gp
            </p>
            <button className="rpgui-button" onClick={() => onCreate(item)}><p>abb</p></button>
          </div>
          <br></br>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export interface DropdownSelectedItemsProps {
  options: Armor[] | Shield[] | Weapon[];
  onSelect: (option: Armor | Shield | Weapon) => void;
}

export const DropdownSelectedItem: React.FC<DropdownSelectedItemsProps> = ({
  options,
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<
    Armor | Shield | Weapon
  >();

  const handleSelect = (option: Armor | Shield | Weapon) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleEnchantem = (e: Enchantment) => {
    if (selectedOption) {
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
      <div
        className="rpgui-dropdown-imp"
        onMouseLeave={handleMouseLeave}
        style={{ flex: 1 }}
      >
        <p
          className="rpgui-dropdown-imp-header"
          onClick={() => setIsOpen(!isOpen)}
        >
          {"> "}
          {selectedOption?.name}
        </p>
        {isOpen && (
          <ul
            className="rpgui-dropdown-imp"
            style={{
              position: "absolute",
              width: "auto",
              display: "block"
            }}
          >
            {options.map((option, index) => (
              <>
                <li key={index} onClick={() => handleSelect(option)}>
                  {option.name}
                </li>
              </>
            ))}
          </ul>
        )}
      </div>
      {selectedOption ? (
        <DropdownEnchantemnts
          option={selectedOption}
          onSelect={handleEnchantem}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export interface DropdownEnchantemntsProps {
  option: Armor | Shield | Weapon;
  onSelect: (newEnchantment: Enchantment) => void;
}

export const DropdownEnchantemnts: React.FC<DropdownEnchantemntsProps> = ({
  option,
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Enchantment>({
    id: 0,
    enchantment: 0
  });

  const handleEnchantem = (e: Enchantment) => {
    setSelectedOption(e);
    onSelect(e);
    setIsOpen(false);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setSelectedOption({
      id: 0,
      enchantment: 0
    })
  },[option])

  return (
    <div
      className="rpgui-dropdown-imp"
      onMouseLeave={handleMouseLeave}
      style={{ flex: 1 }}
    >
      <p
        className="rpgui-dropdown-imp-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        {"> "}
        {OnlyEnchantedName(selectedOption.enchantment)}
      </p>
      {isOpen && (
        <ul
          className="rpgui-dropdown-imp"
          style={{
            position: "absolute",
            width: "20%",
            display: "block"
          }}
        >
          {enchantItems.map((option) => (
            <>
              <li
                key={option.id}
                onClick={() => handleEnchantem(option)}
              >
                {OnlyEnchantedName(option.enchantment)}
              </li>
            </>
          ))}
        </ul>
      )}
    </div>
  );
};
