import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as widgetsActions from 'redux/modules/widgets'

export default class Widgets extends Component{
  render(){
    let refreshClassName = 'fa fa-refresh';
    return(
      <div className="container widgets">
        <h1>
          Widgets
          <button className='refreshBtn btn btn-success' >
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
      </div>

    )
  }
}