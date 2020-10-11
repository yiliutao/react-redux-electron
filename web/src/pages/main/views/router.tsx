import * as React from "react";
import { HashRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Switch, Redirect, Route } from 'react-router-dom';
import Biz from './biz/biz';
import ForgetPwd from './password/forgetPwd';
import Login from './login/login';

//使用redux必须要添加的引用
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionIds } from '@lwRedux/action/actions';
import * as ActionCreator from '@lwRedux/action/creator';

interface PropStruct {
    className?: string,
}
class Layout extends React.Component<PropStruct, {}>{
    render() {
        return <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/biz" component={Biz} />
                <Route path="/forgetPassword" component={ForgetPwd} />
                <Redirect to="/login" />
            </Switch>
        </HashRouter>;
    }
}
const StyleLayout = styled(Layout)``;
const mapStateToProps = (state: any, props: PropStruct) => {
    return {};
};
const mapDispatchToProps = (dispatch: any, props: PropStruct) => {
    return bindActionCreators(ActionCreator, dispatch);
};
const WrappLayout = connect(mapStateToProps, mapDispatchToProps)(StyleLayout);
export default WrappLayout;