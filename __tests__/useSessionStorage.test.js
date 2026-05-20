import { useSessionStorage } from "../hooks/";

describe("useSessionStorage hook", () => {
    it("It should start of empty", () => {
        let sessionStorage = useSessionStorage();
        expect(Object.keys(sessionStorage.getStorage()).length).toBe(0);
    });

    it("It should be able to set a value that can be later referenced with a key", () => {
        let sessionStorage = useSessionStorage();
        sessionStorage.set("testProperty", 1);
        expect(sessionStorage.has("testProperty")).toBe(true);
        expect(sessionStorage.get("testProperty")).toBe(1);
    });

    it("It should be able to check if a specified key with a value already exists", () => {
        let sessionStorage = useSessionStorage();
        sessionStorage.set("testProperty", 1);
        expect(sessionStorage.has("testProperty")).toBe(true);
        expect(sessionStorage.has("nonExistingProperty")).toBe(false);
    });

    it("It should be able to retrieve a value under a specific key", () => {
        let sessionStorage = useSessionStorage();
        sessionStorage.set("testProperty", 1);
        expect(sessionStorage.get("testProperty")).toBe(1);
        expect(sessionStorage.get("nonExistingProperty")).toBe(null);
    });

    it("It should be able to remove a key-value from the storage", () => {
        let sessionStorage = useSessionStorage();
        sessionStorage.set("testProperty", 1);
        expect(sessionStorage.remove("testProperty")).toBe(true);
        expect(sessionStorage.remove("nonExistingProperty")).toBe(false);
    });

    it("It should be able to reset and wipe the storage", () => {
        let sessionStorage = useSessionStorage();
        sessionStorage.set("testProperty", 1);
        expect(sessionStorage.wipeAll()).toBe(true);
        expect(sessionStorage.getStorage()).toEqual({});
    });
});