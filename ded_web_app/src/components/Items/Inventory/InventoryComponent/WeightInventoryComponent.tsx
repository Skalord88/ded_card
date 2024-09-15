export type WeightInventoryComponentProps = {
      carrying: [string, number]
    }
  
  export const WeightInventoryComponent: React.FC<WeightInventoryComponentProps> = ({
    carrying
  }) => {
    
    return (
      <>
        <div style={{ gridColumn: '6 / span 3', textAlign: "right" }}>
          <p>{carrying[0]}, {carrying[1]}lb</p>
        </div>
      </>
    )
  }
  