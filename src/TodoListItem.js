import moment from "moment";
function TodoListItem(props){

    const { name, date, removeFromItens, index } = props;

    const onRemove = () => {
        removeFromItens(index);
    }
    const styleItem = {
        marginTop: '10px'
    }
    return (
        <div className="row" style={styleItem}>
            <div className="col-10">
                {moment(date).format("DD/MM")} - {name}
            </div>
            <div className="col">
                <button type="button" className="btn btn-danger" onClick={onRemove}> X </button>
            </div>
        </div>
    );

}

export default TodoListItem;