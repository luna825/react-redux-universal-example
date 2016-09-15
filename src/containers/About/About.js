import React, {Component} from 'react'


export default class About extends Component {

  state = {
    showKitten: false
  }

  handleToggleKitten(){
    this.setState({
      showKitten: !this.state.showKitten
    })
  };

  render(){
    const {showKitten} = this.state;
    return(
      <div className="container">
        <h1>关于我们</h1>
        <p>这是项目是我学习Erik Rasmussen的照搬作品，只是整个react redux开发过程的一个熟悉，没原创性.非常感谢原作者的开源</p>
        <h3>Mini Bar <span style={{color: '#aaa'}}>(not that kind)</span></h3>
        <p>Hey!这里你将看到一个迷你的infoBar.显示的信息与infoBar相同</p>
        <h3>图片</h3>
        <p>
          你想看这只猫么?
          <button className={'btn btn-' + (showKitten ? 'danger' : 'success')} style={{marginLeft:50}}
          onClick={this.handleToggleKitten.bind(this)}>
            {showKitten ? 'No! Take it away!' : 'Yes! Please!'}
          </button>
        </p>
        {showKitten && <div><img style={{height:300,width:200}} src='/assets/kitten.jpeg'/></div>}
      </div>
    )
  }
}