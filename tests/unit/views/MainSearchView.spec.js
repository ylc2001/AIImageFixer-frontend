import MainSearchView from '@/views/MainSearchView.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import ElementUI from 'element-ui'
import VueRouter from 'vue-router'

const routes = [
    {
        path: '/main_search',
        name: 'main_search',
    },
]

const router = new VueRouter({
    routes
})

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)

const wrapper = shallowMount(MainSearchView, { router, localVue })

jest.mock('@/utils/communication', () => {
    return {
        request_json: (url, method,) => {
            if (url == "/index" && method == "get")
                return Promise.resolve({
                    code: 200,
                    data: {
                        exhibits: [{
                            id: 1,
                            title: "test-title",
                            intro: "test-intro",
                            style: 0,
                            time: 0,
                            likesNum: 10,
                            pic: ""
                        }],
                        pics: [],
                    }
                })
            if (url == "/user/login" && method == "post")
                return Promise.resolve({
                    code: 200,
                    data: "ok"
                })
            if (url == "/user/register" && method == "post")
                return Promise.resolve({
                    code: 200,
                    data: "ok"
                })
        },
    }
})

describe('login', () => {

    //HERE IS HOW TO TEST MODULE BEHAVIORS WITH THE MOCKED API
    it(('test login click'), async () => {
        await wrapper.vm.login_click();	// await is essential, otherwise Promise.prototype.then() may not be executed
        expect(wrapper.vm.loginDialog_visible).toBe(true)
    })
    it(('test login'), async () => {
        wrapper.vm.loginDialog_visible = true
        wrapper.vm.login_info = {
            username: "test",
            password: "test"
        }
        await wrapper.vm.onLogin();	// await is essential, otherwise Promise.prototype.then() may not be executed
        expect(wrapper.vm.user_logged).toBe(true)
        expect(wrapper.vm.loginDialog_visible).toBe(false)
    })
})

describe('register', () => {

    //HERE IS HOW TO TEST MODULE BEHAVIORS WITH THE MOCKED API
    it(('test register'), async () => {
        wrapper.vm.signupDialog_visible = true
        wrapper.vm.signup_info = {
            username: "test",
            password: "test",
            identity: "普通用户"
        }
        await wrapper.vm.onSignup();	// await is essential, otherwise Promise.prototype.then() may not be executed
        expect(wrapper.vm.signupDialog_visible).toBe(false)
    })
})