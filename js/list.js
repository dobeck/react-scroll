window.onbeforeunload = function () {
    window.scrollTo(0,0);
}

var Scroll = React.createClass({
    getInitialState: function () {
        return {
            bottomLimit: 100
        }
    },

    componentDidMount: function () {
        this.attachListeners();
    },

    componentDidUpdate: function () {
        this.attachListeners();
    },

    attachListeners: function () {
        window.addEventListener("scroll", this.handleScroll);
    },

    detachListeners: function () {
        window.removeEventListener("scroll", this.handleScroll);
    },

    handleScroll: function () {
        var el = document.getElementById("listContainer"),
            scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

        if (this.topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < this.state.bottomLimit) {
            this.detachListeners();
            this.props.addElements();
        }
    },

    topPosition: function (el) {
        if(!el) {
            return 0;
        }
        return el.offsetTop + this.topPosition(el.offsetParent);
    },

    render: function () {
        return (<ul>
            {this.props.children}
        </ul>);
    }

});

var ListItem = React.createClass({
    render: function () {
        return <li>{this.props.index} {Math.random().toString(36).substring(7)}</li>;
    }
});

var List = React.createClass({
    getInitialState: function () {
        return {
            step: 100,
            elements: this.setMockElements(0, 100)
        }
    },    

    setMockElements: function (start, length) {
        var mockElements = [];

        for (var i = start; i < length; i++) {
            mockElements.push(<ListItem key={Math.random()} index={i}/>)
        }

        return mockElements;
    },

    addMockElements: function () {
        var elementsLength = this.state.elements.length,
            newMockElements = this.setMockElements(elementsLength, elementsLength + this.state.step);

        setTimeout(function() {
           this.setState({
               elements: this.state.elements.concat(newMockElements)
           });
        }.bind(this), 2000);
    },

    render: function () {
        return (<Scroll addElements = {this.addMockElements}>
            {this.state.elements}
        </Scroll>);
    }

});

ReactDOM.render(
    <List/>,
    document.getElementById("listContainer")
);
