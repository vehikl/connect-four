import {mount, Wrapper} from "@vue/test-utils";
import App from "@/App.vue";

describe('Connect Four', () => {
    it('Starts with no pieces on the board', () => {
        const wrapper: Wrapper<App> = mount(App);

        expect(wrapper.vm).toBeDefined();
    });
});