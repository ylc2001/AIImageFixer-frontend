import FixOverview from "@/components/admin_page/FixOverview.vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import ElementUI from "element-ui";

const localVue = createLocalVue();
localVue.use(ElementUI);

const wrapper = shallowMount(FixOverview, { localVue });

jest.mock("@/utils/communication", () => {
  return {
    request_json: (url, method) => {
      if (url == "/pictures/pictures_search" && method == "get") {
        return Promise.resolve({
          code: 200,
          data: [
            {
              id: 1734,
              title: "image title in unit test",
              intro: "Abcd",
              time: "2022.3.30",
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

describe("pictures search", () => {
  it("handle click", async () => {
    await wrapper.vm.handleClick({ index: 0 });
    expect(wrapper.vm.unfixedList[0].title).toBe("image title in unit test");
    await wrapper.vm.handleClick({ index: 1 });
    expect(wrapper.vm.fixingList[0].title).toBe("image title in unit test");
    await wrapper.vm.handleClick({ index: 2 });
    expect(wrapper.vm.finishedList[0].title).toBe("image title in unit test");
    await wrapper.vm.handleClick({ index: 3 });
  });
  it("search by", async () => {
    await wrapper.vm.search_by(1);
    expect(wrapper.vm.unfixedList[0].title).toBe("image title in unit test");
    await wrapper.vm.search_by(2);
    expect(wrapper.vm.finishedList[0].title).toBe("image title in unit test");
    await wrapper.vm.search_by(0);
  });
  it("sort by", async () => {
    await wrapper.vm.sort_by(1);
    await wrapper.vm.sort_by(2);
    await wrapper.vm.sort_by(0);
  });
  it("other functions", async () => {
    wrapper.vm.uploaded_new_pic();
    wrapper.vm.cancel_clicked();
    wrapper.vm.repair({ id: 0 });
    wrapper.vm.delete_img({ id: 0 });
    wrapper.vm.handleRemove();
    wrapper.vm.handlePreview();
  });
});
