import { render, userEvent } from '@testing-library/react-native';

import ToggleButton from './ToggleButton.tsx';
import styles from './ToggleButtonStyles.ts';

import { useAppTheme } from '../../../hooks/';

describe("ToggleButton component", () => {
    it("should have rendered correctly", async () => {
        const { getByTestId } = await render(<ToggleButton />);

        expect(getByTestId("togglebutton-outer-container")).toBeOnTheScreen();
        expect(getByTestId("togglebutton-animated-container")).toBeOnTheScreen();
        expect(getByTestId("togglebutton-button-label")).toBeOnTheScreen();
    });

    it("should have rendered correctly with no props", async () => {
        const { getByTestId } = await render(<ToggleButton />);

        const theme = useAppTheme();

        expect(getByTestId("togglebutton-outer-container")).toHaveStyle({
            ...styles.pressableContainer
        });

        expect(getByTestId("togglebutton-animated-container")).toHaveStyle({
            ...styles.container,
            width: null,
            height: null,
            backgroundColor: theme["gray"],
            borderRadius: 0,
            borderColor: theme["gray"],
        });

        expect(getByTestId("togglebutton-button-label")).toHaveStyle({
            color: theme.primary_1
        });
        expect(getByTestId("togglebutton-button-label")).toHaveTextContent("Button");
    });

    it("should respect dynamicSize prop", async () => {
        const { getByTestId } = await render(<ToggleButton dynamicSize={true} fullParentWidth={false} fullParentHeight={false} />);

        expect(getByTestId("togglebutton-animated-container")).toHaveStyle({
            width: null,
            height: null
        });
    });

    it("should respect fullParentWidth and/or fullParentHeight props", async () => {
        const { getByTestId } = await render(<ToggleButton fullParentWidth={true} fullParentHeight={true} />);

        expect(getByTestId("togglebutton-animated-container")).toHaveStyle({
            width: '100%',
            height: '100%'
        });
    });

    it("should respect toggled prop", async () => {
        const theme = useAppTheme();

        var { getByTestId } = await render(<ToggleButton />);

        expect(getByTestId("togglebutton-animated-container")).toHaveStyle({
            backgroundColor: theme.gray,
            borderColor: theme.gray
        });

        expect(getByTestId("togglebutton-button-label")).toHaveStyle({
            color: theme.primary_1
        });

        var { getByTestId } = await render(<ToggleButton toggled={false} />);

        expect(getByTestId("togglebutton-animated-container")).toHaveStyle({
            backgroundColor: theme.gray,
            borderColor: theme.gray
        });

        expect(getByTestId("togglebutton-button-label")).toHaveStyle({
            color: theme.primary_1
        });

        var { getByTestId } = await render(<ToggleButton toggled={true} />);

        expect(getByTestId("togglebutton-animated-container")).toHaveStyle({
            backgroundColor: theme.primary_1,
            borderColor: theme.primary_1
        });

        expect(getByTestId("togglebutton-button-label")).toHaveStyle({
            color: "rgba(255, 255, 255, 1)"
        });
    });

    it("should respect border radius props", async () => {
        const theme = useAppTheme();

        var { getByTestId } = await render(<ToggleButton />);

        expect(getByTestId("togglebutton-animated-container")).toHaveStyle({
            borderRadius: 0
        });

        var { getByTestId } = await render(<ToggleButton border_0={true} />);

        expect(getByTestId("togglebutton-animated-container")).toHaveStyle({
            borderRadius: 0
        });

        var { getByTestId } = await render(<ToggleButton border_8={true} />);

        expect(getByTestId("togglebutton-animated-container")).toHaveStyle({
            borderRadius: theme.border_radius_8
        });

        var { getByTestId } = await render(<ToggleButton border_16={true} />);

        expect(getByTestId("togglebutton-animated-container")).toHaveStyle({
            borderRadius: theme.border_radius_16
        });
    });

    it("should handle onPress event properly", async () => {
        const user = userEvent.setup();

        let onPressCheck = null;

        var { getByTestId } = await render(<ToggleButton toggled={false} onPress={(isToggled) => { onPressCheck = isToggled; }} />);
        await user.press(getByTestId("togglebutton-outer-container"));
        expect(onPressCheck).toBe(true);

        await user.press(getByTestId("togglebutton-outer-container"));
        expect(onPressCheck).toBe(false);
    });
});