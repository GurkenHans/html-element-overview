import ElementService from './ElementService';

export default class ElementGrouper extends ElementService {

    by(sortBy) {
        let elementGroups;

        switch(sortBy) {
            case 'category':
                elementGroups = this.byCategory();
                break;
            case 'name':
                elementGroups = this.byName();
                break;
        }

        return this.postProcess(elementGroups);
    }

    byName() {
        return 'abcdefghijklmnopqrstuvwxyz'.split('').map(char => {
            return {
                order: this.elements.findIndex(element => element.tag.startsWith(char)),
                title: char.toUpperCase(),
            };
        });
    }

    byCategory() {
        return this.categories.map(category => {
            return {
                order: this.elements.findIndex(element => element.category === category),
                title: category,
            };
        });
    }

    postProcess(elementGroups) {
        return elementGroups
            .filter(group => group.order !== -1)
            .map(group => {
                group.order = group.order * 10 + 5;

                return group;
            });
    }
}