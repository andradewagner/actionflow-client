import React, { Component } from 'react'
import ReactTable from 'react-table'
import Moment from 'react-moment'
import api from '../api'

import styled from 'styled-components'
import 'react-table/react-table.css'

const Wrapper = styled.div.attrs({className: "container"})``

const View = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

class ViewAutomation extends Component {
    viewAuto = event => {
        event.preventDefault()

        window.location.href = `/auto/${this.props.id}`
    }

    render() {
        return <View onClick={this.viewAuto}>visualizar</View>
    }
}

class AutoTestList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            autos: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState( { isLoading: true })

        await api.getAutos().then(automations => {
            this.setState({
                autos: automations.data.data,
                isLoading: false,
            })
        })
    }

    render () {
        const { autos, isLoading } = this.state

        const columns = [
            {
                Header: 'Aplicaçao',
                accessor: 'app',
                filterable: true,
            }, {
                Header: 'Status',
                accessor: 'status',
                filterable: true,
            }, {
                id: "createdAt",
                Header: 'Data',
                accessor: d => {
                    return <Moment format="DD/MM/YYYY">{d.createdAt}</Moment>
                },
                filterable: false,
            },{
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <ViewAutomation id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!autos.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={autos}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={1}
                    />
                )}
            </Wrapper>
        )
    }
}

export default AutoTestList