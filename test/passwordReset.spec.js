import { mount } from "@vue/test-utils";
import passwordReset from "../pages/test/passwordReset.vue";

jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    auth: {
      updateUser: jest.fn().mockResolvedValue({ data: { user: "あああ" } }), // 成功時の戻り値
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
      password: "Qwer1234",
    };
    const wrapper = mount(passwordReset);

    //userIdの確認
    expect(wrapper.vm.userId).toBe("sdafdsvoias");

    wrapper.vm.submit(submit);
    // // 必要に応じて次の行を追加
    await wrapper.vm.$nextTick();

    // 遷移テスト
    expect(mockPush).toBeCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith({ path: "/login" });

    //パスワード再設定完了メッセージ
    expect(wrapper.vm.success).toStrictEqual("パスワードを再設定しました。");
  });
});
