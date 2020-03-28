import React, { Component } from 'react'
import api from '../api'
import Chart from 'chart.js'

import styled from 'styled-components'

const Wrapper = styled.div.attrs({})`width: 200px;`

const PipelineItem = styled.div.attrs({})`width: 200px; height: 200px; background-color: #c6e9af; border: 5px solid #338000;`

class Test extends Component {
    chartRef = React.createRef();

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            app: '',
            feature: '',
            executionTime: '',
            screenshot: '',
            log: [],
        }
    }

    componentDidMount = async () => {
        const { id } = this.state
        const test = await api.getTestById(id)

        const myChartRef = this.chartRef.current.getContext("2d");

        this.setState({
            app: test.data.data.app,
            feature: test.data.data.feature,
            executionTime: test.data.data.executionTime,
            screenshot: test.data.data.screenshot,
            log: test.data.data.log,
        })

        new Chart(myChartRef, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "March"],
                datasets: [
                    {
                        label: "Sales",
                        data: [86, 67, 91],
                    }
                ]
            },
            options: {
                
            }
        });
    }

    render() {
        const { id, name, rating, time } = this.state
        return (
            <Wrapper>
                <input type="text" value={id} />
                <input type="text" value={name} />
                <canvas id="myChart" ref={this.chartRef} width="100" height="100"></canvas>
                
                <PipelineItem></PipelineItem>
            </Wrapper>
        )
    }
}

export default Test