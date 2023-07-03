import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
export default function (Vue) {
    Vue.use(VeeValidate)
    // 校验错误的中文包
    VeeValidate.Validator.localize('zh_CN', {
        messages: {
            ...zh_CN.messages,
            is: (field) => `${field}必须与密码相同`  // 修改内置规则的message
        },
        attributes: { // 给校验的field属性名映射中文名称
            phone: '手机号',
            code: '验证码',
            password: '密码',
            passwordAgain: '确认密码',
            agree: '协议'
        }
    })

    // 自定义校验
    VeeValidate.Validator.extend('agree', {
        validate: n => n,
        getMessage: field => '请同意' + field + ',未同意' + field + ',不可注册账号'
    })
}