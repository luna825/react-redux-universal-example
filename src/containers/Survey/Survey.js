import React, {Component, PropTypes} from 'react'
import {SurveyForm} from 'components'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {load} from 'redux/modules/survey'

const data={
      name: 'Little Bobby Tables',
      email: 'bobby@gmail.com',
      occupation: 'Redux Wizard',
      employed: true,
      sex: 'male'
    }

@connect(
 ()=>({}),
 dispatch => bindActionCreators({load}, dispatch)
)
export default class Survey extends Component {


  render(){
    const {load} = this.props;
    return(
      <div className="container">
        <h1>Survey</h1>
        <p>这是一个redux-form的应用示例，将所有的状态都存入redux store中.所有的组件都是非tdce</p>
        <p>注意事项</p>
        <ul>
          <li>刚开始没有验证错误显示</li>
          <li>验证错误只当失去焦点时显示</li>
          <li>当错误纠正后验证错误隐藏</li>
          <li><code>valid</code>, <code>invalid</code>, <code>pristine</code>和<code>dirty</code>
            表单改变时会出现标记
          </li>
          <li><em>Except</em>当你点击提交时，他们会显示成无效字段</li>
          <li>初始化按键，会将初始整个表单的值</li>
        </ul>
        <div style={{textAlign: 'center', margin: 15}}>
          <button className="btn btn-primary" onClick={()=>load(data)}>
            <i className="fa fa-pencil"/> Initialize Form
          </button>
        </div>

        <p></p>
        <SurveyForm/>
      </div>
    )
  }
}