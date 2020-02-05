export default class ElementService {

    constructor(elements = [], categories = []) {
        this.from(elements, categories);
    }

    from(elements = [], categories = []) {
        this.elements = [...elements];
        this.categories = [...categories];

        return this;
    }
}