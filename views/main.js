'use strict';

const LOGIN = 'LOGIN';

const logIn = (loggedIn) => ({      // Redux action
    type: LOGIN,
    loggedIn
});

function fingerVeinAppReducer(state = { loggedIn: false }, action) {        // Redux reducer
    switch (action.type) {
    case LOGIN:
        return { loggedIn: action.loggedIn };
    default:
        return state;
    }
}

const store = window.Redux.createStore(fingerVeinAppReducer);

const { connect, Provider } = ReactRedux;

const mapStateToProps = state => {
    return { loggedIn: state.loggedIn };
};

const mapDispatchToProps = dispatch => {
    return {
        logIn: loggedIn => dispatch(logIn(loggedIn))
    };
};

class ConnectedHeader extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        console.log('hihi');
        this.props.logIn(!this.props.loggedIn);
    }

    render() {
        return (
            <header>
                <img id="logo" src="https://res.cloudinary.com/woooanet/image/upload/v1540199211/hitachi-fingervein-fe/hitachi-inspire-next-logo.png" />
                <nav>
                    <ul>
                        <li>Register</li>
                        <li onClick={this.handleClick}>{ this.props.loggedIn ? 'Logout' : 'Login' }</li>
                    </ul>
                </nav>
            </header>
        );
    }
}

const Header = connect(mapStateToProps, mapDispatchToProps)(ConnectedHeader);

const Main = () => {
    return (
        <main>
            <figure>
                <img id="cover-img" src="https://res.cloudinary.com/woooanet/image/upload/v1540199193/hitachi-fingervein-fe/brandingimg_vid_e.jpg" />
            </figure>
        </main>
    );
}

const FingerVeinApp = () => {
    return (
        <div>
            <Header />
            <Main />
        </div>
    );
}

ReactDOM.render(
    <Provider store={store}>
        <FingerVeinApp />
    </Provider>, document.getElementById('container')
);
