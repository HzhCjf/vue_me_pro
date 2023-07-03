import { Dialog, Message, Button } from 'element-ui';

export default function (Vue) {
    // elementUi组件库的组件以及方法使用
    // 对话框
    Vue.use(Dialog)
    // 按钮
    Vue.use(Button)
    // 消息提示
    Vue.prototype.$message = Message;
}