import React,{Component,PropTypes} from 'react'

const Button = React.createClass({
    getDefaultProps(){
        return {
            color: 'blue',
            text:'Confirm'
        }
    },
    
    render(){
        const {color,text} = this.props;
        return (
            <button className={`btn btn-${color}`}>
                <em>{text}</em>
            </button>
        )
    }
});


class Buttton extends Component {
    constructor(props){
        super(props)
    }

    static defaultProps = {
        color:'blue',
        text:'Confirm'
    };

    render() {
        const {color,text} = this.props;

        return (
            <button className={`btn btn-${color}`}>
                <em>{text}</em>
            </button>
        )
    }
}

class Tab extends Component {
    constructor(props){
        super(props);


        const currProps = this.props;
        let activeIndex = 0;

        if('activeIndex' in currProps){
            activeIndex = currProps.activeIndex;
        }else if('defaultActiveIndex' in currProps){
            activeIndex = currProps.defaultActiveIndex;
        }

        this.state = {
            activeIndex,
            prevIndex: activeIndex
        }
    }

    static defaultProps = {
        classPrefix:'tab',
        onChange: ()=>{
            
        }
    }
    

    getTabPanes(){
        const {classPrefix,activeIndex,panels,isActive} = this.props;

        return React.Children.map(panels,(child) => {
            
            if(!child){
                return;
            }
        
            const order = parseInt(child.props.order,10);
            const isActive = activeIndex === order;
            
            return React.cloneElement(child,{
                classPrefix,
                isActive,
                children: child.props.children,
                key: `tabpane-${order}`
            })
            
        })

    }

    render(){
        return(
            <div className="ui-tabs">
                {this.getTabPanes()}
                <Button color="red" text="red btn" />
                <Buttton color="black" text="black btn" />
            </div>
        )
    }

}

export default Tab;

