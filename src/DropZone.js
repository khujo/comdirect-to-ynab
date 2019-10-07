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

    let readFiles = function(files) {
        return read(files)
            .then(accounts => {
                addAccounts(accounts)
            }).catch(error => console.log(error));
    };

    let handleDrop = function(event) {
        event.preventDefault();
        setDraggingOver(false);
        readFiles(event.dataTransfer.files);
    };

    let handleInputChanged = function (event) {
        readFiles(event.target.files);
    };

    let style = {
        border: `2px dashed ${getBorderColor(isDraggingOver)}`,
        padding: '2.5rem',
        backgroundColor: isDraggingOver ? '#f4f4f4' : '#fff'
    };
    return (<div
                style={style}
                className="text-center"
                onDragOver={handleDrag(() => setDraggingOver(true))}
                onDragLeave={handleDrag(() => setDraggingOver(false))}
                onDrop={handleDrop}>
                <p>Drop CSV file here</p>
                <p><input type="file" onChange={handleInputChanged} /></p>
            </div>);
}

export default DropZone;