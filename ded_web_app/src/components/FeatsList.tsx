import { feat } from "./interfaces";

export interface FeatProps {
  feat: feat[] | undefined;
}

export const FeatsList: React.FC<FeatProps> = ({ feat }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap"
      }}
    >
      {feat?.map((feat, index) => {
        return (
          <>
            <div
              key={index}
              className="rpgui-container-framed-golden"
              style={{
                width: 180
              }}
            >
              <p>{feat.characterFeatName}</p>
            </div>
          </>
        );
      })}
    </div>
  );
};
