import {mount, Wrapper} from "@vue/test-utils";
import App from "@/App.vue";
import BoardColumn from "@/components/BoardColumn.vue";

describe('Connect Four', () => {
    it('Has a board', () => {
        const wrapper: Wrapper<App> = mount(App);

        expect(wrapper.findComponent({ref: 'game-board'}).exists()).toBe(true);
    });

    it('Has 7 columns on the board', () => {
        const wrapper: Wrapper<App> = mount(App);

        expect(wrapper.findAllComponents(BoardColumn)).toHaveLength(7);
    })


    it('has 6 pieces slots per column', () => {
        const wrapper: Wrapper<App> = mount(App);

        const columns = wrapper.findAllComponents(BoardColumn);

        columns.wrappers.forEach((column) => {
            expect(column.findAllComponents({ref: 'empty-slot'})).toHaveLength(6);
        });
    })

    it('Clicking on a column drops a piece', async () => {
        const wrapper: Wrapper<App> = mount(App);
        const firstColumn = wrapper.findComponent(BoardColumn);

        firstColumn.trigger('click');
        await wrapper.vm.$nextTick();

        expect(firstColumn.findAllComponents({ref: 'piece'})).toHaveLength(1);
    })

    it('Each column can have up to 6 pieces', async () => {
        const wrapper: Wrapper<App> = mount(App);
        const firstColumn = wrapper.findComponent(BoardColumn);

        for (let i = 0; i < 50; i++) {
            firstColumn.trigger('click');
        }
        await wrapper.vm.$nextTick();
        expect(firstColumn.findAllComponents({ref: 'piece'})).toHaveLength(6);
    });

    it('starts with no pieces at the columns', () => {
        const wrapper: Wrapper<App> = mount(App);
        const column = wrapper.findComponent(BoardColumn);

        expect(column.findAllComponents({ref: 'piece'})).toHaveLength(0);
    })

    describe('game ending scenarios', function () {

        it('ends as soon as four pieces are vertically stacked', async () => {
            const wrapper: Wrapper<App> = mount(App);
            const firstColumn = wrapper.findComponent(BoardColumn);

            for (let i = 0; i < 3; i++) {
                firstColumn.trigger('click');
            }

            await wrapper.vm.$nextTick();

            expect(wrapper.text()).not.toContain('You won!');
            firstColumn.trigger('click');
            await wrapper.vm.$nextTick();
            expect(wrapper.text()).toContain('You won!');
        });
    });
});