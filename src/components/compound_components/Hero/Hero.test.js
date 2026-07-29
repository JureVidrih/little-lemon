import { render, userEvent } from '@testing-library/react-native';

import Hero from './Hero';

describe("Hero component", () => {
    it("should render on the screen", async () => {
        const { getByTestId } = await render(<Hero />);

        expect(getByTestId("heroOuterContainer")).toBeOnTheScreen();
    });

    it("should have rendered correctly", async () => {
        const { toJSON } = await render(<Hero searchAction={() => {}} />);

        expect(toJSON()).toMatchSnapshot();
    });

    it("should handle a user typing a search prompt properly", async () => {
        const user = userEvent.setup();
        let checkOnSearch = null;

        const { getByTestId } = await render(<Hero searchAction={(newValue) => {
            checkOnSearch = newValue;
        }} />);

        await user.press(getByTestId("showButton"));
        await user.type(getByTestId("textInput"), "abc");

        expect(checkOnSearch).toBe("abc");

        await user.press(getByTestId("showButton"));
        await user.type(getByTestId("textInput"), "123");

        expect(checkOnSearch).toBe("abc");
    });
});