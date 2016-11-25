var CommentBox = React.createClass({
    loadCommentsFromServer: function () {
        $.ajax({
            url:this.props.url,
            dataType:'json',
            success: function(data){
                this.setState({data:data});
            }.bind(this),
            error: function(xhr, status, err){
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function(){
        return {
            data: []
        }
    },
    componentDidMount: function(){
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer,this.props.pollInterval)
    },
    handleCommentSubmit:function(comment){
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({data:newComments});
        $.ajax({
            url:this.props.url,
            dataType:'json',
            type:'POST',
            data: comment,
            success: function(data){
                this.setState({data:data})
            }.bind(this),
            error: function(xhr,status,err){
                console.error(this.props.url,status,err.toString());
            }.bind(this)
        });
    },
    render: function(){
        return (
            <div className="comment-box">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

//var data = [
//    {name:'qinfan',text:'how are u, react!'},
//    {name:'react',text:'fine'}
//];

var CommentList = React.createClass({
    render: function () {
        return(
            <div className="list">
                <Comment name="react" >Hi,qinfan</Comment>
                {
                    this.props.data.map(function(dat){
                        return (
                            <Comment name={dat.name} >{dat.text}</Comment>
                        );
                    })
                }
            </div>
        );
    }
});


var Comment = React.createClass({
    render: function () {
        return (
            <div className="item">
                <h2>{this.props.name}</h2>
                {this.props.children}
            </div>
        )
    }
});

var CommentForm = React.createClass({
    hSubmit: function(e){
        e.preventDefault();
        var name = this.refs.name.value.trim(),
            text = this.refs.text.value.trim();
        if(!text|| !name){return;}

        this.props.onCommentSubmit({name:name,text:text});

        this.refs.name.value = '';
        this.refs.text.value = '';
    },
    render: function(){
        return (
            <form className="form" onSubmit={this.hSubmit} >
                <input type="text" placeholder="your name" ref="name" />
                <input type="text" placeholder="say something.." ref="text" />
                <button type="submit">Comment</button>
            </form>
        )
    }
});

ReactDOM.render(
    <CommentBox url='comment.json' pollInterval={5000} />,
    document.getElementById('comment')
);