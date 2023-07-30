import { setupServer } from "msw/node";
import { rest } from "msw";
import Handler from "../pages/ownerPage"; // テスト対象のページ
import { mount } from "@vue/test-utils";

// モックサーバーの設定
// const server = setupServer(
//   rest.post("/api/article/post", (req, res, ctx) => {
//     // モックのレスポンスを返す
//     return res(ctx.status(201));
//   })
// );
// beforeAll(() => {
//   server.listen();
// });
// afterAll(() => {
//   server.close();
// });
describe("submitHandler", () => {
  test("should make a POST request to the correct endpoint", async () => {
    const wrapper = mount(Handler);
    console.log(wrapper.html());
    expect(wrapper.html()).toBe("管理者画面");
    // const title = wrapper.find("#title");
    // await title.setValue("dammyTitle");
    // const content = wrapper.find("#content");
    // await content.setValue("dammyContent");
    // await wrapper.find("button").trigger("click");

    // モックサーバーからの応答を確認したい
    // マイページに遷移できているか確認したい
  });
});
