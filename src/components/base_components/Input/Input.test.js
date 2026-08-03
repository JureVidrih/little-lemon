import { screen, render, userEvent } from '@testing-library/react-native';

import Input from './Input.tsx';

import { useAppTheme } from '../../../hooks/useAppTheme.tsx';

import styles from './InputStyles.ts';
import txtStyles from '../Txt/TextStyles.ts';

describe("Input component", () => {
    it("should have rendered correctly", async () => {
        const { getByTestId } = await render(<Input />);

        expect(getByTestId("input-outer-container")).toBeOnTheScreen();
    });

    it("should have rendered correctly with no props", async () => {
        const theme = useAppTheme();

        const { getByTestId } = await render(<Input />);

        expect(getByTestId("input-outer-container")).toHaveStyle({
            ...styles.container
        });

        expect(getByTestId("input-text-input")).toHaveStyle({
            ...styles.inputContainer,
            ...{ borderColor: theme.gray, color: theme.primary_1 }
        });

        expect(getByTestId("text-container")).toHaveStyle({
            ...txtStyles.pregular,
            ...styles.invalidValueLabel
        });
    });

    it("should respect inputContainerStyle prop", async () => {
        const theme = useAppTheme();

        let testedStyle = {
            backgroundColor: '#ff0000'
        }

        const { getByTestId } = await render(<Input inputContainerStyle={testedStyle} />);

        expect(getByTestId("input-text-input")).toHaveStyle({
            ...styles.inputContainer,
            ...{ borderColor: theme.gray, color: theme.primary_1 },
            ...testedStyle
        });
    });

    it("should respect label prop", async () => {
        const theme = useAppTheme();

        var { getByTestId } = await render(<Input 
        label="Test label"
        hideInvalidLabel={true} />);

        expect(getByTestId("text-container")).toHaveStyle({
            ...txtStyles.pregular,
            ...styles.label,
            ...{ color: theme.primary_1 }
        });

        expect(getByTestId("text-container")).toHaveTextContent("Test label");

        var { getByTestId } = await render(<Input 
        label="Test label"
        required={true}
        hideInvalidLabel={true} />);

        expect(getByTestId("text-container")).toHaveTextContent("Test label *");
    });

    it("should respect value prop", async () => {
        var { getByTestId, rerender } = await render(<Input value="Value 1" />);

        expect(screen.getByDisplayValue("Value 1")).toBeOnTheScreen();

        await rerender(<Input value="Value 2" />);

        expect(screen.getByDisplayValue("Value 2")).toBeOnTheScreen();
    });

    it("should respect placeholder prop", async () => {
        var { getByTestId, rerender } = await render(<Input value="My test" placeholder="Placeholder" />);

        expect(screen.getByPlaceholderText("Placeholder")).toBeOnTheScreen();

        await rerender(<Input placeholder="Placeholder 2" />);

        expect(screen.getByPlaceholderText("Placeholder 2")).toBeOnTheScreen();
    });

    it("should respect required, invalidValueLabel and hideInvalidLabel props", async () => {
        const user = userEvent.setup();

        var { getByTestId, queryAllByTestId, rerender } = await render(<Input />);

        await rerender(<Input 
        required={true} 
        validate={(toValidate) => { return toValidate.length > 3; }}
        value="New value"
        />);

        expect(getByTestId("text-container")).not.toHaveTextContent("Specified value is invalid.");

        await rerender(<Input 
        required={true} 
        validate={(toValidate) => { return toValidate.length > 3; }}
        value={null}
        invalidValueLabel="Test invalid value label"
        />);

        expect(getByTestId("text-container")).toHaveTextContent("Test invalid value label");

        await user.type(getByTestId("input-text-input"), "Some value");

        expect(getByTestId("text-container")).not.toHaveTextContent("Specified value is invalid.");

        await rerender(<Input 
        required={true} 
        validate={(toValidate) => { return toValidate.length > 3; }}
        value={null}
        invalidValueLabel="Invalid label"
        hideInvalidLabel={true} />);

        await user.clear(getByTestId("input-text-input"));

        expect(queryAllByTestId("text-container").length).toEqual(0);
    });

    it("should respect validateInitially prop", async () => {
        const user = userEvent.setup();

        var { getByTestId } = await render(<Input 
        required={true} 
        validate={(toValidate) => { return toValidate.length > 3; }}
        value="ABC"
        validateInitially={true}
        />);

        expect(getByTestId("text-container")).toHaveTextContent("Specified value is invalid.");

        var { getByTestId } = await render(<Input 
        required={true} 
        validate={(toValidate) => { return toValidate.length > 3; }}
        value="ABC"
        validateInitially={false}
        />);

        expect(getByTestId("text-container")).not.toHaveTextContent("Specified value is invalid.");

        var { getByTestId } = await render(<Input 
        required={false} 
        validate={(toValidate) => { return toValidate.length > 3; }}
        value="ABC"
        validateInitially={false}
        />);

        expect(getByTestId("text-container")).not.toHaveTextContent("Specified value is invalid.");
    });


    it("should handle user typing in text correctly", async () => {
        const user = userEvent.setup();

        let checkOnChangeText = null;

        const { getByTestId } = await render(<Input onChangeText={(newText) => { checkOnChangeText = newText; }} />);

        await user.type(getByTestId("input-text-input"), "Test text.");

        expect(checkOnChangeText).toEqual("Test text.");
    });

    it("should handle input validation correctly", async () => {
        const user = userEvent.setup();

        const { getByTestId } = await render(<Input required={true} validate={(valueToValidate) => { return valueToValidate.startsWith("Test "); }} />);

        await user.type(getByTestId("input-text-input"), "A test text.");

        expect(getByTestId("text-container")).toHaveTextContent("Specified value is invalid.");

        await user.clear(getByTestId("input-text-input"));
        await user.type(getByTestId("input-text-input"), "Test text.");

        expect(getByTestId("text-container")).not.toHaveTextContent("Specified value is invalid.");
    });
});