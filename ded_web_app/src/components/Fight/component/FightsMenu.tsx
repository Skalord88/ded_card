export type FightsProps = {
  selectOption?: (option: string) => void;
};

export const FightsMenu: React.FC<FightsProps> = ({ selectOption }) => {
  const setMenuOption = (opt: string) => {
    if (selectOption) selectOption(opt);
  };
  return (
    <div className="rpgui-container-framed golden-2">
      <div>
        <p
          className="rpgui-cursor-point"
          onClick={() => setMenuOption("Attack")}
        >
          Attack
        </p>
      </div>
      <div>
        <p
          className="rpgui-cursor-point"
          onClick={() => setMenuOption("Magic")}
        >
          Magic
        </p>
      </div>
      <div>
        <p
          className="rpgui-cursor-point"
          onClick={() => setMenuOption("Action")}
        >
          Action
        </p>
      </div>
      <div>
        <p
          className="rpgui-cursor-point"
          onClick={() => setMenuOption("Skills")}
        >
          Skills
        </p>
      </div>
      {/* <div style={{ flex: 3 }}>{option === "Attack" && <FightAttack />}</div> */}
    </div>
  );
};
