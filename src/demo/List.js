import { useState, useCallback, createContext } from "react";
import Tree, { mutateTree, moveItemOnTree } from "@atlaskit/tree";
import Item from "./Item";
import test from "./testData.json";

export const DragOverContext = createContext();

export default function List() {
  const [tree, setTree] = useState(test);
  const [combine, setCombine] = useState(null);

  const renderItem = ({
    item,
    provided,
    snapshot,
    depth,
    onCollapse,
    onExpand,
  }) => {
    return (
      <Item
        item={item}
        depth={depth}
        innerRef={provided.innerRef}
        draggableProps={provided.draggableProps}
        dragHandleProps={provided.dragHandleProps}
        isDragging={snapshot.isDragging}
        placeholder={provided.placeholder}
        onCollapse={onCollapse}
        onExpand={onExpand}
        setCombine={setCombine}
        combine={snapshot.combineWith}
      />
    );
  };

  const onDragEnd = (source, destination, result) => {
    setCombine(null);
    const update = moveItemOnTree(tree, source, destination);
    const expand = mutateTree(update, destination.parentId, {
      isExpanded: true,
    });
    setTree(expand);
  };

  const onExpand = (itemId) => {
    const update = mutateTree(tree, itemId, { isExpanded: true });
    setTree(update);
  };

  const onCollapse = (itemId) => {
    const update = mutateTree(tree, itemId, { isExpanded: false });
    setTree(update);
  };

  return tree ? (
    <div
      style={{
        width: "800px",
        height: "500px",
        paddingInlineStart: "30px",
        paddingBlockStart: "30px",
        overflow: "auto",
      }}
    >
      <DragOverContext.Provider value={combine}>
        <Tree
          tree={tree}
          renderItem={renderItem}
          onDragEnd={onDragEnd}
          onExpand={onExpand}
          onCollapse={onCollapse}
          isDragEnabled
          isNestingEnabled
          offsetPerLevel={0}
        />
      </DragOverContext.Provider>
    </div>
  ) : null;
}
