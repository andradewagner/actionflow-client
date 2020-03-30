import React, { Component } from 'react'
import styled from 'styled-components'
import apis from '../api'
import '../style/Pipeline.css'

const Wrapper = styled.div.attrs({className: "h-100 container"})`
    padding: 40px 30px 40px 30px;
`
const Feature = styled.div.attrs({className: "align-items-start h-25"})``
const Time = styled.div.attrs({className: "align-items-center justify-content-center h-50 font-weight-bold"})``
const Step = styled.div.attrs({className: "align-items-end justify-content-center h-25 font-weight-bold"})``

const PipelineItem = styled.div`width: 180px; height: 180px; float: left;`

const Arrow = styled.div`
    background-image: url('/arrow.png');
    background-repeat: no-repeat;
    background-position: center;
    width: 84px; 
    height: 200px; 
    float: left;
`

class AutoTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            app: '',
            features: [],
            status: '',
        }
    }

    componentDidMount = async () => {
        const { id } = this.state
        const auto = await apis.getAutoById(id)

        this.setState({
            app: auto.data.data.app,
            features: auto.data.data.features,
            status: auto.data.data.status
        })
    }

    render() {
        return (
            <Wrapper>
                <div className="row h-100">
                {
                    this.state.features.map((feature, index) => (
                        <div>
                            <PipelineItem className={feature.status} key={index}>
                                <div className="container h-100">
                                    <Feature className="row">{feature.name}</Feature>
                                    <Time className="row">{feature.executionTime} seg</Time>
                                    <Step className="row">{index + 1}/{this.state.features.length}</Step>
                                </div>
                            </PipelineItem>
                            <Arrow hidden={(this.state.features.length - 1) === index}></Arrow>
                        </div>
                    ))
                }
                </div>
            </Wrapper>)
    }
}

export default AutoTest