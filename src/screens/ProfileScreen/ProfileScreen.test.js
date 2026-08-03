import { render, userEvent, screen, act } from '@testing-library/react-native';

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

import { useAvatarState, setFirstInitial, setLastInitial } from '../../hooks/useAvatarState.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { mask } from 'react-native-mask-text';

import ProfileScreen from './ProfileScreen.tsx';

jest.mock('react-native-safe-area-context', () => {
    return {
        useSafeAreaInsets: () => { return { top: 30, bottom: 40, left: 0, right: 0 }; }
    }
});

jest.mock('@react-navigation/native', () => {
    const useNavigation = {
        reset: jest.fn(() => {}),
        setOptions: jest.fn(() => {}),
        goBack: jest.fn(() => {})
    };

    return {
        useNavigation: () => { return useNavigation }
    };
});

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

describe("ProfileScreen screen component", () => {
    it("should render on the screen", async () => {
        AsyncStorage.setItem("@little-lemon/profile/firstName", "John");
        AsyncStorage.setItem("@little-lemon/profile/email", "john.doe@example.com");

        let { getByTestId } = await render(<ProfileScreen />);

        expect(getByTestId("profilescreen-outer-container")).toBeOnTheScreen();
    });

    it("should handle user discarding changes correctly", async () => {
        const user = userEvent.setup();

        let { queryByDisplayValue, getByDisplayValue, getAllByTestId } = await render(<ProfileScreen />);

        await user.type(getAllByTestId("input-text-input")[0], "123");
        await user.type(getAllByTestId("input-text-input")[1], "Doe");
        await user.type(getAllByTestId("input-text-input")[2], "abc");
        await user.type(getAllByTestId("input-text-input")[3], "1234567890");

        await user.press(getAllByTestId("button-outer-container")[3]);

        expect(getByDisplayValue("John")).toBeOnTheScreen();
        expect(queryByDisplayValue("Doe")).not.toBeOnTheScreen();
        expect(getByDisplayValue("john.doe@example.com")).toBeOnTheScreen();
        expect(queryByDisplayValue(mask("1234567890", "(999) 999-9999"))).not.toBeOnTheScreen();
    });

    it("should handle user saving changes correctly", async () => {
        const user = userEvent.setup();

        let { queryByDisplayValue, getByDisplayValue, getAllByTestId } = await render(<ProfileScreen />);

        await user.type(getAllByTestId("input-text-input")[0], "ny");
        await user.type(getAllByTestId("input-text-input")[1], "Doe1234");
        await user.type(getAllByTestId("input-text-input")[2], "p");
        await user.type(getAllByTestId("input-text-input")[3], "1234567890");

        await user.press(getAllByTestId("checkbox-outer-container")[0]);
        await user.press(getAllByTestId("checkbox-outer-container")[1]);
        await user.press(getAllByTestId("checkbox-outer-container")[2]);
        await user.press(getAllByTestId("checkbox-outer-container")[3]);

        await user.press(getAllByTestId("button-outer-container")[4]);

        expect(await AsyncStorage.getItem("@little-lemon/profile/firstName")).toBe("Johnny");
        expect(await AsyncStorage.getItem("@little-lemon/profile/lastName")).toBe("Doe1234");
        expect(await AsyncStorage.getItem("@little-lemon/profile/email")).toBe("john.doe@example.comp");
        expect(await AsyncStorage.getItem("@little-lemon/profile/phoneNumber")).toBe(mask("1234567890", "(999) 999-9999"));

        expect(useAvatarState.getState().firstInitial).toBe((await AsyncStorage.getItem("@little-lemon/profile/firstName"))[0]);
        expect(useAvatarState.getState().lastInitial).toBe((await AsyncStorage.getItem("@little-lemon/profile/lastName"))[0]);

        expect(await AsyncStorage.getItem("@little-lemon/profile/orderStatuses")).toBe("true");
        expect(await AsyncStorage.getItem("@little-lemon/profile/passwordChanges")).toBe("true");
        expect(await AsyncStorage.getItem("@little-lemon/profile/specialOffers")).toBe("true");
        expect(await AsyncStorage.getItem("@little-lemon/profile/newsletter")).toBe("true");
    });

    it("should handle user logging out correctly", async () => {
        const user = userEvent.setup();
        
        let navigation = useNavigation();

        let { getByTestId, getAllByTestId } = await render(<ProfileScreen />);

        await user.press(getAllByTestId("button-outer-container")[2]);

        let allKeys = await AsyncStorage.getAllKeys();
        allKeys = allKeys.filter((elem) => { return elem.startsWith("@little-lemon/")});

        expect(useAvatarState.getState().avatarUri).toBe(null);
        expect(useAvatarState.getState().firstInitial).toBe(null);
        expect(useAvatarState.getState().lastInitial).toBe(null);
        expect(allKeys.length).toBe(0);
        expect(navigation.reset).toHaveBeenCalled();
    });
});