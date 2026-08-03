import { render, userEvent } from '@testing-library/react-native';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

import Avatar from './Avatar.tsx';
import avatarStyles, { configurations } from './AvatarStyles.ts';

import { useAppTheme } from '../../../hooks/useAppTheme.tsx';

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

describe("Avatar component", () => {
    it("should have rendered correctly", async () => {
        const { getByTestId } = await render(<Avatar />);

        expect(getByTestId("avatar-pressable-container")).toBeOnTheScreen();
    });

    it("should have rendered correctly with no props + no AsyncStorage data", async () => {
        const theme = useAppTheme();

        const { getByTestId } = await render(<Avatar />);

        expect(getByTestId("avatar-pressable-container")).toHaveStyle({
            ...avatarStyles.container,
            ...configurations["normal"].container
        });

        expect(getByTestId("avatar-placeholder-view")).toHaveStyle({
            ...avatarStyles.placeholderView,
            borderColor: theme.gray
        });

        expect(getByTestId("avatar-text-container")).toHaveStyle({
            ...avatarStyles.placeholderLabel,
            ...configurations["normal"].label
        });
    });

    it("should respect the source prop", async () => {
        const { getByTestId, unmount } = await render(<Avatar source="testSource" />);

        expect(getByTestId("avatar-image")).toBeOnTheScreen();
    });

    it("should respect the mode prop", async () => {
        var { getByTestId } = await render(<Avatar mode="normal" />);

        expect(getByTestId("avatar-pressable-container")).toHaveStyle({
            ...configurations["normal"].container
        });

        expect(getByTestId("avatar-text-container")).toHaveStyle({
            ...configurations["normal"].label
        });

        var { getByTestId } = await render(<Avatar mode="header" />);

        expect(getByTestId("avatar-pressable-container")).toHaveStyle({
            ...configurations["header"].container
        });

        expect(getByTestId("avatar-text-container")).toHaveStyle({
            ...configurations["header"].label
        });
    });

    it("should work with saved initials", async () => {
        mockAsyncStorage.setItem("@little-lemon/profile/firstName", "First");
        mockAsyncStorage.setItem("@little-lemon/profile/lastName", "Last");
        const { getByTestId } = await render(<Avatar />);
        
        expect(getByTestId("avatar-text-container")).toHaveTextContent("FL");
    });

    it("should work with saved avatar uri", async () => {
        mockAsyncStorage.clear();
        mockAsyncStorage.setItem("@little-lemon/profile/avatarUri", "testURI");
        const { getByTestId, unmount } = await render(<Avatar />);

        expect(getByTestId("avatar-image")).toBeOnTheScreen();
    });

    it("should handle onPress event correctly", async () => {
        const user = userEvent.setup();

        let checkOnPress = null;

        var { getByTestId } = await render(<Avatar onPress={() => {
            checkOnPress = true;
        }} />);

        await user.press(getByTestId("avatar-pressable-container"));

        expect(checkOnPress).toBeTruthy();
    });
});