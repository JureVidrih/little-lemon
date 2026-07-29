import { render } from '@testing-library/react-native';

import Txt from './Txt.tsx';

import textStyles from './TextStyles.ts';

describe("Txt component", () => {
    it("should have rendered correctly", async () => {
        const { getByTestId } = await render(<Txt />);

        expect(getByTestId("textContainer")).toBeOnTheScreen();
        expect(getByTestId("textContainer")).toHaveTextContent("/");
    });

    it("should respect style prop", async () => {
        const { getByTestId } = await render(<Txt style={{
            fontSize: 40,
            fontWeight: '800',
            color: '#3700ff',
            fontFamily: 'Arial'
        }} />);

        expect(getByTestId("textContainer")).toHaveStyle({
            fontSize: 40,
            fontWeight: '800',
            color: '#3700ff',
            fontFamily: 'Arial'
        });
    });

    it("should have at least one available text style to choose from", async () => {
        expect(Object.keys(textStyles).length > 0).toBeTruthy();
    });

    it("should respect textStyle prop", async () => {
        const { getByTestId } = await render(<Txt textStyle={Object.keys(textStyles)[0]} />);

        expect(getByTestId("textContainer")).toHaveStyle(textStyles[Object.keys(textStyles)[0]]);
    });
});