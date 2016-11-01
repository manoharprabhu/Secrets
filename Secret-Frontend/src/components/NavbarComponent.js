require('bootstrap/dist/css/bootstrap.min.css');
import React from 'react';

class NavbarComponent extends React.Component {
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
                            <a href="#">Post a secret</a>
                        </li>
                        <li
                            className={'' + (this.props.active === 2
                            ? 'active'
                            : '')}>
                            <a href="#">Browse secrets</a>
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
