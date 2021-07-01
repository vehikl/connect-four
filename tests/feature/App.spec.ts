import {mount, Wrapper} from "@vue/test-utils";
import App from "@/App.vue";
import GameRender from "@/components/GameRender.vue";

describe('Connect Four', () => {
    let wrapper: Wrapper<App>;
    beforeEach(async () => {
        wrapper = mount(App);
        await wrapper.vm.$nextTick();
    })

    describe('Before the Game Starts', () => {
        it('Does not render the game yet', () => {
            expect(wrapper.findComponent(GameRender).exists()).toBe(false);
        });
        it.todo('Renders the Start Menu');
    });

    it('Once the start button is pressed, it renders the game', async () => {
        wrapper.findComponent({ref: 'start-button'}).trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.findComponent(GameRender).exists()).toBe(true);
    });

    it('has two input boxes', () => {
        expect(wrapper.findComponent({ref: 'name1-box'}).exists()).toBe(true);
        expect(wrapper.findComponent({ref: 'name2-box'}).exists()).toBe(true);
    })
});