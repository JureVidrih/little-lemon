import { render } from '@testing-library/react-native';

import Header from './Header.tsx';

import headerStyles, { fontSizes } from './HeaderStyles.ts';

describe("Header component", () => {
    it("should have rendered correctly", async () => {
        const { getByTestId } = await render(<Header />);

        expect(getByTestId("header-view-container")).toBeOnTheScreen();
    });

    it("should have rendered correctly with no props", async () => {
        const { getByTestId } = await render(<Header />);

        expect(getByTestId("header-view-container")).toHaveStyle({
            ...headerStyles.container
        });

        expect(getByTestId("text-container")).toHaveStyle({
            ...headerStyles.headerText,
            fontSize: fontSizes[1],
            textAlign: "left"
        });
    });

    it("should have at least one available header size to choose from", async () => {
        expect(Object.keys(fontSizes).length > 0).toBeTruthy();
    });

    it("should respect sizeType prop and align prop", async () => {
        const { getByTestId } = await render(<Header align="right" sizeType={Object.keys(fontSizes)[0]} />);

        expect(getByTestId("text-container")).toHaveStyle({
            fontSize: fontSizes[Object.keys(fontSizes)[0]],
            textAlign: "right"
        });
    });
});