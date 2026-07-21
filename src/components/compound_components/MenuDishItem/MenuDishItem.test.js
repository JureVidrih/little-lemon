import { render, userEvent } from '@testing-library/react-native';

import MenuDishItem from './MenuDishItem';

describe("MenuDishItem component", () => {
    it("should have rendered on the screen", async () => {
        const { getByTestId } = await render(<MenuDishItem />);

        expect(getByTestId("outerContainer")).toBeOnTheScreen();
    });

    it("should have rendered correctly", async () => {
        const { toJSON } = await render(<MenuDishItem name="Dummy name" label="Dummy label" price={1.99} imageSource="greekSalad.jpg" />);

        expect(toJSON()).toMatchSnapshot();
    })
});