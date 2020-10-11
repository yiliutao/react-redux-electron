import * as React from 'react';
import styled from 'styled-components';

//使用redux必须要引入的库
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionIds } from '@lwRedux/action/actions';
import * as ActionCreator from '@lwRedux/action/creator';

interface PropsStruct {
    className: any,
    dispatch: any
}
class ForgetPwd extends React.Component<PropsStruct, {}>{
    render() {
        return <div>忘记密码</div>;
    }
}
const WrapStyle = styled(ForgetPwd)``;
const mapStateToProps = (state: any) => {
    return {};
};
const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(ActionCreator, dispatch);
};
const WrappPage = connect(mapStateToProps, mapDispatchToProps)(WrapStyle);
export default WrappPage;
