import React, {Component, PropTypes} from 'react'
import connect from 'react-redux'
import {SurveyForm} from 'components'

export default class Survey extends Component {
  render(){
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
        <div></div>
        <p></p>
        <SurveyForm />
      </div>
    )
  }
}