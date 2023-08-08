import { mount } from "@vue/test-utils";
import Login from "../pages/login.vue";

jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithPassword: jest
        .fn()
        .mockResolvedValue({ data: { session: "あああ" } }), // 成功時の戻り値
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
  it("updates item value when submit is called", async () => {
    const submit = {
      email: "himuro@rakus-partners.co.jp",
      password: "Qwer1234",
    };
    const wrapper = mount(Login);
    wrapper.vm.submit(submit);
    // // 必要に応じて次の行を追加
    await wrapper.vm.$nextTick();

    // マイページへの遷移
    expect(mockPush).toBeCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/");

    //エラーメッセージ
    expect(wrapper.vm.errorMessage).toBe("　　　　");
  });
});
