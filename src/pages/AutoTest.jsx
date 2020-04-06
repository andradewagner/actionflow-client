import React, { Component } from 'react'
import Moment from 'react-moment'
import ReactModal from 'react-modal'
import styled from 'styled-components'
import apis from '../api'
import '../style/Pipeline.css'

const Wrapper = styled.div.attrs({className: "h-100 container"})``
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
ReactModal.setAppElement('#root')

class AutoTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            app: '',
            features: [],
            status: '',
            createdAt: '',
            showModal: false,
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    componentDidMount = async () => {
        const { id } = this.state
        const auto = await apis.getAutoById(id)

        this.setState({
            app: auto.data.data.app,
            features: auto.data.data.features,
            status: auto.data.data.status,
            createdAt: auto.data.data.createdAt,
        })
    }

    render() {
        return (
            <Wrapper>
                <h4>Aplicaçao: {this.state.app}</h4>
                <hr/>
                <h4>Data da Execuçao: <Moment format="DD/MM/YYYY - HH:mm:SS">{this.state.createdAt}</Moment></h4>
                {
                    this.state.features.map((feature, index) => (
                        <div key={index}>
                            <PipelineItem className={feature.status} key={index}>
                                <div className="container h-100">
                                    <Feature className="row">{feature.name}</Feature>
                                    <Time className="row">
                                        <div className={feature.status === "error" ? "col-sm-6" : ""}>{feature.executionTime} seg</div>
                                        <div className="col-sm-2" hidden={feature.status !== "error"}>
                                            <img onClick={ this.handleOpenModal } className="popup" src={"/document.png"} />
                                        </div>
                                    </Time>
                                    <Step className="row">{index + 1} / {this.state.features.length}</Step>
                                </div>
                            </PipelineItem>
                            <Arrow hidden={(this.state.features.length - 1) === index}></Arrow>
                        </div>
                    ))
                }
                <ReactModal isOpen={this.state.showModal}>
                    <a onClick={this.handleCloseModal} className="close">X</a>
                    <img src="https://cypress-io.ghost.io/blog/content/images/2019/05/inspect-snapshot.png" />
                </ReactModal>
            </Wrapper>)
    }
}

export default AutoTest