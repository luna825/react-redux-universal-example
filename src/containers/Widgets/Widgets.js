import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {isLoaded,load as loadWidgets} from 'redux/modules/widgets'
import * as widgetsActions from 'redux/modules/widgets'
import {asyncConnect} from 'redux-async-connect'
import {WidgetForm} from 'components'

@asyncConnect([{
  deferred: true,
  promise: ({store:{dispatch, getState}}) =>{
    if(!isLoaded(getState())){
      return dispatch(loadWidgets())
    }
  }
}])
@connect(
  state => ({
    widgets: state.widgets.data,
    error: state.widgets.err,
    loading: state.widgets.loading,
    editing: state.widgets.editing
  }),
  dispatch => bindActionCreators(widgetsActions,dispatch)
)
export default class Widgets extends Component{
  static propTypes = {
    widgets: PropTypes.array,
    error:PropTypes.string,
    loading:PropTypes.bool,
    load:PropTypes.func.isRequired,
    editing:PropTypes.object.isRequired,
    editStart:PropTypes.func.isRequired,
  }

  handleEdit(widget){
    const {editStart} = this.props;
    editStart(widget.id)
  }

  render(){
    const {load, widgets, loading, error, editing} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if(loading){
      refreshClassName += ' fa-spin'
    }

    return(
      <div className="container widgets">
        <h1>
          Widgets
          <button className='refreshBtn btn btn-success' onClick={load}>
            <i className={refreshClassName}/> {' '} Reload Widgets
          </button>
        </h1>
        <p>
          If you hit refresh on your browser, the data loading will take place on the server before the page is returned.
          If you navigated here from another page, the data was fetched from the client after the route transition.
          This uses the decorator method <code>@asyncConnect</code> with the <code>deferred: true</code> flag. To block
          a route transition until some data is loaded, remove the <code>deffered: true</code> flag.
          To always render before loading data, even on the server, use <code>componentDidMount</code>.
        </p>
        <p>
          This widgets are stored in your session, so feel free to edit it and refresh.
        </p>

        {error &&
        <div className="alert alert-danger" role="alert">
            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
            {' '}
            {error}
        </div>}
        {widgets && widgets.length &&
        <table className="table table-striped">
          <thead>
          <tr>
            <th className="idCol">ID</th>
            <th className="colorCol">Color</th>
            <th className="sprocketsCol">Sprockets</th>
            <th className="ownerCol">Owner</th>
            <th className="buttonCol"></th>
          </tr>
          </thead>
          <tbody>
            {
              widgets.map((widget)=> editing[widget.id] ?
                <WidgetForm form={String(widget.id)} initialValues={widget} key={String(widget.id)}/> :
                <tr key={widget.id}>
                  <td className="idCol">{widget.id}</td>
                  <td className="colorCol">{widget.color}</td>
                  <td className="sprocketsCol">{widget.sprocketCount}</td>
                  <td className="ownerCol">{widget.owner}</td>
                  <td className="buttonCol">
                    <button className="btn btn-primary" onClick={this.handleEdit.bind(this,widget)}>
                      <i className="fa fa-pencil"/> Edit
                    </button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
        }

      </div>



    )
  }
}