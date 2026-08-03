import { render, userEvent } from '@testing-library/react-native';

import MenuCategories from './MenuCategories.tsx';

describe("MenuCategories component", () => {
    it("should have rendered on the screen", async () => {
        const { getByTestId } = await render(<MenuCategories />);

        expect(getByTestId("menucategories-outer-container")).toBeOnTheScreen();
    });

    it("should have rendered correctly", async () => {
        const { toJSON } = await render(<MenuCategories />);

        expect(toJSON()).toMatchSnapshot();
    });

    it("should handle selecting items correctly", async () => {
        const user = userEvent.setup();
        let checkSelectedItems = [];

        const { getAllByTestId } = await render(<MenuCategories onItemSelect={(selectedItems) => { checkSelectedItems = selectedItems; }} />);

        await user.press(getAllByTestId("togglebutton-outer-container")[0]);
        await user.press(getAllByTestId("togglebutton-outer-container")[1]);
        await user.press(getAllByTestId("togglebutton-outer-container")[2]);
        await user.press(getAllByTestId("togglebutton-outer-container")[3]);

        expect(checkSelectedItems).toEqual(["starters", "mains", "desserts", "drinks"])
    });
});