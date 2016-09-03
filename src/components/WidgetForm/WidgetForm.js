import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import widgetValidation,{colors} from './widgetValidation';
import * as widgetActions from 'redux/modules/widgets';


@connect(
  state => ({
    saveError: state.widgets.saveError
  }),
  dispatch => bindActionCreators(widgetActions, dispatch)
)
@reduxForm({
  form: 'widget',
  validate:widgetValidation
})
export default class WidgetForm extends Component {

  render() {
    const {submitting, form, editEnd, pristine, 
          invalid, saveError:{[form]:saveError}, save, handleSubmit} = this.props;
    return (
      <tr className={submitting ? "saving" : ''}>
        <td className="idCol">{form}</td>
        <td className="colorCol">
          <Field name="color" component={renderSelect} colors={colors} />
        </td>
        <td className="sprocketCol">
          <Field name="sprocketCount" component={renderField} type="text" />
        </td>
        <td className="ownerCol">
          <Field name="owner" component={renderField} type="text" />
        </td>
        <td className="buttonCol">
          <button className="btn btn-default"
                  onClick={()=>editEnd(form)} //or editEnd.bind(this, form)
                  disabled={submitting}>
            <i className="fa fa-ban"/> Cancel
          </button>
          <button className="btn btn-success"
                  onClick={handleSubmit((data) => save(data)
                    .catch(error => {
                      if (typeof error === 'object'){
                        return Promise.reject(new SubmissionError(error))
                      }
                    })
                  )}
                  disabled={pristine || invalid || submitting}>
            <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
          </button>
          {saveError && <div className="text-danger">{saveError}</div>}
        </td>
      </tr>
    );
  }
}

function renderField({ input, type, meta: { touched, error } }){
  return(
    <div>
      <input type={type} {...input} className="form-control"/>
      { error && <span className="text-danger">{error}</span>}
    </div>
  )
}

function renderSelect({input ,colors, meta:{touched,error}}){
  return (
    <div>
      <select {...input} className="form-control">
         {colors.map(valueColor => <option value={valueColor} key={valueColor}>{valueColor}</option>)}
      </select>
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  )
}