import ReactDOM from "react-dom";
import React from "react";
import './index.css'

// 方法组件 ： confirm
class Confirm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      info: ''
    }
  }
  render() {
    const { contentInfo, onOk, onCancel } = this.props
    return (
      <div className="confirm__mask">
        <div className="confirm__wrap">
          <div className="confirm__content">{contentInfo}</div>
          <div className="confirm__footer">
            <button className="confirm__footer__button-ok" onClick={onOk}>
              <span>确认</span>
            </button>
            <button className="confirm__footer__button-cancel" onClick={onCancel}>
              <span>取消</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
let node = null

// 入参info: 提示内容
const confirm = info => {
  return new Promise((resolve, reject) => {
    // 确定执行内容
    var onOk = (e) => {
      if (node) {
        ReactDOM.unmountComponentAtNode(node);
        document.body.removeChild(node);
        resolve(true);
      }
    };
    // 取消执行内容
    var onCancel = (e) => {
      if (node) {
        ReactDOM.unmountComponentAtNode(node);
        document.body.removeChild(node);
        resolve(false);
      }
    }
    node = document.createElement("div");
    document.body.appendChild(node);
    ReactDOM.render(<Confirm onOk={onOk} onCancel={onCancel} contentInfo={info} />, node);
  })
};

export default confirm
