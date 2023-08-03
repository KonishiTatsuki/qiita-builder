import registerAdvent from "../../components/ownerPage/registerAdvent.vue"; // テスト対象のページ
import { mount } from "@vue/test-utils";
import axios from "axios";

describe("アドベントカレンダーを変更するテスト", () => {
  test("ページが初期の状態でマウントされているか確認", async () => {
    const wrapper = mount(registerAdvent);
    expect(wrapper.text()).toContain("バナー表示：");

    expect(wrapper.vm.showAdvent).toBe(1);
    expect(wrapper.vm.choseAdvent).toBe(1);
  });

  test("表示するバナーを変更した時、値を変える", async () => {
    const wrapper = mount(registerAdvent);

    const newValue = wrapper.find("#displayValue");
    await newValue.setValue("3");
    await wrapper.find(".btn").trigger("click");

    const mockResponse = { data: { message: "Success" } };
    jest.spyOn(axios, "post").mockResolvedValue(mockResponse);
    const response = await axios.post("/api/advent/chooseAdvent", {
      newAdventValue: "3",
    });

    // 成功メッセージが表示されることを確認
    expect(response.data).toEqual({ message: "Success" });
  });
});
