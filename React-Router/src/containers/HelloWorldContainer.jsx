import { connect } from 'react-redux'


//视图组件
import HelloWorld from '../components/HelloWorld'

//这里其实什么state和actions都没有传递

export default connect()(HelloWorld);