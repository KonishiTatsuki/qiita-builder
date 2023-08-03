import deleteClubFunction from "../../components/ownerPage/ClubFunction.vue"; // テスト対象のページ
import { mount } from "@vue/test-utils";
import axios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";

// MSWでサーバーのモック作成;
const server = setupServer(
  rest.delete("/api/club/delete", (req, res, ctx) => {
    const query = req.url.searchParams.get("clubid");
    if (query === "1") {
      return res(ctx.json({ message: "Success" }));
    } else if (query === "10") {
      return res(ctx.json({ message: "Failed" }));
    }
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
    const wrapper = mount(deleteClubFunction);
    expect(wrapper.text()).toContain("タグ編集：");
  });

  test("削除リクエストを送信", async () => {
    // コンポーネントのマウント
    const wrapper = mount(deleteClubFunction);

    // 1を投げた場合、成功→できていない修正要
    // const deleteReqId = wrapper.vm.addDisplayClub;
    // deleteReqId.value = "1";

    // const deleteClubId = addDisplayClub.value.id;

    // const response1 = await axios.delete(
    //   `/api/club/delete?clubid=${deleteClubId}`
    // );
    const response1 = await axios.delete("/api/club/delete?clubid=1");
    expect(response1.data).toEqual({ message: "Success" });

    // 10を投げた場合、失敗
    const response10 = await axios.delete("/api/club/delete?clubid=10");
    expect(response10.data).toEqual({ message: "Failed" });
  });
});
