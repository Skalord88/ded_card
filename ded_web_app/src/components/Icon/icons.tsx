
export type IconsProps = {
  children?: React.ReactNode;
  classe?: string;
  text?: string;
  area?: string;
  top?: number;
  left?: number;
  onAction?: () => void;
};

export const InventoryIcons: React.FC<IconsProps> = ({ children }) => {
  return (
    <div
      // className="rpgui-img gerald"
      style={{
        display: "grid",
        justifyContent: "space-evenly",
        gap: 10,
        gridTemplateAreas: `
        "empty  head      neck"
        "I      armor     shield"
        "II     arms      cloth"
        "III    hands0    hands1"
        "IV     cloak     belt"
        "V      backpack  legs"
        `
      }}
    >
      {children}
    </div>
  );
};

export const InventoryIcon: React.FC<IconsProps> = ({
  // children,
  classe,
  text,
  area,
  onAction
  // top,
  // left
}) => {
  const classNome: string = "rpgui-cursor-point rpgui-icon " + classe;
  const handleClick = () => {
    if (onAction) {
      onAction();
    }
  };
  // + classe;
  return (
    <div
      style={{
        gridArea: area
      }}
    >
      <div className={classNome} onClick={handleClick}>
        <p>{text}</p>
      </div>
    </div>
  );
};
