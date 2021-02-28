import React from 'react';
import Loadable from 'react-loadable';
import {Spin} from "antd";

const LoadableComponent = Loadable({
  loader: () => import('./index'),
  loading(){
      return <div style={{margin:"0px auto"}}>
                <Spin></Spin>
            </div>
  }
});

export default ()=> <LoadableComponent />