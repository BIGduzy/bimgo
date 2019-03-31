
export default class Model {
    constructor(name, initialState = {}) {
        this.m_name = name;
        this.m_reducer = {};
        this.m_actions = {};
        this.m_initialState = {
            ...initialState,
        };
    }

    get reducer() {
        // We can't use anonymious function because the redux combineReducers function
        // uses the name
        return function reducer(state = this.m_initialState, action = {}) {
            let result = null;
            const keys = Object.keys(this.m_reducer);
            keys.forEach((key) => {
                if (action.type === key) {
                    result = this.m_reducer[key];
                }
            });

            return result ? { ...state, ...result(state, action) } : state;
        }.bind(this);
    }

    get actions() {
        return this.m_actions;
    }

    setAction(name, reducers) {
        const types = {};

        const functions = Object.getOwnPropertyNames(reducers);
        functions.forEach((reducerName) => {
            const key = `${this.m_name.toUpperCase()}/${reducerName.toUpperCase()}`;

            this.m_reducer[key] = reducers[reducerName];
            types[reducerName] = key;
        });

        this.m_actions[name] = this.constructor[name](types);
    }
}
