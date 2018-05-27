import { connect } from 'react-redux'
import { actions } from '../actions'

import SearchResult from '../components/SearchResult'


const mapStateToProps = (state, props) => ({
  resource: state.search.resources[props.id] || { isLoading: true }
})

const mapDispatchToProps = (dispatch) => ({
  loadResource: (id) => dispatch(actions.loadResource(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResult)
