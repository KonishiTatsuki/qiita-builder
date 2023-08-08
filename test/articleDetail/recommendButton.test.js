import RecommendButton from "../../components/test/articlesDetail/RecommendButton.vue";
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
    ),
    rest.post("http://localhost:3000/api/recommend/insert", (req, res, ctx) => {
      return res(ctx.status(201), ctx.json({ message: "Success" }));
    }),
    rest.post(
      "http://localhost:3000//api/recommend/articleIdGet",
      (req, res, ctx) => {
        return res(ctx.status(201), ctx.json({ message: "Success" }));
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
    const userId = "445a6d2e-5cc3-47c6-b5fe-2c6179b229da";
    const articleId = 189;

    const wrapper = mount(RecommendButton);

    const confirmationAxios = await axios.post(
      "http://localhost:3000/api/recommend/recommendConfirmation",
      // "/api/like/likeConfirmation",
      { userId: userId, articleId: articleId }
    );
    wrapper.vm.confirmationAxios = confirmationAxios;

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
    ),
    rest.post(
      "http://localhost:3000//api/recommend/delete",
      (req, res, ctx) => {
        return res(ctx.status(201), ctx.json({ message: "Success" }));
      }
    ),
    rest.post(
      "http://localhost:3000//api/recommend/articleIdGet",
      (req, res, ctx) => {
        return res(ctx.status(201), ctx.json({ message: "Success" }));
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
