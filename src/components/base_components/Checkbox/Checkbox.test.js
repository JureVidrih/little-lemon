import { render, userEvent } from '@testing-library/react-native';

import Checkbox from './Checkbox.tsx';
import checkboxStyles from './CheckboxStyles.ts';

import { useAppTheme } from '../../../hooks/useAppTheme.tsx';
import textStyles from '../Txt/TextStyles.ts';

describe("Checkbox component", () => {
    it("should have rendered correctly", async () => {
        const { getByTestId } = await render(<Checkbox label="Label" />);

        expect(getByTestId("checkboxOuterContainer")).toBeOnTheScreen();
    });

    it("should have rendered correctly with no props", async () => {
        const theme = useAppTheme();

        const { getByTestId } = await render(<Checkbox label="Label" />);

        expect(getByTestId("checkboxOuterContainer")).toHaveStyle({
            ...checkboxStyles.container
        });

        expect(getByTestId("viewContainer")).toHaveStyle({
            ...checkboxStyles.checkboxContainer,
            borderColor: theme.primary_1,
            backgroundColor: theme.primary_1
        });

        expect(getByTestId("animationContainer")).toHaveStyle({
            opacity: 0
        });

        expect(getByTestId("textContainer")).toHaveStyle({
            ...checkboxStyles.label,
            ...textStyles["pregular"]
        });

        expect(getByTestId("textContainer")).toHaveTextContent("Label");
    });

    it("should respect checked prop", async () => {
        const theme = useAppTheme();

        var { getByTestId } = await render(<Checkbox checked={true} label="Label" />);

        expect(getByTestId("animationContainer")).toHaveStyle({
            opacity: 1
        });

        var { getByTestId } = await render(<Checkbox checked={false} label="Label" />);

        expect(getByTestId("animationContainer")).toHaveStyle({
            opacity: 0
        });
    });

    it("should handle onPress event properly", async () => {
        const user = userEvent.setup({
            delay: 100
        });

        let checkOnSelect = null;

        var { getByTestId } = await render(<Checkbox onSelect={(checked) => {
            checkOnSelect = checked;
        }} label="Label" />);

        await user.press(getByTestId("checkboxOuterContainer"));
        expect(checkOnSelect).toBeTruthy();

        await user.press(getByTestId("checkboxOuterContainer"));
        expect(checkOnSelect).not.toBeTruthy();
    });
});