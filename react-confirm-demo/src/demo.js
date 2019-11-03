import React from "react";
import confirm from "./confirm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: true
    };
  }

  render() {
    return (
      <div>
        <p>
          请写一个满足以下要求的confirm方法组件（可以参考一下 ， antd 的 Modal
          组件的 Modal.info, Modal.waring . 这样的用法 ）： <br/>
          （1）能在任意组件(示例如下)的componentDidMount生命周期中挂载，并返回一个promise；<br/>
          （2）能通过返回值判断用户点击的是确定还是取消。<br/>
        </p>
      </div>
    );
  }

  async componentDidMount() {
    let res = await confirm("确定删除吗");
    if (res) {
      console.log("是", res);
    } else {
      console.log("否", res);
    }
  }
}

export default App;
