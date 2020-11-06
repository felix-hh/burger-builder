import React from "react"
import Modal from "../../components/UI/Modal/Modal"
import Auxiliary from "../Auxiliary/Auxiliary"
//import classes from "./withErrorHandler.module.css"

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                error: null
            }
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req
            })
            this.respInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.respInterceptor)
        }

        render() {
            return (
                <Auxiliary>
                    <Modal
                        show={this.state.error}
                        cancel={() => this.setState({ error: null })}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>

            )
        }
    }
}

export default withErrorHandler