import AllExhibsView from '@/views/AllExhibsView.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import ElementUI from 'element-ui'
import VueRouter from 'vue-router'

const routes = [
    {
        path: '/all_exhibs',
        name: 'all_exhibs',
    },
]

const router = new VueRouter({
    routes
})

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)

const wrapper = shallowMount(AllExhibsView, { router, localVue })

jest.mock('@/utils/communication', () => {
    return {
        request_json: (url, method,) => {
            if (url == "/user/login" && method == "post")
                return Promise.resolve({
                    code: 200,
                    data: "ok"
                })
            else if (url == "/user/register" && method == "post")
                return Promise.resolve({
                    code: 200,
                    data: "ok"
                })
            else if(url == "/exhibits/exhibits_search" && method == "get")
                return Promise.resolve({
                    code: 200,
                    data: [{
                        id: 1,
                        title: "test",
                        intro: "test",
                        style: 0,
                        time: 0,
                        pic:"",
                        like: true,
                        tags: []
                    }]
                })
            else
                return Promise.resolve({
                    code: 400,
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

describe('search exhibits', () => {

    //HERE IS HOW TO TEST MODULE BEHAVIORS WITH THE MOCKED API
    it(('test mounted list'), async () => {
        expect(wrapper.vm.exhibits_list[0]).toEqual({
            id: 1,
            title: "test",
            intro: "test",
            style: 0,
            time: 0,
            pic:"",
            like: true,
            tags: []
        })
    })
    it(('test mounted exhibits num'), async () => {
        expect(wrapper.vm.exhibits_list.length).toBe(1)
    })
    it(('test mounted rows num'), async () => {
        expect(wrapper.vm.rows_num).toBe(0)
    })
    it(('test mounted last row num'), async () => {
        expect(wrapper.vm.last_row_num).toBe(1)
    })
    it(('test search list'), async () => {
        await wrapper.vm.search();
        expect(wrapper.vm.exhibits_list[0]).toEqual({
            id: 1,
            title: "test",
            intro: "test",
            style: 0,
            time: 0,
            pic:"",
            like: true,
            tags: []
        })
    })
    it(('test search results num'), async () => {
        await wrapper.vm.search();
        expect(wrapper.vm.exhibits_list.length).toBe(1)
    })
    it(('test search rows num'), async () => {
        await wrapper.vm.search();
        expect(wrapper.vm.rows_num).toBe(0)
    })
    it(('test search last row num'), async () => {
        await wrapper.vm.search();
        expect(wrapper.vm.last_row_num).toBe(1)
    })
})