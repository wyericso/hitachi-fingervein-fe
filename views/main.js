'use strict';

const FINGERVEINAPI = 'http://10.211.55.12:8080';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Redux actions

const logIn = (id) => ({
    type: LOGIN,
    loggedInId: id
});

const logOut = () => ({
    type: LOGOUT,
    loggedInId: null
});

// Redux reducer

function fingerVeinAppReducer(state = { loggedInId: null }, action) {
    switch (action.type) {
    case LOGIN:
        return { loggedInId: action.loggedInId };
    case LOGOUT:
        return { loggedInId: action.loggedInId };
    default:
        return state;
    }
}

const store = window.Redux.createStore(fingerVeinAppReducer);

const { connect, Provider } = ReactRedux;

const mapStateToProps = state => {
    return { loggedInId: state.loggedInId };
};

const mapDispatchToProps = dispatch => {
    return {
        logIn: (id) => dispatch(logIn(id)),
        logOut: () => dispatch(logOut())
    };
};

class ConnectedHeader extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        if (typeof(this.props.loggedInId) === 'number') {      // 'id' should be number if logged in.
            this.props.logOut();
        } else {
            const http = new XMLHttpRequest();
            http.responseType = 'json';
            http.onreadystatechange = () => {
                if (http.readyState === 4 && http.status === 200) {
                    if (typeof(http.response.verifiedTemplateNumber) === 'number') {
                        this.props.logIn(http.response.verifiedTemplateNumber);
                    }
                    else {
                        alert('Finger vein pattern not recognized.');
                    }
                }
            };
            http.open('GET', FINGERVEINAPI + '/api/verification_1toN');
            http.send();
        }
    }

    render() {
        console.log(typeof(this.props.loggedInId));
        console.log(this.props.loggedInId);
        return (
            <header>
                <img id="logo" src="https://res.cloudinary.com/woooanet/image/upload/v1540199211/hitachi-fingervein-fe/hitachi-inspire-next-logo.png" />
                <nav>
                    <ul>
                        <li>{ typeof(this.props.loggedInId) === 'number' ? 'Welcome, ' + this.props.loggedInId : 'Register' }</li>
                        <li onClick={this.handleClick}>{ typeof(this.props.loggedInId) === 'number' ? 'Logout' : 'Login' }</li>
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
