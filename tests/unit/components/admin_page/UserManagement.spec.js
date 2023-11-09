import UserManagement from "@/components/admin_page/UserManagement.vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import ElementUI from "element-ui";

const localVue = createLocalVue();
localVue.use(ElementUI);

const wrapper = shallowMount(UserManagement, { localVue });

jest.mock("@/utils/communication", () => {
  return {
    request_json: (url, method) => {
      if (url == "/user/search_user" && method == "get") {
        return Promise.resolve({
          code: 200,
          data: [
            {
              username: "Alice in unit-test",
              id: 1,
            },
            {
              username: "Bob in unit-test",
              id: 2,
            },
            {
              username: "Carol in unit-test",
              id: 3,
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
    expect(wrapper.vm.waitingList[0].username).toBe("Alice in unit-test");
    await wrapper.vm.handleClick({ index: 1 });
    expect(wrapper.vm.registeredList[0].username).toBe("Alice in unit-test");
    await wrapper.vm.handleClick({ index: 2 });
    expect(wrapper.vm.bannedList[0].username).toBe("Alice in unit-test");
    await wrapper.vm.handleClick({ index: 3 });
  });
  it("search by", async () => {
    await wrapper.vm.search_user();
    expect(wrapper.vm.waitingList[0].username).toBe("Alice in unit-test");
    expect(wrapper.vm.registeredList[0].id).toBe(1);
    expect(wrapper.vm.bannedList[1].username).toBe("Bob in unit-test");
  });
  it("sort by", async () => {
    await wrapper.vm.sort_by(1);
    await wrapper.vm.sort_by(2);
    await wrapper.vm.sort_by(0);
  });
  it("other functions", async () => {
    wrapper.vm.accept_user({ id: 0 });
    wrapper.vm.reject_user({ id: 0 });
    wrapper.vm.ban_user({ id: 0 });
    wrapper.vm.un_ban_user({ id: 0 });
  });
});
