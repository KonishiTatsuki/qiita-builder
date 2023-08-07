import Submit from "../../components/articlesDetail/Submit.vue";
import { mount } from "@vue/test-utils";
import axios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";

// MSWでサーバーのモック作成
const AxiosServer = setupServer(
  rest.post("/api/comment/insert", (req, res, ctx) => {
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

describe("submit", () => {
  test("mount submit true ", async () => {
    const wrapper = mount(Submit);

    wrapper.vm.comment = "ああああ";
    await wrapper.vm.submit();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.errorText).toEqual(false);
    expect(wrapper.vm.comment).toEqual("");
  });
  test("mount submit true false", async () => {
    const wrapper = mount(Submit);

    wrapper.vm.comment = "";
    await wrapper.vm.submit();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.errorText).toEqual(true);
  });
});
