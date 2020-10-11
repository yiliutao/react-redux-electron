import * as React from 'react';
import './biz.less';
import styled from 'styled-components';

//使用redux必须要添加的引用
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ActionIds } from "@lwRedux/action/actions";
import * as ActionCreator from "@lwRedux/action/creator";

interface PropStruct {
    dispatch: any,
    className?: string;
}
class Biz extends React.Component<PropStruct, {}>{
    render() {
        return <div>业务内容</div>;
    }
}
const stylePage = styled(Biz)``;
//store中最新state数据映射到组件中
const mapStateToProps = (state: any, props: PropStruct) => {
    return {};
}
//dispatch方法映射到组件属性中
const mapDispatchToProps = (dispatch: any, props: PropStruct) => {
    return bindActionCreators(ActionCreator, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(stylePage);