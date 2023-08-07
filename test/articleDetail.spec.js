import { mount } from "@vue/test-utils";
import articleDetail from "../pages/articleDetail/[id].vue";
import axios from "axios";

// vue-routerのmock
const mockPush = jest.fn();
jest.mock("vue-router", () => ({
  useRouter: () => {
    return {
      push: mockPush,
    };
  },
}));

// describe("userDataAxios", () => {
//   it("userDataAxios", async () => {
//     const userDataMockResponse = {
//       data: [
//         {
//           authority: false,
//           clubid: 4,
//           detail: "ああああああ",
//           email: "tatsuki.konishi@rakus-partners.co.jp",
//           id: "445a6d2e-5cc3-47c6-b5fe-2c6179b229da",
//           image: null,
//           occupation: 1,
//           qiitaToken: "ffa319a5eaea2154d350499ae077946f5b1f9d85",
//           username: "小西",
//         },
//       ],
//     };

//     const articleDatasMockResponse = {
//       data: [
//         {
//           bannerId: null,
//           body: "Vite\ndev環境としてはとにかく速い。\n",
//           clubTagId: 9,
//           date: "2023-07-30T08:59:45+00:00",
//           delete: false,
//           goalLike: "null",
//           id: 188,
//           occupationTagId: 1,
//           publish: true,
//           publishDate: "2023-07-13",
//           qiitaPost: false,
//           title: "Vue3を1ヶ月使い込んでみての所感",
//           userId: "034ed2b9-13a0-48f5-bb1e-9ee4b888df77",
//         },
//       ],
//     };

//     const articleUserMockResponse = {
//       data: [
//         {
//           authority: false,
//           clubid: 9,
//           detail: "OKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKO",
//           email: "shuhei.hayakawa@rakus-partners.co.jp",
//           id: "034ed2b9-13a0-48f5-bb1e-9ee4b888df77",
//           image:
//             "https://niezwnppucjwhxwfaxyr.supabase.co/storage/v1/object/public/avatars/034ed2b9-13a0-48f5-bb1e-9ee4b888df77otl24esq2tg",
//           occupation: 1,
//           qiitaToken: "8ebc21ed81be0de43a7c53a2c399759091c14cef",
//           username: "ゲストA",
//         },
//       ],
//     };

//     const tagIdsMockResponse = {
//       data: [{ tagId: 28 }, { tagId: 5 }],
//     };

//     const tagsMockResponse = {
//       data: ["フロントエンド", "Vue"],
//     };

//     const recommendsMockResponse = {
//       data: [
//         {
//           articleId: 188,
//           id: 75,
//           userId: "445a6d2e-5cc3-47c6-b5fe-2c6179b229da",
//         },
//       ],
//     };

//     const recommendUsersMockResponse = {
//       data: [
//         {
//           articleId: 188,
//           id: 75,
//           userId: "445a6d2e-5cc3-47c6-b5fe-2c6179b229da",
//         },
//       ],
//     };

//     axios.post.mockResolvedValueOnce(userDataMockResponse);
//     axios.post.mockResolvedValueOnce(articleDatasMockResponse);
//     axios.post.mockResolvedValueOnce(articleUserMockResponse);
//     axios.post.mockResolvedValueOnce(tagIdsMockResponse);
//     axios.post.mockResolvedValueOnce(tagsMockResponse);
//     axios.post.mockResolvedValueOnce(recommendsMockResponse);
//     axios.post.mockResolvedValueOnce(recommendUsersMockResponse);

//     const wrapper = mount(articleDetail);
//     await wrapper.vm.$nextTick();

//     // axios.get が7回呼ばれたことを確認
//     expect(axios.post).toHaveBeenCalledTimes(0);
//     // expect(axios.post).toHaveBeenCalledWith("/api/club/get");
//     // expect(axios.post).toHaveBeenCalledWith("/api/occupation/get");
//   });
// });

//おすすめボタン
// describe("ChangeNowRecommend", () => {
//   it("ChangeNowRecommend", async () => {
//     const wrapper = mount(articleDetail);
//     await wrapper.vm.$nextTick();

//     await wrapper.vm.ChangeNowRecommend();
//     console.log(wrapper.vm.nowRecommend);
//   });
// });

//いいねボタン
// describe("ChangeNowLike", () => {
//   it("ChangeNowLike", async () => {
//     const wrapper = mount(articleDetail);
//     await wrapper.vm.$nextTick();

//     await wrapper.vm.ChangeNowLike();
//     console.log(wrapper.vm.nowRecommend);
//   });
// });

//投稿済みコメント取得
// describe("commentAcquisition", () => {
//   it("commentAcquisition", async () => {
//     const commentDatesMockResponse = {
//       data: [
//         {
//           articleId: 188,
//           comment: "ファイト！\n",
//           date: "2023-07-31T00:00:00+00:00",
//           id: 133,
//           userId: "445a6d2e-5cc3-47c6-b5fe-2c6179b229da",
//         },
//       ],
//     };

//     const commentItemMockResponse = {
//       data: [
//         {
//           articleId: 188,
//           comment: "ファイト！\n",
//           date: "2023-07-31T00:00:00+00:00",
//           id: 133,
//           userId: "445a6d2e-5cc3-47c6-b5fe-2c6179b229da",
//           username: "小西",
//         },
//       ],
//     };

//     axios.post.mockResolvedValueOnce(commentDatesMockResponse);
//     axios.post.mockResolvedValueOnce(commentItemMockResponse);

//     const wrapper = mount(articleDetail);
//     await wrapper.vm.$nextTick();
//     await wrapper.vm.commentAcquisition();
//     console.log(wrapper.vm.nowRecommend);
//   });
// });

// jest.mock("axios", () => ({
//   default: {
//     get: jest.fn().mockResolvedValueOnce({}),
//     post: jest
//       .fn()
//       .mockResolvedValueOnce({
//         data: [
//           {
//             bannerId: null,
//             body: "Vite\ndev環境としてはとにかく速い。\n",
//             clubTagId: 9,
//             date: "2023-07-30T08:59:45+00:00",
//             delete: false,
//             goalLike: "null",
//             id: 188,
//             occupationTagId: 1,
//             publish: true,
//             publishDate: "2023-07-13",
//             qiitaPost: false,
//             title: "Vue3を1ヶ月使い込んでみての所感",
//             userId: "034ed2b9-13a0-48f5-bb1e-9ee4b888df77",
//           },
//         ],
//       })

//       .mockResolvedValueOnce({
//         data: [
//           {
//             authority: false,
//             clubid: 9,
//             detail: "OKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKO",
//             email: "shuhei.hayakawa@rakus-partners.co.jp",
//             id: "034ed2b9-13a0-48f5-bb1e-9ee4b888df77",
//             image:
//               "https://niezwnppucjwhxwfaxyr.supabase.co/storage/v1/object/public/avatars/034ed2b9-13a0-48f5-bb1e-9ee4b888df77otl24esq2tg",
//             occupation: 1,
//             qiitaToken: "8ebc21ed81be0de43a7c53a2c399759091c14cef",
//             username: "ゲストA",
//           },
//         ],
//       }),
//   },
// }));

describe("articleDetail", () => {
  it("articleDetail", async () => {
    const wrapper = mount(articleDetail);
    await wrapper.vm.$nextTick();

    // fetchData メソッドを実行
    await wrapper.vm.aaa();

    expect(wrapper.vm.item).toBe("いいいい");
  });
});
