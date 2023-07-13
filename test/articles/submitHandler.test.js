import submitHandler from "../../pages/articles/test.vue"; // テスト対象のページ
import { mount } from "@vue/test-utils";
import axios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";

// MSWでサーバーのモック作成
const server = setupServer(
  rest.post("/api/article/post", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ message: "Success" }));
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

// vue-routerのmock
const mockPush = jest.fn();
jest.mock("vue-router", () => ({
  useRouter: () => {
    return {
      push: mockPush,
    };
  },
}));

describe("submitHandler", () => {
  test("mount submitHandler", async () => {
    const wrapper = mount(submitHandler);
    expect(wrapper.text()).toContain("投稿する");
  });
  test("タイトルと値が空の場合、エラーを返す", async () => {
    // コンポーネントのマウント
    const wrapper = mount(submitHandler);

    //　タイトルと内容を空で関数を呼び出す
    await wrapper.vm.submitHandler();

    //　エラーメッセージが表示される
    expect(wrapper.text()).toContain("タイトルを入力してください");
    expect(wrapper.text()).toContain("内容を入力してください");
  });
  test("POSTリクエストが正常に行われる", async () => {
    // jest spyOnでのモックの作成　MSWで書いたためコメントアウト
    // const mockResponse = { data: { message: "Success" } };
    // jest.spyOn(axios, "post").mockResolvedValue(mockResponse);

    // コンポーネントのマウント
    const wrapper = mount(submitHandler);

    const title = wrapper.find("#title");
    await title.setValue("dammyTitle");
    const content = wrapper.find("#content");
    await content.setValue("dammyContent");
    await wrapper.vm.submitHandler();

    const response = await axios.post("/api/article/post", {
      article: { title: "dammytitle", body: "dammycontent" },
    });
    // 成功メッセージが表示されることを確認
    expect(response.data).toEqual({ message: "Success" });

    // マイページへの遷移
    expect(mockPush).toBeCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
