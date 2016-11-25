/**
 * Created by qinfan on 2016/11/25.
 */

var TodoBox = React.createClass({
    bdKeyUp: function(){
        if(this.refs.in.value){
            //todo
        }
    },
    getInitialState: function(){
        return {
            data:[{text:'qfinaf',time:"1989-01-30"},{text:'hfeyeety',time:"1993-02-16"}]
        }
    },
    render: function(){
        return (
            <div className="todo-box">
                <div className="todo-in">
                    <input type="text" ref="in" onkeyup={this.bdKeyUp}/>
                </div>
                <TodoList data={this.state.data} />
            </div>
        )
    }
});
var TodoList = React.createClass({
    render: function () {
        console.log(11);
        return (
            <ul className="todo-list">
                {
                    this.props.data.map(function(dat){
                        return(
                            <TodoItem data={dat} />
                        )
                    })
                }
            </ul>
        )
    }
});
var TodoItem = React.createClass({
    render: function () {
        return(
            <li className="todo-item">
                {this.props.data.text}
                <span className="time">{this.props.data.time}</span>
            </li>
        )
    }
});





ReactDOM.render(
    <TodoBox />,
    document.getElementById('todo')
);