import { useContext } from "react";
import styles from "./item.module.css";
import classNames from "classnames";
import { DragOverContext } from "./List";

export default function Item({
  item,
  depth,
  innerRef,
  draggableProps,
  dragHandleProps,
  isDragging,
  setCombine,
  combine,
}) {
  const active = useContext(DragOverContext);

  if (isDragging) {
    setCombine(combine);
  }

  return (
    <div
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      className={classNames(styles.item, {
        [styles["item--dragging"]]: active === item.id,
        [styles["item--depth-0"]]: depth === 0,
        [styles["item--depth-1"]]: depth === 1,
        [styles["item--depth-2"]]: depth === 2,
        [styles["item--depth-3"]]: depth === 3,
      })}
    >
      <span style={{ marginLeft: "10px" }}>
        {item.data ? item.data.title : ""}
      </span>
    </div>
  );
}
