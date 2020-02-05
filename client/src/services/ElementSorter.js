import ElementService from './ElementService';

export default class ElementSorter extends ElementService {

    by(sortBy) {
        switch(sortBy) {
            case 'name':
                this.elements = this.elements.sort(this.byName.bind(this));
                break;
            case 'category':
                this.elements = this.elements.sort(this.byCategory.bind(this));
                break;
        }

        return this;
    }

    byName(elementA, elementB) {
        if(elementA.tag < elementB.tag) return -1;
        if(elementB.tag < elementA.tag) return 1;

        return 0;
    }

    byCategory(elementA, elementB) {
        return this.categories.findIndex(category => category === elementA.category) - this.categories.findIndex(category => category === elementB.category);
    }

    dir(direction) {
        if(direction === 'desc') {
            return this.desc();
        }

        return this.asc();
    }

    asc() {
        return this.elements;
    }

    desc() {
        return this.elements.reverse();
    }
}