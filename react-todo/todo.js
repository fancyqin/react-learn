/**
 * Created by qinfan on 2016/11/25.
 */

var TodoBox = React.createClass({
    //add
    bdKeyUp: function(e){
        var input = this.refs.inputIn;
        if(input.value && e.which === 13){
            var date = new Date();
            var itemId = date.getTime();
            var thisData = {id:itemId,text:input.value,done:false};
            this.setState({data:this.state.data.concat([thisData])});
            input.value ='';
        }
    },
    getInitialState: function(){
        return {
            data:[
                //{text:':octopus: :zap: :cat: = :octocat:',time:"1989-01-30",done:true},
                //{text:'hfeyeety',time:"1993-02-16",done:false}
            ]
        }
    },
    render: function(){
        return (
            <div className="todo-box">
                <div className="todo-in">
                    <input type="text" ref="inputIn" placeholder="Please enter something.." onKeyUp={this.bdKeyUp}/>
                </div>
                <TodoList data={this.state.data} />
            </div>
        )
    },
    itemChange: {
        changeItem: function(id){

        }.bind(this),
        deleteItem: function(id){
            for (item in this.state.data){
                if(item.id === id){
                    
                }
            }
        }.bind(this)
    }
});
var TodoList = React.createClass({
    render: function () {
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
    getInitialState: function () {
         return {
             done: this.props.data.done
         }
    },
    bdDoneChange: function () {
        this.setState({done:this.refs.checkbox.checked});
        console.log(this.props.data);
    },
    bdDelete:function(){

    },
    render: function () {
        return(
            <li className="todo-item" ref="item" id={this.props.data.id}>
                <input type="checkbox" ref="checkbox" className="checkbox" onChange={this.bdDoneChange} checked={this.state.done} />
                <input type="text" className="inner" onChange={this.todo} value={this.props.data.text}/>
                <span className="close" onClick={this.bdDelete}>&times;</span>
            </li>
        )
    }
});





ReactDOM.render(
    <TodoBox />,
    document.getElementById('todo')
);