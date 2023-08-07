import LikeButton from "../../components/LikeButton.vue";
import { mount } from "@vue/test-utils";
import axios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";

describe("countLike true", () => {
  // MSWでサーバーのモック作成
  const AxiosServer = setupServer(
    rest.post(
      "http://localhost:3000/api/like/likeConfirmation",
      (req, res, ctx) => {
        return res(ctx.status(201), ctx.json([]));
      }
    ),
    rest.post("http://localhost:3000/api/like/insert", (req, res, ctx) => {
      return res(ctx.status(201), ctx.json({ message: "Success" }));
    })
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

    const wrapper = mount(LikeButton);

    const confirmationAxios = await axios.post(
      "http://localhost:3000/api/like/likeConfirmation",
      // "/api/like/likeConfirmation",
      { userId: userId, articleId: articleId }
    );
    wrapper.vm.confirmationAxios = confirmationAxios;

    await wrapper.vm.countLike();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.showLikeButton).toEqual(true);
  });
});

describe("countLike false", () => {
  // MSWでサーバーのモック作成
  const AxiosServer = setupServer(
    rest.post(
      "http://localhost:3000/api/like/likeConfirmation",
      (req, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.json([
            {
              articleId: 189,
              id: 408,
              userId: "445a6d2e-5cc3-47c6-b5fe-2c6179b229da",
            },
          ])
        );
      }
    ),
    rest.post("http://localhost:3000//api/like/delete", (req, res, ctx) => {
      return res(ctx.status(201), ctx.json({ message: "Success" }));
    })
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

  test("mount countLike false", async () => {
    const wrapper = mount(LikeButton);
    await wrapper.vm.countLike();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.showLikeButton).toEqual(false);
  });
});
