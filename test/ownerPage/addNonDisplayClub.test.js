import addNonDisplayClubFunction from "../../components/ownerPage/ClubFunction.vue"; // テスト対象のページ
import { mount } from "@vue/test-utils";
import axios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";

// MSWでサーバーのモック作成;
const server = setupServer(
  rest.patch("/api/club/nonDisplayClub", (req, res, ctx) => {
    return res(ctx.json({ message: "Success" }));
  })
);
beforeAll(() => {
  server.listen();
});
beforeEach(() => {
  jest.restoreAllMocks();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe("addDisplayClubFunction", () => {
  test("ページがマウントできているか確認", async () => {
    const wrapper = mount(addNonDisplayClubFunction);
    expect(wrapper.text()).toContain("タグ編集：");
  });

  test("何も選択せずにボタンを押下した場合", async () => {
    // コンポーネントのマウント
    const wrapper = mount(addNonDisplayClubFunction);
    // // POSTリクエストの実行
    await wrapper.find("#addnonDisplayClubBtn").trigger("click");
    const errorMsg = wrapper.vm.msgForaddnonDisplayClub;
    console.log(wrapper.vm.msgForaddnonDisplayClub);
    expect(errorMsg).toBe("サークルを選択してください");
  });

  test("value:1のラジオボタンを選んでボタンを押下", async () => {
    // コンポーネントのマウント
    const wrapper = mount(addNonDisplayClubFunction);
    // valueが1のラジオボタンを確認
    const radioInput = wrapper.find(
      'input[type="radio"][id="nonDisplayclub3"]'
    );
    expect(radioInput.wrapperElement._value.id).toEqual("3");
    // //チェックをして、送信
    await radioInput.setChecked();
    await wrapper.find("#addnonDisplayClubBtn").trigger("click");
    const response = await axios.patch("/api/club/nonDisplayClub", {
      nondisplayClub: radioInput.wrapperElement._value.id,
    });
    // 成功メッセージが表示されることを確認
    expect(response.data).toEqual({ message: "Success" });
    // エラーメッセージも表示されていないことを確認
    expect(wrapper.text()).not.toContain("サークルを選択してください");
  });
});
