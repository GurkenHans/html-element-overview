const request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    path = require('path'),
    compatData = require('mdn-browser-compat-data'),
    compatDataOptions = require('./config').compatDataOptions;

class CompatData {

    constructor() {
    }

    async getCategories() {
        const data = await this.getData();

        return data.categories;
    }

    async getElements() {
        const data = await this.getData();

        return data.elements.map(element => {
            return {
                tag: element.tag,
                category: element.category,
            };
        });
    }

    async getElement(tagName) {
        const data = await this.getData(),
            element = data.elements.find(element => element.tag === tagName);

        return element;
    }
    
    async getData() {
        if(this.hasAccessToJsonFile()) {
            const jsonFile = this.getJsonFilePath(),
                jsonFileContents = fs.readFileSync(jsonFile);

            return JSON.parse(jsonFileContents);
        } else {
            return await this.generateData();
        }
    }

    async generateData() {
        const jsonFile = this.getJsonFilePath(),
            elements = compatData.html.elements,
            docReference = await this.getDocReference(),
            jsonData = {
                updated_at: Date.now(),
                categories: docReference.categories,
                elements: [],
            };

        for(let [elementName, elementData] of Object.entries(elements)) {
            jsonData.elements = [
                ...jsonData.elements,
                {
                    tag: elementName,
                    ...docReference.elements[elementName],
                    ...elementData.__compat,
                    support: this.getAdditionalSupportData(elementData.__compat.support),
                    quote_url: compatDataOptions.elementDocumentationUrl,
                },
            ];
        }

        fs.writeFileSync(jsonFile, JSON.stringify(jsonData, null, 2));

        return jsonData;
    }

    getJsonFilePath() {
        return path.join(__dirname, compatDataOptions.jsonFile);
    }

    hasAccessToJsonFile() {
        const jsonFile = this.getJsonFilePath();

        let hasAccess = true;

        try {
            fs.accessSync(jsonFile, fs.constants.R_OK | fs.constants.W_OK);
        } catch(err) {
            hasAccess = false;
        }

        return hasAccess;
    }

    async getDocReference() {
        return new Promise((resolve, reject) => {
            request(compatDataOptions.elementDocumentationUrl, (err, res, body) => {
                if(err) {
                    reject(err);
                } else {
                    const $ = cheerio.load(body),
                        elements = {};
                    let categories = [];

                    $('#wikiArticle > h2').each(function() {
                        const categoryTitle = $(this).text().trim();

                        categories = [...categories, categoryTitle];

                        $(this).nextUntil('h2', 'table').find('tbody > tr').each(function() {
                            const description = $(this).find('td').last().text().trim();

                            $(this).find('td').first().find('a').each(function() {
                                const elementTitle = $(this).find('code').text().replace(/\W/g, '');
                                
                                elements[elementTitle] = {
                                    category: categoryTitle,
                                    description,
                                };
                            });
                        });
                    });

                    resolve({ categories, elements });
                }
            });
        });
    }

    getAdditionalSupportData(support) {
        const browserList = this.getBrowserList(),
            newSupport = {};

        for(let [id, supportData] of Object.entries(support)) {
            if(Array.isArray(supportData)) {
                supportData = supportData[0];
            }

            newSupport[id] = {
                id,
                ...supportData,
                ...browserList[id],
            };

            newSupport[id].notes = typeof newSupport[id].notes === 'string' ? [newSupport[id].notes] : newSupport[id].notes;
        }
        return Object.values(newSupport);
    }

    getBrowserList() {
        return {
            chrome: {
                name: 'Chrome',
                mobile: false,
            },
            chrome_android: {
                name: 'Chrome for Android',
                mobile: true,
            },
            edge: {
                name: 'Edge',
                mobile: false,
            },
            firefox: {
                name: 'Firefox',
                mobile: false,
            },
            firefox_android: {
                name: 'Firefox for Android',
                mobile: true,
            },
            ie: {
                name: 'Internet Explorer',
                mobile: false,
            },
            opera: {
                name: 'Opera',
                mobile: false,
            },
            opera_android: {
                name: 'Opera for Android',
                mobile: true,
            },
            safari: {
                name: 'Safari',
                mobile: false,
            },
            safari_ios: {
                name: 'Safari on iOS',
                mobile: true,
            },
            samsunginternet_android: {
                name: 'Samsung Internet',
                mobile: true,
            },
            webview_android: {
                name: 'Android webview',
                mobile: true,
            },
        };
    }
}

module.exports = CompatData;