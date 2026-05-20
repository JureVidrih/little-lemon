import { useSessionStorage } from "../hooks/";

describe("useSessionStorage hook", () => {
    it("It should start of empty", () => {
        let sessionStorage = useSessionStorage();
        expect(Object.keys(sessionStorage.getStorage()).length).toBe(0);
    });
});