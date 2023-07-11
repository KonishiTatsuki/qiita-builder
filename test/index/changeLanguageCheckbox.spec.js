import { mount } from "@vue/test-utils";
import Index from "../../pages/index.vue";

describe("Index", () => {
  it("changeLanguageCheckbox should update tagName.value correctly", () => {
    // テスト用のデータを準備する
    const wrapper = mount(Index);
    const tagName = wrapper.vm.tagName;

    // changeLanguageCheckboxメソッドを呼び出す
    wrapper.vm.changeLanguageCheckbox("exampleTag");

    // tagName.valueが正しく更新されたかどうかを確認する
    expect(tagName).toEqual(["exampleTag"]); // 更新後のtagName.valueを確認する
  });
});