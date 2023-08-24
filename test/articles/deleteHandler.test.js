import deleteHandler from "../../components/articles/DeleteHandler.vue"; // テスト対象のページ
import { mount } from "@vue/test-utils";
import axios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";

// MSWでサーバーのモック作成
const server = setupServer(
  rest.patch("/api/article/delete", (req, res, ctx) => {
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

// vue-routerのmock
const mockPush = jest.fn();
jest.mock("vue-router", () => ({
  useRouter: () => {
    return {
      push: mockPush,
    };
  },
}));

describe("deleteHandler_1", () => {
  test("mount deleteHandler Component", async () => {
    const wrapper = mount(deleteHandler);
    expect(wrapper.text()).toBe("削除する");
  });
  test("PATChリクエストが正常に行われる", async () => {
    // コンポーネントのマウント
    const wrapper = mount(deleteHandler);
    const id = 2;
    // POSTリクエストの実行
    await wrapper.find("button").trigger("click");

    const response = await axios.patch("/api/article/delete", {
      body: {
        id,
      },
    });

    // 成功メッセージが表示されることを確認
    expect(response.data).toEqual({ message: "Success" });

    // マイページへの遷移
    expect(mockPush).toBeCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
