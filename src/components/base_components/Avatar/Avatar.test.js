import { render, userEvent } from '@testing-library/react-native';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

import Avatar from './Avatar.tsx';
import avatarStyles, { configurations } from './AvatarStyles.ts';

import { useAppTheme } from '../../../hooks/useAppTheme.tsx';

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

describe("Avatar component", () => {
    it("should have rendered correctly", async () => {
        const { getByTestId } = await render(<Avatar />);

        expect(getByTestId("pressableContainer")).toBeOnTheScreen();
    });

    it("should have rendered correctly with no props + no AsyncStorage data", async () => {
        const theme = useAppTheme();

        const { getByTestId } = await render(<Avatar />);

        expect(getByTestId("pressableContainer")).toHaveStyle({
            ...avatarStyles.container,
            ...configurations["normal"].container
        });

        expect(getByTestId("placeholderView")).toHaveStyle({
            ...avatarStyles.placeholderView,
            borderColor: theme.gray
        });

        expect(getByTestId("textContainer")).toHaveStyle({
            ...avatarStyles.placeholderLabel,
            ...configurations["normal"].label
        });
    });

    it("should respect the source prop", async () => {
        const { getByTestId, unmount } = await render(<Avatar source="testSource" />);

        expect(getByTestId("avatarImage")).toBeOnTheScreen();
    });

    it("should respect the mode prop", async () => {
        var { getByTestId } = await render(<Avatar mode="normal" />);

        expect(getByTestId("pressableContainer")).toHaveStyle({
            ...configurations["normal"].container
        });

        expect(getByTestId("textContainer")).toHaveStyle({
            ...configurations["normal"].label
        });

        var { getByTestId } = await render(<Avatar mode="header" />);

        expect(getByTestId("pressableContainer")).toHaveStyle({
            ...configurations["header"].container
        });

        expect(getByTestId("textContainer")).toHaveStyle({
            ...configurations["header"].label
        });
    });

    it("should work with saved initials", async () => {
        mockAsyncStorage.setItem("@little-lemon/profile/firstName", "First");
        mockAsyncStorage.setItem("@little-lemon/profile/lastName", "Last");
        const { getByTestId } = await render(<Avatar />);

        console.log(getByTestId("textContainer").props.children);
        expect(getByTestId("textContainer")).toHaveTextContent("FL");
    });

    it("should work with saved avatar uri", async () => {
        mockAsyncStorage.clear();
        mockAsyncStorage.setItem("@little-lemon/profile/avatarUri", "testURI");
        const { getByTestId, unmount } = await render(<Avatar />);

        expect(getByTestId("avatarImage")).toBeOnTheScreen();
    });

    it("should handle onPress event correctly", async () => {
        const user = userEvent.setup();

        let checkOnPress = null;

        var { getByTestId } = await render(<Avatar onPress={() => {
            checkOnPress = true;
        }} />);

        await user.press(getByTestId("pressableContainer"));

        expect(checkOnPress).toBeTruthy();
    });
});