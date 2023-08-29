import { GridItem } from "@chakra-ui/react";
import { Children, ReactElement } from "react";

interface CellProps {
  state: number;
  row: number;
  col: number;
  onClick: () => void;
  isMouseDown: boolean;
  children?: ReactElement;
}



const Cell: React.FC<CellProps> = ({
  state,
  row,
  col,
  onClick,
  isMouseDown,
  children,
}) => {
  return (
    <GridItem
      onClick={onClick}
      onMouseEnter={() => (isMouseDown ? onClick() : null)}
      backgroundColor={state == 0 ? "white" : "black"}
      transition={"ease-in-out"}
      transitionDuration={"100ms"}
      borderColor={"black"}
      rounded={"none"}
      padding={0}
      margin={0}
      borderLeft={"1px"}
      borderTop={"1px"}
      _hover={{ bgColor: "gray.300" }}
    >
      {children}
    </GridItem>
  );
};

export default Cell;
