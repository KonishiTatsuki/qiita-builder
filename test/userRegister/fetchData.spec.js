import { mount } from "@vue/test-utils";
import userRegister from "../pages/userRegister.vue";
import axios from "axios";

jest.mock("axios");

describe("userRegister", () => {
  it("fetchData method should fetch club and occupation data", async () => {
    // モックの作成
    const mockClubResponse = { data: [{ message: "Success1" }] };
    const mockOccupationResponse = { data: [{ message: "Success2" }] };

    axios.get.mockResolvedValueOnce(mockClubResponse); // axios.get("/api/club/get") のモックを設定
    axios.get.mockResolvedValueOnce(mockOccupationResponse); // axios.get("/api/occupation/get") のモックを設定

    const wrapper = mount(userRegister);
    await wrapper.vm.$nextTick();

    // fetchData メソッドを実行
    await wrapper.vm.fetchData(); ;
    await wrapper.vm.$nextTick();

    // axios.get が2回呼ばれたことを確認
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith("/api/club/get");
    expect(axios.get).toHaveBeenCalledWith("/api/occupation/get");

    // fetchData メソッド内で club と occupation のデータが正しくセットされたことを確認
    expect(wrapper.vm.club).toEqual(mockClubResponse.data);
    expect(wrapper.vm.occupation).toEqual(mockOccupationResponse.data);
  });
});
