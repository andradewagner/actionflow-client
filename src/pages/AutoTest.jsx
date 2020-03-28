import React, { Component } from 'react'
import styled from 'styled-components'
import apis from '../api'
import '../style/Pipeline.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const PipelineItem = styled.div`width: 200px; height: 200px; float: left;`

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
                {
                    this.state.features.map((feature, index) => (
                        <div>
                            <PipelineItem className={feature.status} key={index}>
                                {feature.name}
                                {feature.exectionTime}
                                {index}
                            </PipelineItem>
                            <Arrow></Arrow>
                        </div>
                    ))
                }
            </Wrapper>)
    }
}

export default AutoTest