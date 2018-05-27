import React from 'react'
import { reduxForm, Field } from 'redux-form'

let SearchForm = ({ handleSubmit, pristine, submitting }) => (
  <form onSubmit={handleSubmit}>
    <div className="input-group">
      <Field name="query"
             className="form-control"
             component="input"
             type="text"
             placeholder="Enter a query"/>
           <div className="input-group-append">
             <button type="submit"
                     className="btn btn-primary"
                     disabled={pristine || submitting}>
               Search
             </button>
           </div>
    </div>
  </form>
)

SearchForm = reduxForm({
  form: 'search'
})(SearchForm)

export default SearchForm
