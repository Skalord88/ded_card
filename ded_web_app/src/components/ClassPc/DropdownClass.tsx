
import { DropdownComponent } from "../DropDown/DropDown";
import { addToDrop } from "../functions";
import { ClassPc } from "../interfaces";

export interface DropdownClassProms {
    options: ClassPc[];
    onAction: (option: ClassPc) => void;
  }
  
  export const DropdownClass: React.FC<DropdownClassProms> = ({
    options,
    onAction
  }) => {
    const handleSelect = (option: ClassPc) => {
      onAction(option);
    };
  
    const listOfClass = addToDrop(options, "class");
  
    return (
      <>
        <DropdownComponent options={listOfClass} onAction={handleSelect} />
      </>
    );
  };