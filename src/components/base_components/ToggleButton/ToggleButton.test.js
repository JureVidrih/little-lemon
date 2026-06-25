import { render, userEvent } from '@testing-library/react-native';

import ToggleButton from './ToggleButton.tsx';
import styles from './ToggleButtonStyles.ts';

import { useAppTheme } from '../../../hooks/';

describe("ToggleButton component", () => {
    it("should have rendered correctly", async () => {
        const { getByTestId } = await render(<ToggleButton />);

        expect(getByTestId("pressableContainer")).toBeOnTheScreen();
        expect(getByTestId("animatedContainer")).toBeOnTheScreen();
        expect(getByTestId("buttonLabel")).toBeOnTheScreen();
    });

    it("should have rendered correctly with no props", async () => {
        const { getByTestId } = await render(<ToggleButton />);

        const theme = useAppTheme();

        expect(getByTestId("pressableContainer")).toHaveStyle({
            ...styles.pressableContainer
        });

        expect(getByTestId("animatedContainer")).toHaveStyle({
            ...styles.container,
            width: null,
            height: null,
            backgroundColor: theme["gray"],
            borderRadius: 0,
            borderColor: theme["gray"],
        });

        expect(getByTestId("buttonLabel")).toHaveStyle({
            color: theme.primary_1
        });
        expect(getByTestId("buttonLabel")).toHaveTextContent("Button");
    });

    it("should respect dynamicSize prop", async () => {
        const { getByTestId } = await render(<ToggleButton dynamicSize={true} fullParentWidth={false} fullParentHeight={false} />);

        expect(getByTestId("animatedContainer")).toHaveStyle({
            width: null,
            height: null
        });
    });

    it("should respect fullParentWidth and/or fullParentHeight props", async () => {
        const { getByTestId } = await render(<ToggleButton fullParentWidth={true} fullParentHeight={true} />);

        expect(getByTestId("animatedContainer")).toHaveStyle({
            width: '100%',
            height: '100%'
        });
    });

    it("should respect toggled prop", async () => {
        const theme = useAppTheme();

        var { getByTestId } = await render(<ToggleButton />);

        expect(getByTestId("animatedContainer")).toHaveStyle({
            backgroundColor: theme.gray,
            borderColor: theme.gray
        });

        expect(getByTestId("buttonLabel")).toHaveStyle({
            color: theme.primary_1
        });

        var { getByTestId } = await render(<ToggleButton toggled={false} />);

        expect(getByTestId("animatedContainer")).toHaveStyle({
            backgroundColor: theme.gray,
            borderColor: theme.gray
        });

        expect(getByTestId("buttonLabel")).toHaveStyle({
            color: theme.primary_1
        });

        var { getByTestId } = await render(<ToggleButton toggled={true} />);

        expect(getByTestId("animatedContainer")).toHaveStyle({
            backgroundColor: theme.primary_1,
            borderColor: theme.primary_1
        });

        expect(getByTestId("buttonLabel")).toHaveStyle({
            color: "rgba(255, 255, 255, 1)"
        });
    });

    it("should respect border radius props", async () => {
        const theme = useAppTheme();

        var { getByTestId } = await render(<ToggleButton />);

        expect(getByTestId("animatedContainer")).toHaveStyle({
            borderRadius: 0
        });

        var { getByTestId } = await render(<ToggleButton border_0={true} />);

        expect(getByTestId("animatedContainer")).toHaveStyle({
            borderRadius: 0
        });

        var { getByTestId } = await render(<ToggleButton border_8={true} />);

        expect(getByTestId("animatedContainer")).toHaveStyle({
            borderRadius: theme.border_radius_8
        });

        var { getByTestId } = await render(<ToggleButton border_16={true} />);

        expect(getByTestId("animatedContainer")).toHaveStyle({
            borderRadius: theme.border_radius_16
        });
    });

    it("should handle onPress event properly", async () => {
        const user = userEvent.setup();

        let onPressCheck = null;

        var { getByTestId } = await render(<ToggleButton toggled={false} onPress={(isToggled) => { onPressCheck = isToggled; }} />);
        await user.press(getByTestId("pressableContainer"));
        expect(onPressCheck).toBe(true);

        await user.press(getByTestId("pressableContainer"));
        expect(onPressCheck).toBe(false);
    });
});