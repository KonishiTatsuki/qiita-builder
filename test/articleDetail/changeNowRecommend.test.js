import ChangeNowRecommend from "../../components/test/articlesDetail/ChangeNowRecommend.vue";
import { mount } from "@vue/test-utils";
import axios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";


// MSWでサーバーのモック作成
const tagIdsAxiosServer = setupServer(
  rest.post(
    "http://localhost:3000/api/recommend/articleGet",
    (req, res, ctx) => {
      return res(ctx.status(201), ctx.json());
    }
  ),
  rest.post(
    "http://localhost:3000/api/recommend/recommendConfirmation",
    (req, res, ctx) => {
      return res(ctx.status(201), ctx.json([]));
    }
  ),
  rest.post("http://localhost:3000/api/recommend/insert", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ message: "Success" }));
  }),
  rest.post("http://localhost:3000//api/recommend/delete", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ message: "Success" }));
  }),
  rest.post(
    "http://localhost:3000//api/recommend/articleIdGet",
    (req, res, ctx) => {
      return res(ctx.status(201), ctx.json([]));
    }
  )
);

beforeAll(() => {
  tagIdsAxiosServer.listen();
});
beforeEach(() => {
  jest.restoreAllMocks();
});
afterEach(() => {
  tagIdsAxiosServer.resetHandlers();
});
afterAll(() => {
  tagIdsAxiosServer.close();
});

const articleId = 188;

describe("recommendsFn", () => {
  test("mount recommendsFn", async () => {
    const wrapper = mount(ChangeNowRecommend);
    await wrapper.vm.recommendsFn();
    await wrapper.vm.$nextTick();

    const recommendsAxios = await axios.post(
      "http://localhost:3000/api/recommend/articleGet",
      articleId
    );

    wrapper.vm.nowRecommend = recommendsAxios.data.length;
    expect(wrapper.vm.nowRecommend).toEqual(0);
  });
});

describe("ChangeNowRecommend", () => {
  test("mount ChangeNowRecommend", async () => {
    const wrapper = mount(ChangeNowRecommend);

    const val = { nowRecommend: 1 };
    await wrapper.vm.ChangeNowRecommend(val);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.nowRecommend).toEqual(1);
  });
});
