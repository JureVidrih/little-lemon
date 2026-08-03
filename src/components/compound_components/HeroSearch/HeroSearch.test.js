import { render, userEvent } from '@testing-library/react-native';

import HeroSearch from './HeroSearch';

describe("HeroSearch component", () => {
    it("should render on the screen", async () => {
        const { getByTestId } = await render(<HeroSearch />);

        expect(getByTestId("herosearch-outer-container")).toBeOnTheScreen();
    });

    it("should have rendered correctly", async () => {
        const { toJSON } = await render(<HeroSearch />);

        expect(toJSON()).toMatchSnapshot();
    });

    it("should handle a user typing a search prompt properly", async () => {
        const user = userEvent.setup();
        let checkOnSearch = null;

        const { getByTestId } = await render(<HeroSearch searchAction={(newValue) => {
            checkOnSearch = newValue;
        }} />);

        await user.press(getByTestId("herosearch-show-button"));
        await user.type(getByTestId("input-text-input"), "abc");

        expect(checkOnSearch).toBe("abc");

        await user.press(getByTestId("herosearch-show-button"));
        await user.type(getByTestId("input-text-input"), "123");

        expect(checkOnSearch).toBe("abc");
    });
});