'use strict';

class FingerVeinApp extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <img id="logo" src="https://res.cloudinary.com/woooanet/image/upload/v1540199211/hitachi-fingervein-fe/hitachi-inspire-next-logo.png" />
                    <nav>
                        <ul>
                            <li>Register</li>
                            <li>Login</li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <figure>
                        <img id="cover-img" src="https://res.cloudinary.com/woooanet/image/upload/v1540199193/hitachi-fingervein-fe/brandingimg_vid_e.jpg" />
                    </figure>
                </main>
            </div>
        );
    }
}

ReactDOM.render(
    <FingerVeinApp />, document.getElementById('container')
);
