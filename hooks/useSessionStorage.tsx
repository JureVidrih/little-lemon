class SessionStorage {
    storedValues: any;
    
    constructor() {
        this.storedValues = {};
    }

    setValue(key: string, value: any) {
        this.storedValues[key] = value;
        return true;
    }

    hasValue(key: string) {
        if(this.storedValues[key] !== undefined) {
            return true;
        } else {
            return false;
        }
    }

    getValue(key: string) {
        if(this.hasValue(key) === true) {
            return this.storedValues[key];
        } else {
            return null;
        }
    }

    removeValue(key: string) {
        delete this.storedValues[key];
    }

    wipe() {
        this.storedValues = {};
        return true;
    }
}

const sessionStorage = new SessionStorage();

const useSessionStorage = {
    set(key: string, value: any) { return sessionStorage.setValue(key, value); },
    has(key: string) { return sessionStorage.hasValue(key); },
    get(key: string) { return sessionStorage.getValue(key); },
    remove(key: string) { return sessionStorage.removeValue(key); },
    wipeAll() { return sessionStorage.wipe(); }
};

export { useSessionStorage };