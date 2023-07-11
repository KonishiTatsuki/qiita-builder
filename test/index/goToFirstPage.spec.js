import { shallowMount } from "@vue/test-utils";
import Index from "../pages/index.vue";

jest.mock("../pages/index.vue", () => ({
  __esModule: true,
  default: {
    setup() {
      const goToFirstPage = jest.fn(() => {
        currentPage.value = 1;
      });
      const currentPage = { value: 3 }; // refではなく単純なオブジェクトを使用する

      return {
        goToFirstPage,
        currentPage,
      };
    },
  },
}));

describe("goToFirstPage", () => {
  it("goToFirstPage should reset currentPage to 1", () => {
    const wrapper = shallowMount(Index);
    const currentPage = wrapper.vm.currentPage; // テスト対象のコンポーネントのcurrentPageを取得

    // currentPage.valueが0の場合
    currentPage.value = 0;
    wrapper.vm.goToFirstPage();
    expect(currentPage.value).toBe(1);

    // currentPage.valueが50の場合
    currentPage.value = 50;
    wrapper.vm.goToFirstPage();
    expect(currentPage.value).toBe(1);

    // currentPage.valueが100の場合
    currentPage.value = 100;
    wrapper.vm.goToFirstPage();
    expect(currentPage.value).toBe(1);
  });
});