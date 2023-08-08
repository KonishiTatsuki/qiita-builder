import { mount } from "@vue/test-utils";
import passwordForget from "../pages/passwordForget.vue";

jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    auth: {
      resetPasswordForEmail: jest.fn().mockResolvedValue({}), // 成功時の戻り値
    },
  })),
}));

const mockPush = jest.fn();
jest.mock("vue-router", () => ({
  useRouter: () => {
    return {
      push: mockPush,
    };
  },
}));

describe("Login", () => {
  it("when submit is called", async () => {
    const submit = {
      email: "himuro@rakus-partners.co.jp",
    };
    const wrapper = mount(passwordForget);
    wrapper.vm.submit(submit);
    // // 必要に応じて次の行を追加
    await wrapper.vm.$nextTick();

    // マイページへの遷移
    // expect(mockPush).toBeCalledTimes(1);
    // expect(mockPush).toHaveBeenCalledWith("/");

    //返ってきた値の確認
    expect(wrapper.vm.data).toStrictEqual({});
  });
});
