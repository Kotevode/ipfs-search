import { connect } from 'react-redux'

import Search from '../components/Search'
import { types } from '../actions'

const mapStateToProps = (state) => ({
  results: state.search.query.results,
  isLoading: state.search.query.isLoading
})

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (values) => {
    dispatch({
      type: types.SEARCH_QUERY,
      payload: values
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
