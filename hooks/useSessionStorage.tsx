class SessionStorage {
    storedValues: any;
    
    constructor() {
        this.storedValues = {};
    }

    getStorage() {
        return this.storedValues;
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

    getInterface() {
        return {
            getStorage: () => { return this.getStorage(); },
            set: (key: string, value: any) => { return this.setValue(key, value); },
            has: (key: string) => { return this.hasValue(key); },
            get: (key: string) => { return this.getValue(key); },
            remove: (key: string) => { return this.removeValue(key); },
            wipeAll: () => { return this.wipe(); }
        }
    }
}

const sessionStorage = new SessionStorage();


const useSessionStorage = () => {
    return sessionStorage.getInterface();
};

export { useSessionStorage };