import { connect } from 'react-redux'
import { actions } from '../actions'
import Register from '../components/Register'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: ({ ipfsAddress }) => {
    dispatch(actions.addResource(ipfsAddress))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
