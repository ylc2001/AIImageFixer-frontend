import ImgFixingDetail from '@/views/ImgFixingDetail.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import mockAPI from "@/utils/API"
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'

const routes = [
	{
    path: '/img_fixing_page',
  },
]

const router = new VueRouter({
	routes
})

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)

const wrapper = shallowMount(ImgFixingDetail, { router, localVue })

// HERE IS HOW TO MOCK AN API IN @/api/* WHICH SENDS REQUESTS TO BACKEND
jest.mock('@/utils/communication', () => {
	return {
		request_json: (url, method, data) => {
			if(url == mockAPI.exhibit_search.path && method == mockAPI.exhibit_search.method) {
				return Promise.resolve({
					code: 200,
					data: {
						title: "abc",
        	  intro: "dcba",
        	  tags: [],
        	  likesNum: 0,
        		pic: [],
         		like: 1,
         		likes: [],
         		public: 1,
					}
				})
			}
			else if(url == mockAPI.exhibit_modify.path &&  method == mockAPI.exhibit_modify.method) {
				return Promise.resolve({
					code: 200,
				})
			}
		},
	}
})

describe('img fixing detail page', () => {

	//HERE IS HOW TO TEST MODULE BEHAVIORS WITH THE MOCKED API
	it(('test getData'), async () => {
		
    wrapper.vm.picture.picList = [
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F9295283681%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650596938&t=3cab587573c10c30d663f442b413506a",
      "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
    ];
    expect(wrapper.vm.stepCnt).toBe(2);

	})

	

	

	
})
