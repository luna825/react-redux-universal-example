import React, {Component, PropTypes} from 'react'
import {reduxForm, Field} from 'redux-form'
import surveyValidation from './surveyValidation';




const renderField = 
  ({ input, label, type, meta: { asyncValidating, touched, error, dirty, visited, active } }) => (
  <div className={'form-group' + (error && touched ? ' has-error' : '')}>
    <label htmlFor={input.name} className="col-sm-2">{label}</label>
    <div className="col-sm-8 inputGroup">
      {asyncValidating && <i className="fa fa-cog fa-spin cog" />}
      <input {...input} type={type} placeholder={label} className="form-control"/>
      {touched && error && <div className="text-danger">{error}</div>}
      <div className="flags">
        {dirty && <span className="dirty" title="Dirty">D</span>}
        {active && <span className="active" title="Active">A</span>}
        {visited && <span className="visited" title="Visited">V</span>}
        {touched && <span className="touched" title="Touched">T</span>}
      </div>
    </div>
  </div>
)


@reduxForm({
  form: "survey",
  validate: surveyValidation,
  asyncValidate:asyncValidate,
  asyncBlurFields:['email']
})
export default class SurveyForm extends Component{

  render(){
    const {handleSubmit, reset} = this.props;
    return(
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <Field component={renderField} name="name" label="Full Name" />
          <Field component={renderField} name="email" label="Email" />
          <Field component={renderField} name="occupation" label="Occupation" />

          <div className="form-group">
            <label className="col-sm-2" htmlFor="employed">Employed</label>
            <div className="col-sm-8">
              <Field name="employed" id="employed" component="input" type="checkbox"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2">Sex</label>
            <div className="col-sm-8">
              <label className="radioLabel"><Field name="sex" component="input" type="radio" value="male"/> Male</label>
              <label className="radioLabel"><Field name="sex" component="input" type="radio" value="female"/> Female</label>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-10 col-sm-offset-2">
              <button className="btn btn-success" onClick={handleSubmit}>
                <i className="fa fa-paper-plane" /> Submit
              </button>
              <button className="btn btn-warning" onClick={reset} style={{marginLeft:15}}>
                <i className="fa fa-undo"/> Reset
              </button>
            </div>
          </div>
        </form>
    )
  }

}

function asyncValidate(data){
  if (!data.email){
    return Promise.resolve({});
  }

  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      const errors = {};
      let valid = true;
      if (~['bobby@gmail.com', 'timmy@microsoft.com'].indexOf(data.email)) {
        errors.email = 'Email address already used';
        valid = false;
      }
      if (valid) {
        resolve();
      } else {
        reject(errors);
      }
    },1000)
  })
}