import ExhibitionPage from '@/views/ExbtDetail.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import mockAPI from "@/utils/API"
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'

const routes = [
  {
    path: "/exhibition_page",
    name: "Admin_exhibition",
  },
];

const router = new VueRouter({
  routes,
});

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(ElementUI);

const wrapper = shallowMount(ExhibitionPage, { router, localVue });

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

describe('exhibition detail page', () => {

	//HERE IS HOW TO TEST MODULE BEHAVIORS WITH THE MOCKED API
	it(('test getData'), async () => {
		await wrapper.vm.getExhibitionData(1);	// await is essential, otherwise Promise.prototype.then() may not be executed
		expect(wrapper.vm.exhibition.title).toBe("abc")
		expect(wrapper.vm.exhibition.intro).toBe("dcba")
		expect(wrapper.vm.exhibition.tags).toStrictEqual([])
		expect(wrapper.vm.exhibition.likesNum).toBe(0)
		expect(wrapper.vm.exhibition.like).toBe(true)
		expect(wrapper.vm.exhibition.isOpen).toBe(true)
	})

	

	

	
})
