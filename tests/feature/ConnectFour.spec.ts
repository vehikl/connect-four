import {mount, Wrapper} from "@vue/test-utils";
import App from "@/App.vue";
import BoardColumn from "@/components/BoardColumn.vue";

describe('Connect Four', () => {
    let wrapper: Wrapper<App>;
    beforeEach(async () => {
        wrapper = mount(App);
        await wrapper.vm.$nextTick();
    })
    it('Has a board', () => {
        expect(wrapper.findComponent({ref: 'game-board'}).exists()).toBe(true);
    });

    it('Has 7 columns on the board', () => {
        expect(wrapper.findAllComponents(BoardColumn)).toHaveLength(7);
    })


    it('has 6 pieces slots per column', () => {
        const columns = wrapper.findAllComponents(BoardColumn);

        columns.wrappers.forEach((column) => {
            expect(column.findAllComponents({ref: 'empty-slot'})).toHaveLength(6);
        });
    })

    it('Clicking on a column drops a piece', async () => {
        const firstColumn = wrapper.findComponent(BoardColumn);

        firstColumn.trigger('click');
        await wrapper.vm.$nextTick();

        expect(firstColumn.findAllComponents({ref: 'piece'})).toHaveLength(1);
    })

    it('Each column can have up to 6 pieces', async () => {
        const firstColumn = wrapper.findComponent(BoardColumn);

        for (let i = 0; i < 50; i++) {
            firstColumn.trigger('click');
        }
        await wrapper.vm.$nextTick();
        expect(firstColumn.findAllComponents({ref: 'piece'})).toHaveLength(6);
    });

    it('starts with no pieces at the columns', () => {
        const column = wrapper.findComponent(BoardColumn);

        expect(column.findAllComponents({ref: 'piece'})).toHaveLength(0);
    })

    describe('game ending scenarios', function () {

        it.each([
            [0],
            [1],
            [2],
            [3],
            [4],
            [5],
            [6]
        ])("ends as soon as four pieces are vertically stacked in column %d", async (columnIndex) => {
            const secondColumn = wrapper.findAllComponents(BoardColumn).at(columnIndex);

            for (let i = 0; i < 3; i++) {
                secondColumn.trigger('click');
            }

            await wrapper.vm.$nextTick();

            expect(wrapper.text()).not.toContain('You won!');
            secondColumn.trigger('click');
            await wrapper.vm.$nextTick();
            expect(wrapper.text()).toContain('You won!');
        });

        it('will end the game when four pieces are detected next to each other horizontally', async () => {
            const columns = wrapper.findAllComponents(BoardColumn).wrappers.slice(0, 4);

            for (let i = 0; i < columns.length - 1; i++) {
                columns[i].trigger('click');
            }
            await wrapper.vm.$nextTick();
            expect(wrapper.text()).not.toContain('You won!');

            columns[columns.length - 1].trigger('click');

            await wrapper.vm.$nextTick();
            expect(wrapper.text()).toContain('You won!');
        });
    });
});