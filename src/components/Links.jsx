import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    ActionFlow
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/tests/list" className="nav-link">
                                Tests
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/tests/create" className="nav-link">
                                Create Test
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/autos" className="nav-link">
                                Automaçoes
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links