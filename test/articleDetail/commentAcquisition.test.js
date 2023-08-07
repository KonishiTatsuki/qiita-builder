import CommentAcquisition from "../../components/articlesDetail/CommentAcquisition.vue";
import { mount } from "@vue/test-utils";
import axios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";

const articleId = 188;

describe("commentAcquisition true true", () => {
  // MSWでサーバーのモック作成
  const AxiosServer = setupServer(
    rest.post("http://localhost:3000/api/comment/get", (req, res, ctx) => {
      return res(
        ctx.status(201),
        ctx.json([
          {
            articleId: 188,
            comment: "ファイト！\n",
            date: "2023-07-31T00:00:00+00:00",
            id: 133,
            userId: "445a6d2e-5cc3-47c6-b5fe-2c6179b229da",
          },
        ])
      );
    }),
    rest.post(
      "http://localhost:3000/api/user/commentUserGet",
      (req, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.json([
            { articleId: 188 },
            { articleId: 188 },
            { articleId: 188 },
            { articleId: 188 },
            { articleId: 188 },
            { articleId: 188 },
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

  test("mount commentAcquisition true ", async () => {
    const wrapper = mount(CommentAcquisition);
    await wrapper.vm.commentAcquisition();
    await wrapper.vm.$nextTick();

    const commentDatesAxios = await axios.post(
      "http://localhost:3000/api/comment/get",
      articleId
    );

    const commentItemAxios = await axios.post(
      "http://localhost:3000/api/user/commentUserGet",
      commentDatesAxios.data
    );

    expect(wrapper.vm.commentDateOrigin).toEqual([
      { articleId: 188 },
      { articleId: 188 },
      { articleId: 188 },
      { articleId: 188 },
      { articleId: 188 },
      { articleId: 188 },
    ]);
    expect(wrapper.vm.commentDate).toEqual(commentItemAxios.data.slice(0, 5));
    expect(wrapper.vm.showMoreComment).toEqual(true);
    expect(wrapper.vm.showCloseComment).toEqual(false);
  });
});

describe("commentAcquisition true false", () => {
  // MSWでサーバーのモック作成
  const AxiosServer = setupServer(
    rest.post("http://localhost:3000/api/comment/get", (req, res, ctx) => {
      return res(
        ctx.status(201),
        ctx.json([
          {
            articleId: 188,
            comment: "ファイト！\n",
            date: "2023-07-31T00:00:00+00:00",
            id: 133,
            userId: "445a6d2e-5cc3-47c6-b5fe-2c6179b229da",
          },
        ])
      );
    }),
    rest.post(
      "http://localhost:3000/api/user/commentUserGet",
      (req, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.json([
            { articleId: 188 },
            { articleId: 188 },
            { articleId: 188 },
            { articleId: 188 },
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

  test("mount commentAcquisition true ", async () => {
    const wrapper = mount(CommentAcquisition);
    await wrapper.vm.commentAcquisition();
    await wrapper.vm.$nextTick();

    const commentDatesAxios = await axios.post(
      "http://localhost:3000/api/comment/get",
      articleId
    );

    const commentItemAxios = await axios.post(
      "http://localhost:3000/api/user/commentUserGet",
      commentDatesAxios.data
    );

    expect(wrapper.vm.commentDateOrigin).toEqual([
      { articleId: 188 },
      { articleId: 188 },
      { articleId: 188 },
      { articleId: 188 },
    ]);
    expect(wrapper.vm.commentDate).toEqual(commentItemAxios.data);
    expect(wrapper.vm.showMoreComment).toEqual(false);
    expect(wrapper.vm.showCloseComment).toEqual(false);
  });
});

describe("commentAcquisition true false", () => {
  // MSWでサーバーのモック作成
  const AxiosServer = setupServer(
    rest.post("http://localhost:3000/api/comment/get", (req, res, ctx) => {
      return res(
        ctx.status(201),
        ctx.json([
          {
            articleId: 188,
            comment: "ファイト！\n",
            date: "2023-07-31T00:00:00+00:00",
            id: 133,
            userId: "445a6d2e-5cc3-47c6-b5fe-2c6179b229da",
          },
        ])
      );
    }),
    rest.post(
      "http://localhost:3000/api/user/commentUserGet",
      (req, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.json([
            { articleId: 188 },
            { articleId: 188 },
            { articleId: 188 },
            { articleId: 188 },
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

  test("mount commentAcquisition true ", async () => {
    const wrapper = mount(CommentAcquisition);
    await wrapper.vm.commentAcquisition();
    await wrapper.vm.$nextTick();

    const commentDatesAxios = await axios.post(
      "http://localhost:3000/api/comment/get",
      articleId
    );

    const commentItemAxios = await axios.post(
      "http://localhost:3000/api/user/commentUserGet",
      commentDatesAxios.data
    );

    expect(wrapper.vm.commentDateOrigin).toEqual([
      { articleId: 188 },
      { articleId: 188 },
      { articleId: 188 },
      { articleId: 188 },
    ]);
    expect(wrapper.vm.commentDate).toEqual(commentItemAxios.data);
    expect(wrapper.vm.showMoreComment).toEqual(false);
    expect(wrapper.vm.showCloseComment).toEqual(false);
  });
});

describe("showMoreCommentClick", () => {
  test("mount showMoreCommentClick", async () => {
    const wrapper = mount(CommentAcquisition);

    wrapper.vm.commentDateOrigin = [
      { articleId: 188 },
      { articleId: 188 },
      { articleId: 188 },
      { articleId: 188 },
    ];

    await wrapper.vm.showMoreCommentClick();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.showMoreComment).toEqual(false);
    expect(wrapper.vm.showCloseComment).toEqual(true);
    expect(wrapper.vm.commentDate).toEqual([
      { articleId: 188 },
      { articleId: 188 },
      { articleId: 188 },
      { articleId: 188 },
    ]);
  });
});

describe("showCommentClick", () => {
  test("mount showCommentClick", async () => {
    const wrapper = mount(CommentAcquisition);

    wrapper.vm.commentDateOrigin = [
      { articleId: 188 },
      { articleId: 188 },
      { articleId: 188 },
      { articleId: 188 },
      { articleId: 188 },
      { articleId: 188 },
    ];

    await wrapper.vm.showCommentClick();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.showMoreComment).toEqual(true);
    expect(wrapper.vm.showCloseComment).toEqual(false);
    expect(wrapper.vm.commentDate).toEqual(
      wrapper.vm.commentDateOrigin.slice(0, 5)
    );
  });
});

describe("deleteComment", () => {
  test("mount deleteComment", async () => {
    const wrapper = mount(CommentAcquisition);

    await wrapper.vm.deleteComment();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.open).toEqual(false);
  });
});
