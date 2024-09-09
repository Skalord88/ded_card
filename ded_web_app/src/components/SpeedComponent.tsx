export type SpeedComponentProps = {
  speed: number;
};

export const SpeedComponent: React.FC<SpeedComponentProps> = ({ speed }) => {
  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Speed</h2>

      <p style={{backgroundColor:"grey"}}>tactic</p>
      <div>
        <p>
          move: {speed}ft. / {speed / 5}s
        </p>
      </div>
      <div>
        <p>
          rapid: {speed * 2}ft. / {(speed * 2) / 5}s
        </p>
      </div>
      <div>
        <p>
          run x3: {speed * 3}ft. / {(speed * 3) / 5}s
        </p>
      </div>
      <div>
        <p>
          run x4: {speed * 4}ft. / {(speed * 4) / 5}s
        </p>
      </div>

      <p style={{backgroundColor:"grey"}}>one minut</p>
      <div>
        <p>
          move: {speed * 10}ft. / {(speed * 10) / 5}s
        </p>
      </div>
      <div>
        <p>
          rapid: {speed * 20}ft. / {(speed * 20) / 5}s
        </p>
      </div>
      <div>
        <p>
          run x3: {speed * 30}ft. / {(speed * 30) / 5}s
        </p>
      </div>
      <div>
        <p>
          run x4: {speed * 40}ft. / {(speed * 40) / 5}s
        </p>
      </div>

      <p style={{backgroundColor:"grey"}}>one hour</p>
      <div>
        <p>move: {Math.floor(speed * 0.36)}km</p>
      </div>
      <div>
        <p>rapid: {Math.floor(speed * 0.72)}km</p>
      </div>

      <p style={{backgroundColor:"grey"}}>one day</p>
      <div>
        <p>move: {Math.floor(speed * 0.36 * 8)}km</p>
      </div>
      <div>
        <p>rapid: {Math.floor(speed * 0.72 * 8)}km</p>
      </div>
    </>
  );
};
