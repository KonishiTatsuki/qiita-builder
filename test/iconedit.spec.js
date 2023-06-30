import { shallowMount } from "@vue/test-utils";
import UserEdit from "../pages/userEdit/[id].vue";

describe("UserEdit component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(UserEdit, {
      global: {
        mocks: {
          // 必要に応じて他のモックを追加
          $route: {
            params: {
              id: '034ed2b9-13a0-48f5-bb1e-9ee4b888df77' // 必要に応じて適切なテストIDを設定
            },
          },
        },
      },
    });
  });

  it("should toggle iconeditbool when the button is clicked", async () => {
    const button = wrapper.find('.btn.mt-5');

    // Initial value of iconeditbool should be false
    expect(wrapper.vm.iconeditbool).toBe(false);

    // Click the button
    await button.trigger("click");

    // iconeditbool should be true after clicking the button
    expect(wrapper.vm.iconeditbool).toBe(true);

    // Click the button again
    await button.trigger("click");

    // iconeditbool should be false again
    expect(wrapper.vm.iconeditbool).toBe(false);
  });
});
