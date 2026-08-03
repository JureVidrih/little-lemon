import { render, userEvent, screen } from '@testing-library/react-native';

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './HomeScreen.tsx';

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

jest.mock('../../database/database.ts', () => {
    let fetchedData = {
        "menu": [
            {
            "name": "Greek Salad",
            "price": 12.99,
            "description": "Our delicious salad is served with Feta cheese and peeled cucumber. Includes tomatoes, onions, olives, salt and oregano in the ingredients.",
            "image": "greekSalad.jpg",
            "category": "starters"
            },
            {
            "name": "Bruschetta",
            "price": 7.99,
            "description": "Delicious grilled bread rubbed with garlic and topped with olive oil and salt. Our Bruschetta includes tomato and cheese.",
            "image": "bruschetta.jpg",
            "category": "starters"
            },
            {
            "name": "Grilled Fish",
            "price": 20.00,
            "description": "Fantastic grilled fish seasoned with salt.",
            "image": "grilledFish.jpg",
            "category": "mains"
            },
            {
            "name": "Pasta",
            "price": 6.99,
            "description": "Delicious pasta for your delight.",
            "image": "pasta.jpg",
            "category": "mains"
            },
            {
            "name": "Lemon Dessert",
            "price": 4.99,
            "description": "You can't go wrong with this delicious lemon dessert!",
            "image": "lemonDessert.jpg",
            "category": "desserts"
            }
        ]
    };

    return {
            createTable: jest.fn(() => {}),
            fetchData: jest.fn(() => {}),
            getData: jest.fn((filter, filterCategories) => {
                return new Promise((resolve, reject) => {
                    let menu = [...fetchedData.menu];

                    if(filterCategories) {
                        menu = menu.filter((item) => { return filterCategories.some((category => { return item.category === category })) });
                    }

                    if(filter) {
                        menu = menu.filter((item) => { return item.name.toLowerCase().includes(filter.toLowerCase())});
                    }

                    resolve(menu);
                });
            })
        };
    }
);

describe("HomeScreen screen component", () => {
    it("should render on the screen", async () => {
        let { getByTestId } = await render(<HomeScreen />);

        expect(getByTestId("homescreen-outer-container")).toBeOnTheScreen();
    });

    it("should fetch and display data from the web", async () => {
        let { getByTestId } = await render(<HomeScreen />);

        expect(screen.queryByText("Greek Salad")).toBeOnTheScreen();
        expect(screen.queryByText("Bruschetta")).toBeOnTheScreen();
        expect(screen.queryByText("Grilled Fish")).toBeOnTheScreen();
        expect(screen.queryByText("Pasta")).toBeOnTheScreen();
        expect(screen.queryByText("Lemon Dessert")).toBeOnTheScreen();
    });

    it("should handle filtering by search and selecting categories", async () => {
        const user = userEvent.setup();
        let { getByTestId, getAllByTestId } = await render(<HomeScreen />);

        await user.press(getAllByTestId("togglebutton-outer-container")[0]);

        expect(screen.queryByText("Greek Salad")).toBeOnTheScreen();
        expect(screen.queryByText("Bruschetta")).toBeOnTheScreen();
        expect(screen.queryByText("Grilled Fish")).not.toBeOnTheScreen();
        expect(screen.queryByText("Pasta")).not.toBeOnTheScreen();
        expect(screen.queryByText("Lemon Dessert")).not.toBeOnTheScreen();

        await user.press(getByTestId("herosearch-show-button"));
        await user.type(getByTestId("input-text-input"), "sal");

        expect(screen.queryByText("Greek Salad")).toBeOnTheScreen();
        expect(screen.queryByText("Bruschetta")).not.toBeOnTheScreen();
        expect(screen.queryByText("Grilled Fish")).not.toBeOnTheScreen();
        expect(screen.queryByText("Pasta")).not.toBeOnTheScreen();
        expect(screen.queryByText("Lemon Dessert")).not.toBeOnTheScreen();

        await user.clear(getByTestId("input-text-input"));

        expect(screen.queryByText("Greek Salad")).toBeOnTheScreen();
        expect(screen.queryByText("Bruschetta")).toBeOnTheScreen();
        expect(screen.queryByText("Grilled Fish")).not.toBeOnTheScreen();
        expect(screen.queryByText("Pasta")).not.toBeOnTheScreen();
        expect(screen.queryByText("Lemon Dessert")).not.toBeOnTheScreen();

        await user.press(getAllByTestId("togglebutton-outer-container")[0]);

        expect(screen.queryByText("Greek Salad")).toBeOnTheScreen();
        expect(screen.queryByText("Bruschetta")).toBeOnTheScreen();
        expect(screen.queryByText("Grilled Fish")).toBeOnTheScreen();
        expect(screen.queryByText("Pasta")).toBeOnTheScreen();
        expect(screen.queryByText("Lemon Dessert")).toBeOnTheScreen();

        await user.press(getAllByTestId("togglebutton-outer-container")[0]);
        await user.press(getAllByTestId("togglebutton-outer-container")[1]);
        await user.press(getAllByTestId("togglebutton-outer-container")[2]);
        await user.press(getAllByTestId("togglebutton-outer-container")[3]);

        expect(screen.queryByText("Greek Salad")).toBeOnTheScreen();
        expect(screen.queryByText("Bruschetta")).toBeOnTheScreen();
        expect(screen.queryByText("Grilled Fish")).toBeOnTheScreen();
        expect(screen.queryByText("Pasta")).toBeOnTheScreen();
        expect(screen.queryByText("Lemon Dessert")).toBeOnTheScreen();
    });
});