/**
 * Created by qinfan on 2016/11/25.
 */

var TodoBox = React.createClass({
    getInitialState: function(){
        return {
            data:[
                //{text:':octopus: :zap: :cat: = :octocat:',time:"1989-01-30",done:true},
                //{text:'hfeyeety',time:"1993-02-16",done:false}
            ]
        }
    },
    render: function(){
        //var func = {
        //    deleteItem: this.deleteItem,
        //    changeItemText: this.changeItemText,
        //    changeItemDone: this.changeItemDone
        //};
        return (
            <div className="todo-box">
                <div className="todo-in">
                    <input type="text" ref="inputIn" placeholder="Please enter something.." onKeyUp={this.bdKeyUp}/>
                </div>
                <TodoList data={this.state.data} func={this.changeItem} />
            </div>
        )
    },
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
    getItemById: function(id,cb){
        this.state.data.forEach(function (item,i) {
            if (item.id === id){
                cb(item,i);
            }
        });
    },
    ////delete
    //deleteItem: function(id){
    //    var thisData = this.state.data;
    //    var _this = this;
    //    this.getItemById(id, function (item,i) {
    //        thisData.splice(i,1);
    //        _this.setState({data:thisData});
    //        //todo
    //    });
    //},
    ////change item text
    //changeItemText: function(id,text){
    //    var thisData = this.state.data;
    //    var _this = this;
    //    this.getItemById(id,function(item,i){
    //        item.text = text;
    //        thisData.splice(i,1,item);
    //        _this.setState({data:thisData});
    //    });
    //},
    ////change item done
    //changeItemDone: function(id,done){
    //    var thisData = this.state.data;
    //    var _this = this;
    //    this.getItemById(id,function(item,i){
    //        item.done = done;
    //        thisData.splice(i,1,item);
    //        _this.setState({data:thisData});
    //    });
    //},
    changeItem: function (id,changes) {
        var thisData = this.state.data;
        var _this = this;
        var args = arguments;
        this.getItemById(id,function(item,i){
            if(args.length < 2){
                thisData.splice(i,1);
            }else{
                for(var key in changes){
                    item[key] = changes[key];
                    thisData.splice(i,1,item);
                }
            }
            _this.setState({data:thisData});

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