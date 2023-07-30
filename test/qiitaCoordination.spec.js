import { mount } from "@vue/test-utils";
import qiitaCoordination from "../pages/qiitaCoordination.vue";
import axios from "axios";

jest.mock("axios"); // axiosモジュールをモック化

describe("Login", () => {
  it("when submit is called", async () => {
    // 仮想的な `fetch` レスポンスを定義
    global.fetch = jest.fn().mockResolvedValue({
      // json: jest.fn().mockResolvedValue({ id: "javlkd" }),
      then: jest.fn().mockResolvedValue(),
      then: jest.fn().mockResolvedValue({ data: { id: "javlkd" } }),
    });

    // モックの作成
    const mockResponse = { data: { message: "Success" } };
    // jest.spyOn(axios, "post").mockResolvedValue(mrm -rf node_modulesockResponse);
    axios.post.mockResolvedValue(mockResponse); // axios.postメソッドのモックを設定

    const submit = {
      text: "Qwer1234",
    };

    const postData = {
      userId: "userId",
      qiitaToken: "accessToken",
    };

    const wrapper = mount(qiitaCoordination);
    // // 必要に応じて次の行を追加
    await wrapper.vm.$nextTick();

    const response = await axios.post("/api/user/qiitaTokenUpdate", {
      body: postData,
    });
    // 期待されるPOSTリクエストのURLやデータを確認するアサーション
    expect(axios.post).toHaveBeenCalledWith("/api/user/qiitaTokenUpdate", {
      body: postData,
    });

    // 成功メッセージが表示されることを確認するアサーション
    expect(response.data).toEqual({ message: "Success" });

    //userIdの確認
    expect(wrapper.vm.userId).toBe("sdafdsvoias");

    wrapper.vm.submit(submit);
    // // 必要に応じて次の行を追加
    await wrapper.vm.$nextTick();

    console.log("errorMessage", wrapper.vm.successMessage);
    // expect(wrapper.vm.successMessage).toStrictEqual(
    //   "アクセストークンを登録しました"
    // );
  });
});
