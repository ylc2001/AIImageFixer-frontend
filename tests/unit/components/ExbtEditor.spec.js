import ExbtEditor from '@/components/admin_exhibition/ExbtEditor.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import ElementUI from 'element-ui'



describe('editing exhibition information', () => {

	//HERE IS HOW TO TEST MODULE BEHAVIORS WITH THE MOCKED API
	it(('test getData'), async () => {
		const wrapper = shallowMount(ExbtEditor, {
      propsData: {
        title: "abcd",
        intro: "edcba",
        tags: [],
        isOpen: true,
      }
    });
    expect(wrapper.vm.title).toBe("abcd");
    expect(wrapper.vm.intro).toBe("edcba");
    expect(wrapper.vm.isOpen).toBe(true);
	})

	

	

	
})
