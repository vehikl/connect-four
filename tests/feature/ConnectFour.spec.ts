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

        expect(firstColumn.findAllComponents({ref: 'red-piece'})).toHaveLength(1);
    })

    it('Each column can have up to 6 pieces', async () => {
        const firstColumn = wrapper.findComponent(BoardColumn);

        for (let i = 0; i < 50; i++) {
            firstColumn.trigger('click');
        }
        await wrapper.vm.$nextTick();
        const pieceCount = firstColumn.findAllComponents({ref: 'red-piece'}).length + firstColumn.findAllComponents({ref: 'yellow-piece'}).length
        expect(pieceCount).toBe(6);
    });

    it('starts with no pieces at the columns', () => {
        const column = wrapper.findComponent(BoardColumn);

        expect(column.findAllComponents({ref: 'red-piece'})).toHaveLength(0);
    })

    describe('the reset button', () => {
        it('resets the board by changing all pieces to grey when clicked', async () => {
            const columns = wrapper.findAllComponents(BoardColumn);

            columns.at(0).trigger('click');
            columns.at(1).trigger('click');
            columns.at(0).trigger('click');
            columns.at(1).trigger('click');
            columns.at(0).trigger('click');
            columns.at(1).trigger('click');
            columns.at(0).trigger('click');
            await wrapper.vm.$nextTick();

            expect(columns.at(0).findAllComponents({ref: 'red-piece'})).toHaveLength(4);

            const resetButton = wrapper.findComponent({ref: 'reset'});
            resetButton.trigger('click');
            await wrapper.vm.$nextTick();

            expect(wrapper.text()).not.toContain('You won!');

            const pieceCount = columns.at(0).findAllComponents({ref: 'red-piece'}).length + columns.at(1).findAllComponents({ref: 'yellow-piece'}).length
            expect(pieceCount).toBe(0);
        })

        it('only renders when the game is over', async () => {
            const finishTheGame = async () => {
                const columns = wrapper.findAllComponents(BoardColumn);

                columns.at(0).trigger('click');
                columns.at(1).trigger('click');
                columns.at(0).trigger('click');
                columns.at(1).trigger('click');
                columns.at(0).trigger('click');
                columns.at(1).trigger('click');
                columns.at(0).trigger('click');
                await wrapper.vm.$nextTick();
            }
            expect(wrapper.findComponent({ref: 'reset'}).exists()).toBe(false);
            await finishTheGame();
            expect(wrapper.findComponent({ref: 'reset'}).exists()).toBe(true);
        });
    });


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
            const winningColumn = wrapper.findAllComponents(BoardColumn).at(columnIndex);
            const nonWinningColumn = wrapper.findAllComponents(BoardColumn).at(columnIndex < 6 ? columnIndex + 1 : 0)

            for (let i = 0; i < 3; i++) {
                winningColumn.trigger('click');
                nonWinningColumn.trigger('click');
            }

            await wrapper.vm.$nextTick();

            expect(wrapper.text()).not.toContain('You won!');
            winningColumn.trigger('click');
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

        it('will end the game when four pieces are detected to each other diagonally', async () => {
            const columns = wrapper.findAllComponents(BoardColumn).wrappers.slice(0, 4);

            for (let i = 0; i < columns.length - 1; i++) {
                columns[i].trigger('click');
            }
            await wrapper.vm.$nextTick();
            for (let i = 1; i < columns.length - 1; i++) {
                columns[i].trigger('click');
            }
            await wrapper.vm.$nextTick();

            expect(wrapper.text()).not.toContain('You won!');

            columns[columns.length - 1].trigger('click');

            await wrapper.vm.$nextTick();
            expect(wrapper.text()).toContain('You won!');
        })
    });


    describe('Multiplayer Experience', () => {
        it('alternates the players turns', async () => {
            const firstColumn = wrapper.findComponent(BoardColumn);
            expect(firstColumn.findAllComponents({ref: 'red-piece'})).toHaveLength(0);
            expect(firstColumn.findAllComponents({ref: 'yellow-piece'})).toHaveLength(0);

            firstColumn.trigger('click');
            await wrapper.vm.$nextTick();
            expect(firstColumn.findAllComponents({ref: 'red-piece'})).toHaveLength(1);
            expect(firstColumn.findAllComponents({ref: 'yellow-piece'})).toHaveLength(0);

            firstColumn.trigger('click');
                await wrapper.vm.$nextTick();
                expect(firstColumn.findAllComponents({ref: 'red-piece'})).toHaveLength(1);
                expect(firstColumn.findAllComponents({ref: 'yellow-piece'})).toHaveLength(1);
            }
        );
    });
});