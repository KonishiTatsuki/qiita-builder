import RecommendButton from "../../components/RecommendButton.vue";
import { mount } from "@vue/test-utils";
import axios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";

describe("countRecommend true", () => {
  // MSWでサーバーのモック作成
  const AxiosServer = setupServer(
    rest.post(
      "http://localhost:3000/api/recommend/recommendConfirmation",
      (req, res, ctx) => {
        return res(ctx.status(201), ctx.json([]));
      }
    )
  );

  beforeAll(() => {
    AxiosServer.listen();
  });
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  afterEach(() => {
    AxiosServer.resetHandlers();
  });
  afterAll(() => {
    AxiosServer.close();
  });

  test("mount countLike true", async () => {
    const wrapper = mount(RecommendButton);
    await wrapper.vm.countRecommend();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showRecommendButton).toEqual(true);
  });
});

describe("countLike false", () => {
  // MSWでサーバーのモック作成
  const AxiosServer = setupServer(
    rest.post(
      "http://localhost:3000/api/recommend/recommendConfirmation",
      (req, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.json([
            {
              articleId: 189,
              id: 103,
              userId: "445a6d2e-5cc3-47c6-b5fe-2c6179b229da",
            },
          ])
        );
      }
    )
  );

  beforeAll(() => {
    AxiosServer.listen();
  });
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  afterEach(() => {
    AxiosServer.resetHandlers();
  });
  afterAll(() => {
    AxiosServer.close();
  });

  test("mount countRecommend false", async () => {
    const wrapper = mount(RecommendButton);
    await wrapper.vm.countRecommend();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.showRecommendButton).toEqual(false);
  });
});
