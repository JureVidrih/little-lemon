import { render, screen, userEvent } from '@testing-library/react-native';

import BackButton from './BackButton.tsx';
import BackbuttonStyles from './BackButtonStyles.ts';

import { useAppTheme } from '../../../hooks/';

describe("BackButton component", () => {
    it("should have rendered correctly", async () => {
        const { getByTestId } = await render(<BackButton />);

        expect(getByTestId("touchableContainer")).toBeOnTheScreen();
    });

    it("should have rendered correctly with no props", async () => {
        const theme = useAppTheme();
        const { getByTestId } = await render(<BackButton />);

        expect(getByTestId("touchableContainer")).toHaveStyle({
            width: 32,
            height: 32,
            backgroundColor: theme.primary_1,
            borderRadius: 16, 
            borderColor: theme.primary_1,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        });
    });

    it("should respect mode prop", async () => {
        const theme = useAppTheme();
        const { getByTestId } = await render(<BackButton mode="header" />);

        expect(getByTestId("touchableContainer")).toHaveStyle({
            width: 40,
            height: 40,
            backgroundColor: theme.primary_1,
            borderRadius: 20, 
            borderColor: theme.primary_1,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        });
    });

    it("should respect onPress prop", async () => {
        const user = userEvent.setup();

        let checkOnPress = null;
        const { getByTestId } = await render(<BackButton onPress={() => { checkOnPress = true; }} />);

        await user.press(getByTestId("touchableContainer"));

        expect(checkOnPress).toBeTruthy();
    });
});