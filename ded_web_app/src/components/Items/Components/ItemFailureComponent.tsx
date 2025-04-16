import { reMaterialFailure } from "../Material/function";
import { ItemPartProps } from "../props";

export const ItemFailureComponent: React.FC<ItemPartProps> = ({

  failureItem,
  materialItem
}) => {
  const failure =
  materialItem && failureItem && reMaterialFailure(
    materialItem, failureItem
  )
  return (
    <div>
      {<p>
        <span style={{ color: "yellow" }}>failure: </span>
        {failure?? failureItem}%
      </p>}
    </div>
  );
};
