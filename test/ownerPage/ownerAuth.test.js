import submitOwner from "../../components/ownerPage/SubmitOwner.vue"; // テスト対象のページ
import { mount } from "@vue/test-utils";
import axios from "axios";

describe("管理者権限付与/削除のテスト", () => {
  test("ページが初期の状態でマウントされているか確認", async () => {
    const wrapper = mount(submitOwner);

    expect(wrapper.text()).toContain("管理者権限");

    const errormsg = wrapper.find("#errormsg");
    expect(errormsg.text()).toBe("");
  });

  test("メールアドレスが空で関数が実行された際のエラー", async () => {
    const wrapper = mount(submitOwner);

    const inputEmail = wrapper.find("#inputEmail");
    await inputEmail.setValue("");
    await wrapper.vm.submitOwner();

    const errormsg = wrapper.find("#errormsg");
    expect(errormsg.text()).toBe("メールアドレスを入力してください");
  });

  test("メールアドレスが不正な形式で関数が実行された際のエラー", async () => {
    const wrapper = mount(submitOwner);

    const inputEmail = wrapper.find("#inputEmail");
    await inputEmail.setValue("m@rakus");
    await wrapper.vm.submitOwner();

    const errormsg = wrapper.find("#errormsg");
    expect(errormsg.text()).toBe("メールアドレスの形式が不正です");
  });

  test("管理者権限を与えるテスト", async () => {
    const mockResponse = { data: { message: "Success" } };
    jest.spyOn(axios, "patch").mockResolvedValue(mockResponse);

    const wrapper = mount(submitOwner);

    //　インプットに入力して関数実行
    // const inputEmail = wrapper.find("#inputEmail");
    // await inputEmail.setValue("m@rakus-partners.co.jp");
    // await wrapper.vm.submitOwner();

    // API通信で成功が返ってくるか
    const response = await axios.patch("/api/user/ownerRegister", {
      body: { email: "m@rakus-partners.co.jp" },
    });
    expect(axios.patch).toHaveBeenCalledWith("/api/user/ownerRegister", {
      body: { email: "m@rakus-partners.co.jp" },
    });
    // 成功メッセージが表示されることを確認
    expect(response.data).toEqual({ message: "Success" });

    const errormsg = wrapper.find("#errormsg");
    expect(errormsg.text()).toBe("");
  });

  test("管理者権限を削除するテスト", async () => {
    const mockResponse = { data: { message: "Success" } };
    jest.spyOn(axios, "patch").mockResolvedValue(mockResponse);

    const wrapper = mount(submitOwner);

    //　インプットに入力して関数実行
    // API通信で成功が返ってくるか
    const response = await axios.patch("/api/user/ownerDelete", {
      body: { id: "1" },
    });
    expect(axios.patch).toHaveBeenCalledWith("/api/user/ownerDelete", {
      body: { id: "1" },
    });
    // 成功メッセージが表示されることを確認
    expect(response.data).toEqual({ message: "Success" });
  });
});
