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
  onExpand,
  onCollapse,
  setCombine,
  combine,
}) {
  const toggleExpand = () => {
    item.isExpanded ? onCollapse(item.id) : onExpand(item.id);
  };

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
      onClick={toggleExpand}
    >
      <span style={{ marginLeft: "10px" }}>
        {item.data ? item.data.title : ""}
      </span>
    </div>
  );
}
