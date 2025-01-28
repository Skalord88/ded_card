import { itemInDrop } from "../functions";

export interface ListProps {
  items: itemInDrop[];
  text: string;
  onSelect: (select: any) => void;
}

export const ListOfSomething: React.FC<ListProps> = ({
  items,
  text,
  onSelect
}) => {
  const handleSelect = (s: itemInDrop) => {
    onSelect(s);
  };

  return (
    <>
      {items.length > 0 ? (
        <div>
          <h2 className="rpgui-container-framed-golden-2">{text}</h2>
          <div
            className="rpgui-list-imp"
            style={{
              minHeight: 50,
              maxHeight: 300
            }}
          >
            {items.map((i, index) => {
              return (
                <div key={index}>
                  <li onClick={() => handleSelect(i)}>{i.name}</li>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};
