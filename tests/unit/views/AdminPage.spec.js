import { shallowMount, createLocalVue } from "@vue/test-utils";
import AdminPage from "@/views/AdminPage.vue";
import ElementUI from "element-ui";

const localVue = createLocalVue();
localVue.use(ElementUI);

const wrapper = shallowMount(AdminPage, { localVue });

describe("AdminPage unit test", () => {
  it("data is correct", () => {
    const msg = "first";
    expect(wrapper.vm.activeName).toMatch(msg);
  });
  it("datetime function", () => {
    var d = new Date();
    d.setTime(10000000070);
    expect(wrapper.vm.datetime(10000000070)).toBe(d.toLocaleString());
    //d.setTime(10000000070);
    //expect(wrapper.vm.datetime(10000072)).toBe(d.toLocaleString());
  });
});
