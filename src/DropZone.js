import React, {useState} from "react";
import {read} from "./csv/comdirectReader";

function getBorderColor(isDraggingOver) {
    return isDraggingOver ? 'black' : 'grey';
}

function handleDrag(handler) {
    return event => {
        event.preventDefault();
        handler();
    }
}

function DropZone({addAccounts}) {

    const [isDraggingOver, setDraggingOver] = useState(false);

    let handleDrop = function(event) {
        event.preventDefault();
        setDraggingOver(false);
        read(event.dataTransfer.files)
            .then(accounts => {
                addAccounts(accounts)
            }).catch(error => console.log(error));
    };

    return <div
            style={{border: `2px dashed ${getBorderColor(isDraggingOver)}`, minHeight: '100px'}}
            className="d-flex align-items-center justify-content-center"
            onDragOver={handleDrag(() => setDraggingOver(true))}
            onDragLeave={handleDrag(() => setDraggingOver(false))}
            onDrop={handleDrop}>
        Drop CSV file here
    </div>
}

export default DropZone;