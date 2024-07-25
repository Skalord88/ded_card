export type CriticProps = {
  critic: boolean;
  dice: number;
  value: number;
};

export const Critic: React.FC<CriticProps> = ({ critic, dice, value }) => {
  return (
    <>
      {critic ? (
        <>
          {dice === 20 ? (
            <>
              <span style={{ color: "red" }}>{dice}</span> + {value} ={" "}
              {dice + value} critic!!
            </>
          ) : (
            <>
              {dice} + {value} = {dice + value}
            </>
          )}
        </>
      ) : (
        <>
          {dice} + {value} = {dice + value}
        </>
      )}
    </>
  );
};
