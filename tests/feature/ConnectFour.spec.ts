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
    it('Clicking on a column drops a piece', async () => {
        const wrapper: Wrapper<App> = mount(App);
        const firstColumn = wrapper.findComponent(BoardColumn);

        firstColumn.trigger('click');
        await wrapper.vm.$nextTick();

        expect(firstColumn.findAllComponents({ref: 'piece'})).toHaveLength(1);
    })

    it('starts with no pieces at the columns', () => {
        const wrapper: Wrapper<App> = mount(App);
        const column = wrapper.findComponent(BoardColumn);

        expect(column.findAllComponents({ref: 'piece'})).toHaveLength(0);
    })
});