import ExhibitionOverview from "@/components/admin_page/ExhibitionOverview.vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import ElementUI from "element-ui";

const localVue = createLocalVue();
localVue.use(ElementUI);

const wrapper = shallowMount(ExhibitionOverview, { localVue });

jest.mock("@/utils/communication", () => {
  return {
    request_json: (url, method) => {
      if (url == "/exhibits/exhibits_search" && method == "get") {
        return Promise.resolve({
          code: 200,
          data: [
            {
              id: 123,
              title: "title in unit test",
              intro: "dcba",
              style: 0,
              time: 1000000000,
              like: 0,
              tags: [],
            },
          ],
        });
      } else if (url == "/exhibits/exhibit_add/" && method == "post") {
        return Promise.resolve({
          code: 200,
          data: [],
        });
      }
    },
  };
});

describe("exhibits search", () => {
  it("handle click", async () => {
    await wrapper.vm.handleClick({ index: 0 });
    expect(wrapper.vm.allList[0].title).toBe("title in unit test");
    await wrapper.vm.handleClick({ index: 1 });
    expect(wrapper.vm.editingList[0].title).toBe("title in unit test");
    await wrapper.vm.handleClick({ index: 2 });
    expect(wrapper.vm.finishedList[0].title).toBe("title in unit test");
    await wrapper.vm.handleClick({ index: 3 });
  });
  it("search by", async () => {
    await wrapper.vm.search_by(1);
    expect(wrapper.vm.allList[0].title).toBe("title in unit test");
    await wrapper.vm.search_by(2);
    expect(wrapper.vm.editingList[0].title).toBe("title in unit test");
    await wrapper.vm.search_by(0);
  });
  it("sort by", async () => {
    await wrapper.vm.sort_by(1);
    await wrapper.vm.sort_by(2);
    await wrapper.vm.sort_by(0);
  });
  it("clear form", async () => {
    wrapper.vm.clear_form_data();
    expect(wrapper.vm.form.username).toBe("");
    expect(wrapper.vm.form.title).toBe("");
    expect(wrapper.vm.form.intro).toBe("");
    expect(wrapper.vm.form.style).toBe("");
  });
  it("other functions", async () => {
    wrapper.vm.create_new_exhibition();
    wrapper.vm.edit_exhibition({ id: 0 });
    wrapper.vm.delete_exhibition({ id: 0 });
  });
});
