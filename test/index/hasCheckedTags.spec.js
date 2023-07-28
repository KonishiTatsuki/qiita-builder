import { mount } from '@vue/test-utils';
import Index from "../../pages/index.vue";

jest.mock("@supabase/supabase-js", () => {
    const mockoccupationName = jest.fn().mockResolvedValue({
        data: [
          {
            checked:false,
            count: 30,
            id: 8,
            occupationName: "内勤"
          },
          {
            checked:false,
            count: 18,
            id: 4,
            occupationName: "CL"
          },
          {
            checked:false,
            count: 14,
            id: 1,
            occupationName: "FR"
          }
        ]
    });  

  const mockOrder1 = jest.fn().mockResolvedValue({
    data: [
      {
        count: 29,
        display: true,
        id: 8,
        name: "Kotolin"
      },
      {
        count: 14,
        display: true,
        id: 3,
        name: "JavaScript"
      },
      {
        count: 12,
        display: true,
        id: 4,
        name: "React",
      }
    ]
  });

  const mockOrder2 = jest.fn().mockResolvedValue({
    data: [
      {
        body: "テスト",
        clubTagId: 10,
        date: "2023-06-22T10:57:56+00:00",
        id: 181,
        delete: false,
        occupationTagId: 1,
        title: "FRエンジニア",
        userId: "44544c87-e8d9-4157-955d-a589a160501d"
      },
      {
        body: "hgfhdg",
        clubTagId: 9,
        date: "2023-06-22T09:37:13+00:00",
        id: 179,
        delete: false,
        occupationTagId: 2,
        title: "hgfhdg",
        userId: "d72cd59b-69cc-4deb-ae19-3e56561c45b6"
      },
      {
        body: "reactより分かりやすい\nreactより分かりやすい\n\treactより分かりやすい",
        clubTagId: 12,
        date: "2023-06-22T09:35:48+00:00",
        id: 178,
        delete: true,
        occupationTagId: 3,
        title: "vueの好きなところ",
        userId: "8fed9ead-52ce-4299-b1aa-159c1ad99395"
      }
    ]
  });

  const mockUsers = jest.fn().mockResolvedValue({
    data: [
      {
        id: "44544c87-e8d9-4157-955d-a589a160501d",
        username: "user1",
        image: "user1.jpg",
      },
      {
        id: "d72cd59b-69cc-4deb-ae19-3e56561c45b6",
        username: "user2",
        image: "user2.jpg",
      },
      {
        id: "8fed9ead-52ce-4299-b1aa-159c1ad99395",
        username: "user3",
        image: "user3.jpg",
      },
    ],
  });

  const mockLikes = jest.fn().mockResolvedValue({
    data: [
      {
        articleId: 97,
        id: 111,
        userId: "034ed2b9-13a0-48f5-bb1e-9ee4b888df77"
      },
      {
        articleId: 41,
        id: 122,
        userId: "44544c87-e8d9-4157-955d-a589a160501d"
      },
      {
        articleId: 111,
        id: 124,
        userId: "abab3b69-9021-4ec9-828d-1f93a066704c"
      }
    ],
  });

  return {
    createClient: jest.fn(() => ({
      auth: {
        onAuthStateChange: jest.fn().mockImplementation((callback) => {
          callback('SIGNED_IN', { user: { id: 'testId' } });
        }),
      },
      channel: jest.fn().mockReturnValue({
        on: jest.fn().mockReturnThis(),
        subscribe: jest.fn(),
      }),
      from: jest.fn().mockImplementation((tableName) => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      lte: jest.fn().mockReturnThis(),
      order: jest.fn().mockImplementation((arg) => {
        if (tableName === 'occupation') {
            return mockoccupationName();
        } else if (arg === 'count') {
            return mockOrder1();
        } else if (arg === 'date') {
            return mockOrder2();
        }
      }),
      in: jest.fn().mockImplementation(() => {
          return mockUsers();
      }),
      then: jest.fn().mockImplementation((callback) => {
        if (tableName === 'like') {
          return {
            select: jest.fn().mockReturnThis(),
            order: mockLikes,
          }
        }
      }),
    })),
    })),
  };
});

describe('hasCheckedTags関数のテスト', () => {
    const $config = {
        public: {
          supabase: {
            url: "http://test-url/auth/v1",
            key: "test-key",
          },
        },
    };
  
    const wrapper = mount(Index, {
        global: {
          plugins: [
            {
              install: (app) => {
                app.config.globalProperties.$config = $config;
              },
            },
          ],
        },
    });

    it('computes hasCheckedTags correctly when no tags are checked', () => {
        expect(wrapper.vm.hasCheckedTags).toBe(false);
    });

    it('computes hasCheckedTags correctly when some tags are checked', () => {
        wrapper.vm.tagName.forEach((tag)=>{
            tag.checked = true
        })
        expect(wrapper.vm.hasCheckedTags).toBe(true);
    });

    it('computes hasCheckedTags correctly when all tags are checked', () => {
        wrapper.vm.tagName[0].checked = false;
        expect(wrapper.vm.hasCheckedTags).toBe(true);
    });
});
