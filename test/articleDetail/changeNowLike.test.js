import ChangeNowLike from "../../components/test/articlesDetail/ChangeNowLike.vue";
import { mount } from "@vue/test-utils";
import axios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";

const articleId = 188;

describe("tagFn", () => {
  // MSWでサーバーのモック作成
  const tagIdsAxiosServer = setupServer(
    rest.post("http://localhost:3000/api/tagging/get", (req, res, ctx) => {
      return res(ctx.status(201), ctx.json([]));
    }),
    rest.post("http://localhost:3000/api/tag/get", (req, res, ctx) => {
      return res(ctx.status(201), ctx.json([]));
    }),
    rest.post(
      "http://localhost:3000/api/article/articleDateGet",
      (req, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.json([
            {
              bannerId: null,
              body: "Vite\ndev環境としてはとにかく速い。\n",
              clubTagId: 9,
              date: "2023-07-30T08:59:45+00:00",
              delete: false,
              goalLike: "aaa",
              id: 188,
              occupationTagId: 1,
              publish: true,
              publishDate: "2023-07-13",
              qiitaPost: false,
              title: "Vue3を1ヶ月使い込んでみての所感",
              userId: "034ed2b9-13a0-48f5-bb1e-9ee4b888df77",
            },
          ])
        );
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

  test("mount tagFn", async () => {
    const wrapper = mount(ChangeNowLike);

    wrapper.vm.tagIdsAxios = await axios.post(
      "http://localhost:3000/api/tagging/get",
      articleId
    );
    wrapper.vm.tagsAxios = await axios.post(
      "http://localhost:3000/api/tag/get",
      wrapper.vm.tagIdsAxios.data
    );
    wrapper.vm.articleDatasAxios = await axios.post(
      "http://localhost:3000/api/article/articleDateGet",
      articleId
    );
    await wrapper.vm.tagFn();
    await wrapper.vm.$nextTick();
    // 成功メッセージが表示されることを確認
    expect(wrapper.vm.tagIdsAxios.data).toEqual([]);
    expect(wrapper.vm.tagsAxios.data).toEqual([]);
    expect(wrapper.vm.tagNames).toEqual([]);
    expect(wrapper.vm.articleDatasAxios.data).toEqual([
      {
        bannerId: null,
        body: "Vite\ndev環境としてはとにかく速い。\n",
        clubTagId: 9,
        date: "2023-07-30T08:59:45+00:00",
        delete: false,
        goalLike: "aaa",
        id: 188,
        occupationTagId: 1,
        publish: true,
        publishDate: "2023-07-13",
        qiitaPost: false,
        title: "Vue3を1ヶ月使い込んでみての所感",
        userId: "034ed2b9-13a0-48f5-bb1e-9ee4b888df77",
      },
    ]);
    expect(wrapper.vm.articleData).toEqual(
      wrapper.vm.articleDatasAxios.data[0]
    );
    expect(wrapper.vm.articleBody).toEqual(wrapper.vm.articleData.body);
    expect(wrapper.vm.articleTitle).toEqual(wrapper.vm.articleData.title);
    // expect(wrapper.vm.articleTag).toEqual(articleDatasAxios.data[0]);
    expect(wrapper.vm.articleQiitaPost).toEqual(
      wrapper.vm.articleData.qiitaPost
    );
    expect(wrapper.vm.articleDataGoalLike).toEqual(
      Number(wrapper.vm.articleData.goalLike)
    );
    expect(wrapper.vm.qiitaPostCheck).toEqual(wrapper.vm.articleData.qiitaPost);
  });
});

describe("ChangeNowLike true", () => {
  // MSWでサーバーのモック作成
  const tagIdsAxiosServer = setupServer(
    rest.post("http://localhost:3000/api/tagging/get", (req, res, ctx) => {
      return res(ctx.status(201), ctx.json([]));
    }),
    rest.post("http://localhost:3000/api/tag/get", (req, res, ctx) => {
      return res(ctx.status(201), ctx.json([]));
    }),
    rest.post(
      "http://localhost:3000/api/article/articleDateGet",
      (req, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.json([
            {
              bannerId: null,
              body: "Vite\ndev環境としてはとにかく速い。\n",
              clubTagId: 9,
              date: "2023-07-30T08:59:45+00:00",
              delete: false,
              goalLike: null,
              id: 188,
              occupationTagId: 1,
              publish: true,
              publishDate: "2023-07-13",
              qiitaPost: false,
              title: "Vue3を1ヶ月使い込んでみての所感",
              userId: "034ed2b9-13a0-48f5-bb1e-9ee4b888df77",
            },
          ])
        );
      }
    ),
    rest.post(
      "http://localhost:3000/api/article/qiitaPostUpdate",
      (req, res, ctx) => {
        return res(ctx.status(201), ctx.json({ message: "Success" }));
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

  test("mount ChangeNowLike true", async () => {
    const wrapper = mount(ChangeNowLike);
    const val = { nowLike: -1, goalLike: NaN };
    wrapper.vm.qiitaPostItemAxios = await axios.post(
      "http://localhost:3000/api/article/articleDateGet",
      // "/api/article/articleDateGet",
      articleId
    );
    await wrapper.vm.ChangeNowLike(val);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.goalLike).toEqual(null);
  });
});

// describe("ChangeNowLike false true", () => {
//   // MSWでサーバーのモック作成
//   const tagIdsAxiosServer = setupServer(
//     rest.post(
//       "http://localhost:3000/api/article/articleDateGet",
//       (req, res, ctx) => {
//         return res(
//           ctx.status(201),
//           ctx.json([
//             {
//               bannerId: null,
//               body: "Vite\ndev環境としてはとにかく速い。\n",
//               clubTagId: 9,
//               date: "2023-07-30T08:59:45+00:00",
//               delete: false,
//               goalLike: null,
//               id: 188,
//               occupationTagId: 1,
//               publish: true,
//               publishDate: "2023-07-13",
//               qiitaPost: false,
//               title: "Vue3を1ヶ月使い込んでみての所感",
//               userId: "034ed2b9-13a0-48f5-bb1e-9ee4b888df77",
//             },
//           ])
//         );
//       }
//     ),
//     rest.post(
//       "http://localhost:3000/api/article/qiitaPostUpdate",
//       (req, res, ctx) => {
//         return res(ctx.status(201), ctx.json({ message: "Success" }));
//       }
//     )
//   );

//   beforeAll(() => {
//     tagIdsAxiosServer.listen();
//   });
//   beforeEach(() => {
//     jest.restoreAllMocks();
//   });
//   afterEach(() => {
//     tagIdsAxiosServer.resetHandlers();
//   });
//   afterAll(() => {
//     tagIdsAxiosServer.close();
//   });

//   test("mount ChangeNowLike false true", async () => {
//     const wrapper = mount(ChangeNowLike);
//     const val = { nowLike: 1, goalLike: NaN };
//     const qiitaPostItemAxios = await axios.post(
//       "http://localhost:3000/api/article/articleDateGet",
//       // "/api/article/articleDateGet",
//       articleId
//     );
//     wrapper.vm.qiitaPostItemAxios = qiitaPostItemAxios;
//     wrapper.vm.articleDataGoalLike = 0;

//     await wrapper.vm.ChangeNowLike(val);
//     await wrapper.vm.$nextTick();

//     console.log("wrapper.vm.goalLikeSuccess", wrapper.vm.goalLikeSuccess);
//     // expect(wrapper.vm.goalLikeSuccess).toEqual("達成済み");
//   });
// });

describe("ChangeNowLike false false true", () => {
  // MSWでサーバーのモック作成
  const tagIdsAxiosServer = setupServer(
    rest.post("http://localhost:3000/api/tagging/get", (req, res, ctx) => {
      return res(ctx.status(201), ctx.json([]));
    }),
    rest.post("http://localhost:3000/api/tag/get", (req, res, ctx) => {
      return res(ctx.status(201), ctx.json([]));
    }),
    rest.post(
      "http://localhost:3000/api/article/articleDateGet",
      (req, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.json([
            {
              bannerId: null,
              body: "Vite\ndev環境としてはとにかく速い。\n",
              clubTagId: 9,
              date: "2023-07-30T08:59:45+00:00",
              delete: false,
              goalLike: "null",
              id: 188,
              occupationTagId: 1,
              publish: true,
              publishDate: "2023-07-13",
              qiitaPost: true,
              title: "Vue3を1ヶ月使い込んでみての所感",
              userId: "034ed2b9-13a0-48f5-bb1e-9ee4b888df77",
            },
          ])
        );
      }
    ),
    rest.post(
      "http://localhost:3000/api/article/qiitaPostUpdate",
      (req, res, ctx) => {
        return res(ctx.status(201), ctx.json({ message: "Success" }));
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

  test("mount ChangeNowLike false false true", async () => {
    const wrapper = mount(ChangeNowLike);
    const val = { nowLike: -1, goalLike: NaN };
    const qiitaPostItemAxios = await axios.post(
      "http://localhost:3000/api/article/articleDateGet",
      // "/api/article/articleDateGet",
      articleId
    );
    wrapper.vm.qiitaPostItemAxios = qiitaPostItemAxios;
    wrapper.vm.articleDataGoalLike = 2;

    await wrapper.vm.ChangeNowLike(val);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.goalLikeSuccess).toEqual("達成済み");
  });
});

describe("ChangeNowLike false false false", () => {
  // MSWでサーバーのモック作成
  const tagIdsAxiosServer = setupServer(
    rest.post("http://localhost:3000/api/tagging/get", (req, res, ctx) => {
      return res(ctx.status(201), ctx.json([]));
    }),
    rest.post("http://localhost:3000/api/tag/get", (req, res, ctx) => {
      return res(ctx.status(201), ctx.json([]));
    }),
    rest.post(
      "http://localhost:3000/api/article/articleDateGet",
      (req, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.json([
            {
              bannerId: null,
              body: "Vite\ndev環境としてはとにかく速い。\n",
              clubTagId: 9,
              date: "2023-07-30T08:59:45+00:00",
              delete: false,
              goalLike: "null",
              id: 188,
              occupationTagId: 1,
              publish: true,
              publishDate: "2023-07-13",
              qiitaPost: false,
              title: "Vue3を1ヶ月使い込んでみての所感",
              userId: "034ed2b9-13a0-48f5-bb1e-9ee4b888df77",
            },
          ])
        );
      }
    ),
    rest.post(
      "http://localhost:3000/api/article/qiitaPostUpdate",
      (req, res, ctx) => {
        return res(ctx.status(201), ctx.json({ message: "Success" }));
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

  test("mount ChangeNowLike false false false", async () => {
    const wrapper = mount(ChangeNowLike);
    const val = { nowLike: -1, goalLike: NaN };
    const qiitaPostItemAxios = await axios.post(
      "http://localhost:3000/api/article/articleDateGet",
      // "/api/article/articleDateGet",
      articleId
    );
    wrapper.vm.qiitaPostItemAxios = qiitaPostItemAxios;
    wrapper.vm.articleDataGoalLike = 2;

    await wrapper.vm.ChangeNowLike(val);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.goalLike).toEqual(
      wrapper.vm.articleDataGoalLike - wrapper.vm.nowLike
    );
  });
});
