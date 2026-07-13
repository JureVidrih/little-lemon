import { render, userEvent } from '@testing-library/react-native';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { useAvatarState } from '../../../hooks/useAvatarState.tsx';

import InputAvatar from './InputAvatar.tsx';
import styles from './InputAvatarStyles.ts';

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
jest.mock("expo-image-picker", () => {
    return {
        requestMediaLibraryPermissionsAsync: jest.fn().mockResolvedValueOnce({ granted: false })
        .mockResolvedValue({ granted: true }),
        launchImageLibraryAsync: jest.fn()
        .mockResolvedValueOnce({ canceled: true, assets: [{ uri: null }] })
        .mockResolvedValueOnce({ canceled: false, assets: [{ uri: null }] })
        .mockResolvedValueOnce({ canceled: false, assets: [{ uri: "imageURI" }] })
    }
});

describe("InputAvatar component", () => {
    it("should have rendered correctly", async () => {
        const { getByTestId } = await render(<InputAvatar />);

        expect(getByTestId("outerContainer")).toBeOnTheScreen();
    });

    it("should have rendered correctly with no props", async () => {
        const { getByTestId, getAllByTestId, getByText } = await render(<InputAvatar />);

        expect(getByTestId("outerContainer")).toHaveStyle({
            ...styles.container
        });

        expect(getByTestId("innerContainer")).toHaveStyle({
            ...styles.innerContainer
        });

        expect(getByTestId("placeholderView")).toBeOnTheScreen();
        expect(getAllByTestId("buttonLabel").length).toEqual(2);

        expect(getByText("Avatar")).toBeOnTheScreen();
    });

    it("should respect the label prop", async () => {
        const { getByTestId, getAllByTestId, getByText } = await render(<InputAvatar label="testLabel" />);

        expect(getByText("testLabel")).toBeOnTheScreen();
    });

    it("should respect the placeholder prop", async () => {
        const { getByTestId, getAllByTestId, getByText } = await render(<InputAvatar placeholder="testSource" />);

        expect(getByTestId("avatarImage")).toBeOnTheScreen();
    });

    it("should respect the required prop", async () => {
        const { getByTestId, getAllByTestId, getByText } = await render(<InputAvatar required={true} />);

        expect(getByText("Avatar *")).toBeOnTheScreen();
    });

    it("should handle user setting a new avatar correctly", async () => {
        const user = userEvent.setup();

        let checkOnSelect;
        let onSelect = jest.fn((uri) => {
            checkOnSelect = uri;
        });

        const { getByTestId, getAllByTestId } = await render(<InputAvatar onSelect={onSelect} />);

        await user.press(getAllByTestId("touchableContainer")[0]);
        expect(onSelect).not.toHaveBeenCalled();

        await user.press(getAllByTestId("touchableContainer")[0]);
        expect(onSelect).not.toHaveBeenCalled();

        await user.press(getAllByTestId("touchableContainer")[0]);
        expect(onSelect).toHaveBeenCalled();
        expect(checkOnSelect).toEqual(null);
        expect(await mockAsyncStorage.getItem("@little-lemon/profile/avatarUri")).toEqual(null);
        expect(useAvatarState.getState().avatarUri).toEqual(null);
        
        await user.press(getAllByTestId("touchableContainer")[0]);
        expect(onSelect).toHaveBeenCalled();
        expect(checkOnSelect).toEqual("imageURI");
        expect(await mockAsyncStorage.getItem("@little-lemon/profile/avatarUri")).toEqual("imageURI");
        expect(useAvatarState.getState().avatarUri).toEqual("imageURI");
    });

    it("should handle user removing the avatar correctly", async () => {
        const user = userEvent.setup();

        let checkOnSelect;
        let onSelect = jest.fn((uri) => {
            checkOnSelect = uri;
        });

        var { getByTestId, getAllByTestId } = await render(<InputAvatar />);

        await user.press(getAllByTestId("touchableContainer")[1]);
        expect(onSelect).not.toHaveBeenCalled();
        expect(await mockAsyncStorage.getItem("@little-lemon/profile/avatarUri")).toEqual(null);
        expect(useAvatarState.getState().avatarUri).toEqual(null);

        var { getByTestId, getAllByTestId } = await render(<InputAvatar onSelect={onSelect} />);

        await user.press(getAllByTestId("touchableContainer")[1]);
        expect(onSelect).toHaveBeenCalled();
        expect(checkOnSelect).toEqual(null);
    });
});