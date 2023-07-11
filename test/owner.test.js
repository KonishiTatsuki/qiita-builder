import submitOwner from "../components/ownerPage/SubmitOwner.vue"; // テスト対象のページ
import { mount } from "@vue/test-utils";

describe("ownerPage", () => {
  test("should make a POST request to the correct endpoint", async () => {
    const wrapper = mount(submitOwner);
    // console.log(wrapper.html());
    expect(wrapper.text()).toContain("管理者権限");
    // モックサーバーからの応答を確認したい
    // マイページに遷移できているか確認したい
  });
  // test("should make a POST request to the correct endpoint", async () => {
  //   const wrapper = mount(Handler);
  //   console.log(wrapper.html());
  //   expect(wrapper.html()).toBe("管理者画面");
  //   // モックサーバーからの応答を確認したい
  //   // マイページに遷移できているか確認したい
  // });
});
