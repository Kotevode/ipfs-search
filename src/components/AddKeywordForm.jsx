import React from 'react'
import { Field, reduxForm } from 'redux-form'

let AddKeywordForm = ({ handleSubmit, pristine, submitting}) => (
  <form onSubmit={handleSubmit}>
    <div className="input-group">
      <Field name="keyword"
             className="form-control"
             component="input"
             type="text"
             placeholder="Keyword to bind"
             aria-label="Keyword to bind" />
           <div className="input-group-append">
             <button type="submit"
                     disabled={pristine || submitting}
                     className="btn btn-primary">
                     Bind
                   </button>
           </div>
    </div>
  </form>
)

AddKeywordForm = reduxForm({
  form: 'bindToKeyword'
})(AddKeywordForm)

export default AddKeywordForm
