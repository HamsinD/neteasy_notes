import React from 'react'
import './index.css'

class InputNumber extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
  }
  
	render() {
    const { onChange } = this.props;
    if (this.props.value) {
      return <input {...this.props} value={this.state.value} onChange={(e) => {
        this.setState({
           value: e.target.value
        }, onChange(e));
      }} />;
    }
    if (this.props.defaultValue) {
      return <input {...this.props} value={this.props.defaultValue} onChange={onChange} />;
    }
		return <input {...this.props}/>;
	}
}

export default InputNumber
