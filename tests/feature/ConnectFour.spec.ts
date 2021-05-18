import {mount, Wrapper} from "@vue/test-utils";
import App from "@/App.vue";

describe('Connect Four', () => {
    it('Has a board', () => {
        const wrapper: Wrapper<App> = mount(App);

        expect(wrapper.findComponent({ref: 'game-board'}).exists()).toBe(true);
    });
});