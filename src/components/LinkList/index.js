import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./styles.scss";

import LinkContainer from "../LinkContainer";

const LinkList = (props) => {
  return (
    <div className="link__listContainer">
      <DragDropContext onDragEnd={props.handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {props.links?.length ? (
                props.links
                  .filter((link) => {
                    if (!link.page && props.page === "default") return true;
                    if (link.page === props.page) return true;
                  })
                  .map((l, index) => {
                    return (
                      <Draggable key={l.id} draggableId={l.id} index={index}>
                        {(provided) => (
                          <li
                            className="draggable"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <LinkContainer
                              linkTitle={l.linkInfo.linkTitle}
                              linkUrl={l.linkInfo.linkUrl}
                              affiliateCode={l.linkMedia.affiliateCode}
                              imageUrl={l.linkMedia.imageUrl}
                              updateLink={props.updateLink}
                              deleteLink={props.deleteLink}
                              handleFavicon={props.handleFavicon}
                              downloadUrl={l.linkMedia.downloadUrl}
                              friendTitle={l.friendTitle}
                              friendUrl={l.linkMedia.friendUrl}
                              favicon={l.linkMedia.favicon}
                              mediaUrl={l.linkMedia.mediaUrl}
                              active={l.linkControl.active}
                              id={l.id}
                              linkType={l.linkType}
                              type={l.type}
                              isLocked={l.linkControl.isLocked}
                              reverse={l.linkControl.reverse}
                            />
                          </li>
                        )}
                      </Draggable>
                    );
                  })
              ) : (
                <div className="no_links">
                  <h6>You don&apos;t have any links</h6>
                </div>
              )}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default LinkList;
