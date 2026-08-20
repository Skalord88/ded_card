import { useEffect, useState } from "react";

export type SelectedCheckProps = {
  onAction: (on: boolean) => void;
};

export const SelectedCheck: React.FC<SelectedCheckProps> = ({ onAction }) => {
  const [on, setOn] = useState<boolean>(true);

  useEffect(() => {
    onAction(on);
  }, [onAction, on]);

  return (
    <span
      className={
        on ? "rpgui-icon selected-check-on" : "rpgui-icon selected-check-off"
      }
      onClick={() => setOn(!on)}
    />
  );
};
