import React from 'react'
import { Field, reduxForm } from 'redux-form'

let RegistrationForm = ({ handleSubmit, pristine, submitting }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="ipfsAddress">IPFS address</label>
      <Field name="ipfsAddress"
             className="form-control"
             component="input"
             type="text"/>
    </div>
    <button type="submit" disabled={pristine || submitting} className="btn btn-primary">Add</button>
  </form>
)

RegistrationForm = reduxForm({
  form: 'newResource',
})(RegistrationForm)

export default RegistrationForm
