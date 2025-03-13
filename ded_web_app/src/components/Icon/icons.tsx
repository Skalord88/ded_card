export type ChildrenProps = {
  children?: React.ReactNode;
  classe?: string;
  text?: string;
  top?: number;
  left?: number;
};

export const InventoryIcons: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="rpgui-img gerald">{children}</div>;
};

export const InventoryIcon: React.FC<ChildrenProps> = ({
  // children,
  classe,
  text,
  top,
  left
}) => {
  const classNome: string = "rpgui-icon " + classe;
  return (
    <div
      className="rpgui-container-framed-golden"
      style={{ position: "absolute", top: top + "%", left: left + "%" }}
    >
      <div className={classNome}>
        <p>{text}</p>
        {/* <div>{children}</div> */}
      </div>
    </div>
  );
};
