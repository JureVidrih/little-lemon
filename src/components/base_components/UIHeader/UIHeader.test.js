import { render } from '@testing-library/react-native';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

import UIHeader from './UIHeader.tsx';
import UIHeaderStyles from './UIHeaderStyles.ts';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

describe("UIHeader component", () => {
    it("should have rendered correctly", async () => {
        const { getByTestId } = await render((<UIHeader />));

        expect(getByTestId("uiheader-outer-container")).toBeOnTheScreen();
        expect(getByTestId("uiheader-logo-image")).toBeOnTheScreen();
    });

    it("should have rendered correctly with no props", async () => {
        const { getByTestId } = await render((<UIHeader />));

        expect(getByTestId("uiheader-outer-container")).toHaveStyle({
            ...UIHeaderStyles.container
        });

        expect(getByTestId("uiheader-logo-image")).toHaveStyle({
            ...UIHeaderStyles.logoImage
        });
    });

    it("should respect showBackButton prop", async () => {
        var { getByTestId } = await render(<UIHeader showBackButton={true} />);

        expect(getByTestId("uiheader-outer-container")).toBeOnTheScreen();
        expect(getByTestId("backbutton-outer-container")).toBeOnTheScreen();

        var { getByTestId } = await render(<UIHeader showBackButton={false} />);

        expect(getByTestId("uiheader-placeholder-backbutton")).toBeOnTheScreen();
    });

    it("should respect avatar prop", async () => {
        var { getByTestId } = await render(<UIHeader showAvatar={true} />);

        expect(getByTestId("uiheader-outer-container")).toBeOnTheScreen();
        expect(getByTestId("avatar-pressable-container")).toBeOnTheScreen();

        var { getByTestId } = await render(<UIHeader showAvatar={false} />);

        expect(getByTestId("uiheader-placeholder-avatar")).toBeOnTheScreen();

    });
});