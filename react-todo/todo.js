/**
 * Created by qinfan on 2016/11/25.
 */

var TodoBox = React.createClass({
    getInitialState: function(){
        return {data:[]}
    },
    componentWillMount:function(){
        var data = JSON.parse(localStorage.getItem('todo-react')) || [];
        this.setState({data:data});
    },
    render: function(){
        var dones = 0;
        this.state.data.forEach(function(itm){
            if(itm.done){
                dones++;
            }
        });
        return (
            <div className="todo-box">
                <div className="func">
                    <label><input type="checkbox" ref="checkAll" onChange={this.checkAll}
                                  checked={this.state.data.length === dones && dones!==0}
                                  disabled={this.state.data.length===0}
                    />Select All</label>
                    <span class="num">Total: {this.state.data.length} Completed: {dones}</span>
                </div>
                <div className="todo-in">
                    <input type="text" ref="inputIn" placeholder="Lets get down to business...Marshall" onKeyUp={this.bdKeyUp}/>
                </div>
                <TodoList data={this.state.data} func={this.changeItem} />
            </div>
        )
    },
    checkAll: function(){
        var _this = this;
        var thisData = this.state.data;
        thisData.forEach(function(itm,i){
            itm.done = _this.refs.checkAll.checked;
            thisData.splice(i,1,itm);
        });
        this.setState({data:thisData});
        localStorage.setItem('todo-react',JSON.stringify(thisData));
    },
    //add
    bdKeyUp: function(e){
        var input = this.refs.inputIn;
        if(input.value && e.which === 13){
            var date = new Date();
            var itemId = date.getTime();
            var thisData = {id:itemId,text:input.value,done:false};
            this.setState({data:this.state.data.concat([thisData])});
            localStorage.setItem('todo-react',JSON.stringify(this.state.data.concat([thisData])));
            input.value ='';
        }
    },
    getItemById: function(id,cb){
        this.state.data.forEach(function (item,i) {
            if (item.id === id){
                cb(item,i);
            }
        });
    },
    //change
    changeItem: function (id,changes) {
        var thisData = this.state.data;
        var _this = this;
        var args = arguments;
        this.getItemById(id,function(item,i){
            if(args.length < 2){
                thisData.splice(i,1);
            }else{
                for(var key in changes){
                    if(changes.hasOwnProperty(key)){
                        item[key] = changes[key];
                        thisData.splice(i,1,item);
                    }
                }
            }
            _this.setState({data:thisData});
            localStorage.setItem('todo-react',JSON.stringify(thisData));
        });
    }

});
var TodoList = React.createClass({
    render: function () {
        var _this =this;
        return (
            <ul className="todo-list">
                {
                    this.props.data.map(function(dat){
                        return(
                            <TodoItem key={dat.id} data={dat} changeItem={_this.props.func} />
                        )
                    })
                }
            </ul>
        )
    }
});
var TodoItem = React.createClass({
    bdDoneChange: function () {
        this.props.changeItem(this.props.data.id,{done:this.refs.checkbox.checked});
    },
    bdDelete:function(){
        this.props.changeItem(this.props.data.id);
    },
    bdTextChange:function(){
        if(this.refs.inner.value === this.props.data.text){
            return;
        }
        this.props.changeItem(this.props.data.id,{text:this.refs.inner.value})
    },
    render: function () {
        return(
            <li className="todo-item" ref="item" id={this.props.data.id}>
                <input type="checkbox" ref="checkbox" className="checkbox" onChange={this.bdDoneChange} checked={this.props.data.done} />
                <input type="text" ref="inner" className="inner" onBlur={this.bdTextChange} defaultValue={this.props.data.text}/>
                <span className="close" onClick={this.bdDelete}>&times;</span>
            </li>
        )
    }
});

ReactDOM.render(
    <TodoBox />,
    document.getElementById('todo')
);