import { connect } from 'react-redux'
import { actions } from '../actions'
import Resource from '../components/Resource'

const isLoading = (state, id) => {
  let resource = state.search.resources[id]
  if (!resource) {
    return true
  } else {
    return resource.isLoading
  }
}

const mapStateToProps = (state, { params }) => ({
  resource: state.search.resources[params.id],
  isLoading: isLoading(state, params.id)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  bind: (values) => {
    let { keyword } = values
    dispatch(actions.bind(ownProps.params.id, keyword))
  },
  loadResource: (id) => dispatch(actions.loadResource(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Resource)
