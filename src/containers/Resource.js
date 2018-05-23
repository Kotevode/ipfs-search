import { connect } from 'react-redux'
import { actions } from '../actions'
import Resource from '../components/Resource'

const mapStateToProps = (state, { params }) => ({
  resource: state.search.resources[params.id],
})

const mapDispatchToProps = (dispatch) => ({
  loadResource: (id) => dispatch(actions.loadResource(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Resource)
