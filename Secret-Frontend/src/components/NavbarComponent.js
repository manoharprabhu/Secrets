require('bootstrap/dist/css/bootstrap.min.css');
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Main';
import BrowseSecretsComponent from './BrowseSecretsComponent';

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.renderHome = this
            .renderHome
            .bind(this);
        this.renderBrowseSecrets = this
            .renderBrowseSecrets
            .bind(this);
    }
    renderHome() {
        ReactDOM.render(
            <App/>, document.getElementById('app'));
    }
    renderBrowseSecrets() {
        ReactDOM.render(
            <BrowseSecretsComponent/>, document.getElementById('app'));
    }
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Secrets</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li
                            className={'' + (this.props.active === 1
                            ? 'active'
                            : '')}>
                            <a href="#" onClick={this.renderHome}>Post a secret</a>
                        </li>
                        <li
                            className={'' + (this.props.active === 2
                            ? 'active'
                            : '')}>
                            <a href="#" onClick={this.renderBrowseSecrets}>Browse secrets</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

NavbarComponent.defaultProps = {
    active: 1
};

NavbarComponent.propTypes = {
    active: React.PropTypes.number
};

export default NavbarComponent;
