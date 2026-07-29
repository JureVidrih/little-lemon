import { render, userEvent } from '@testing-library/react-native';

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

import { useNavigation } from '@react-navigation/native';

import OnboardingScreen from './OnboardingScreen.tsx';

jest.mock('react-native-safe-area-context', () => {
    return {
        useSafeAreaInsets: () => { return { top: 30, bottom: 40, left: 0, right: 0 }; }
    }
});

jest.mock('@react-navigation/native', () => {
    const useNavigation = {
        reset: jest.fn(() => {})
    };

    return {
        useNavigation: () => { return useNavigation }
    };
});

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

describe("OnboardingScreen screen component", () => {
    it("should render on the screen", async () => {
        let { getByTestId } = await render(<OnboardingScreen />);

        expect(getByTestId("onboardingScreenOuterContainer")).toBeOnTheScreen();
    });

    it("should handle navigation and form action correctly", async () => {
        const user = userEvent.setup();
        let { getByTestId, getAllByTestId } = await render(<OnboardingScreen />);

        let navigation = useNavigation();

        expect(getByTestId("buttonOuterContainer")).not.toBeEnabled();

        await user.press(getByTestId("buttonOuterContainer"));   

        expect(navigation.reset).not.toHaveBeenCalled();

        await user.type(getAllByTestId("textInput")[0], "John");
        await user.type(getAllByTestId("textInput")[1], "john.doe@example.com");

        await user.press(getByTestId("buttonOuterContainer"));  

        expect(getByTestId("buttonOuterContainer")).toBeEnabled();
        expect(navigation.reset).toHaveBeenCalled();

        await user.type(getAllByTestId("textInput")[0], "123");
        expect(getByTestId("buttonOuterContainer")).not.toBeEnabled();

        await user.clear(getAllByTestId("textInput")[0]);
        expect(getByTestId("buttonOuterContainer")).not.toBeEnabled();

        await user.type(getAllByTestId("textInput")[0], "John");

        await user.clear(getAllByTestId("textInput")[1]);
        expect(getByTestId("buttonOuterContainer")).not.toBeEnabled();


        await user.type(getAllByTestId("textInput")[1], "john.doe");
        expect(getByTestId("buttonOuterContainer")).not.toBeEnabled();

        await user.type(getAllByTestId("textInput")[1], "@");
        expect(getByTestId("buttonOuterContainer")).not.toBeEnabled();

        await user.type(getAllByTestId("textInput")[1], "example");
        expect(getByTestId("buttonOuterContainer")).not.toBeEnabled();

        await user.type(getAllByTestId("textInput")[1], ".com");
        expect(getByTestId("buttonOuterContainer")).toBeEnabled();
    });
});