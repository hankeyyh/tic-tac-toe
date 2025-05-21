import Square from "../square";

export default function Board() {
    return (
        <>
            <div className="flex flex-row">
                <Square value="1" />
                <Square value="2" />
                <Square value="3" />
            </div>
            <div className="flex flex-row">
                <Square value="4" />
                <Square value="5" />
                <Square value="6" />
            </div>
            <div className="flex flex-row">
                <Square value="7" />
                <Square value="8" />
                <Square value="9" />
            </div>
        </>
    );
}