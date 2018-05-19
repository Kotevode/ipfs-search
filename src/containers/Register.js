import { connect } from 'react-redux'
import Register from '../components/Register'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (values) => {
    console.log(values)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
