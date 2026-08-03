import { render, screen, userEvent } from '@testing-library/react-native';

import Button from './Button.tsx';
import buttonStyles from './ButtonStyles.ts';

import { useAppTheme } from '../../../hooks/';

describe("Button component", () => {
    it("should have rendered correctly", async () => {
        const { getByTestId } = await render(<Button />);

        expect(getByTestId("button-outer-container")).toBeOnTheScreen();
        expect(getByTestId("button-label")).toBeOnTheScreen();
    });

    it("should have rendered correctly with no props", async () => {
        const { getByTestId } = await render(<Button />);

        const theme = useAppTheme();

        expect(getByTestId("button-outer-container")).toBeEnabled();
        expect(getByTestId("button-outer-container")).toHaveStyle({
            ...buttonStyles.container,
            width: null,
            height: null,
            backgroundColor: theme["primary_1"],
            borderRadius: 0,
            borderColor: theme["primary_1"],
        });

        expect(getByTestId("button-label")).toHaveStyle({
            color: "#ffffff"
        });
        expect(getByTestId("button-label")).toHaveTextContent("Button");
    });

    it("should respect dynamicSize prop", async () => {
        const { getByTestId } = await render(<Button dynamicSize={true} fullParentWidth={false} fullParentHeight={false} />);

        expect(getByTestId("button-outer-container")).toHaveStyle({
            width: null,
            height: null
        });
    });

    it("should respect fullParentWidth and/or fullParentHeight props", async () => {
        const { getByTestId } = await render(<Button fullParentWidth={true} fullParentHeight={true} />);

        expect(getByTestId("button-outer-container")).toHaveStyle({
            width: '100%',
            height: '100%'
        });
    });

    it("should respect disabled prop", async () => {
        const { getByTestId } = await render(<Button disabled={true} />);

        const theme = useAppTheme();

        expect(getByTestId("button-outer-container")).not.toBeEnabled();

        expect(getByTestId("button-outer-container")).toHaveStyle({
            backgroundColor: theme.gray,
            borderColor: theme.gray
        });
    });

    it("should respect border radius props", async () => {
        const theme = useAppTheme();

        var { getByTestId } = await render(<Button />);

        expect(getByTestId("button-outer-container")).toHaveStyle({
            borderRadius: 0
        });

        var { getByTestId } = await render(<Button border_0={true} />);

        expect(getByTestId("button-outer-container")).toHaveStyle({
            borderRadius: 0
        });

        var { getByTestId } = await render(<Button border_8={true} />);

        expect(getByTestId("button-outer-container")).toHaveStyle({
            borderRadius: theme.border_radius_8
        });

        var { getByTestId } = await render(<Button border_16={true} />);

        expect(getByTestId("button-outer-container")).toHaveStyle({
            borderRadius: theme.border_radius_16
        });
    });

    it("should respect color prop", async () => {
        const theme = useAppTheme();

        var { getByTestId } = await render(<Button color="white" />);

        expect(getByTestId("button-outer-container")).toHaveStyle({
            borderColor: theme.primary_1
        });

        var { getByTestId } = await render(<Button color="primary_2" />);

        expect(getByTestId("button-label")).toHaveStyle({
            color: "#000000"
        });

        var { getByTestId } = await render(<Button color="secondary_1" />);

        expect(getByTestId("button-label")).toHaveStyle({
            color: "#ffffff"
        });

        var { getByTestId } = await render(<Button color="secondary_2" />);

        expect(getByTestId("button-label")).toHaveStyle({
            color: theme.primary_1
        });

        var { getByTestId } = await render(<Button color="secondary_3" />);

        expect(getByTestId("button-label")).toHaveStyle({
            color: theme.primary_1
        });

        var { getByTestId } = await render(<Button color="secondary_4" />);

        expect(getByTestId("button-label")).toHaveStyle({
            color: "#ffffff"
        });

        var { getByTestId } = await render(<Button color="white" />);

        expect(getByTestId("button-label")).toHaveStyle({
            color: theme.primary_1
        });
    });

    it("should handle onPress event properly", async () => {
        const user = userEvent.setup();

        let onPressCheck = null;

        var { getByTestId } = await render(<Button disabled={false} onPress={() => { onPressCheck = true; }} />);
        await user.press(getByTestId("button-outer-container"));
        expect(onPressCheck).toBe(true);

        onPressCheck = null;

        var { getByTestId } = await render(<Button disabled={true} onPress={() => { onPressCheck = true; }} />);
        await user.press(getByTestId("button-outer-container"));
        expect(onPressCheck).toBe(null);
    });
});