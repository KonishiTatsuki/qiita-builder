import { shallowMount } from '@vue/test-utils';
import ComponentName from '../pages/index'; // テスト対象のコンポーネントをインポート

describe('ComponentName', () => {
  it('goToFirstPage should reset currentPage to 1', () => {
    // コンポーネントをマウント
    const wrapper = shallowMount(ComponentName);

    // 初期のcurrentPageの値を設定
    wrapper.vm.currentPage = 3;

    // goToFirstPageメソッドを呼び出す
    wrapper.vm.goToFirstPage();

    // currentPageが1にリセットされたことを確認
    expect(wrapper.vm.currentPage).toBe(1);
  });
});
