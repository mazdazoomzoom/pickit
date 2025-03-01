import categories from './categories';
import currency from './currency';
import runes from './runes';
import distilledEmotions from './distilled_emotions';
import soulCores from './soul_cores';
import omens from './omens';
import essences from './essences';
import catalysts from './catalysts';
import splinters from './splinters';
import artifacts from './artifacts';
import trialKeys from './trial_keys';
import trials from './trials';
import tablets from './tablets';
import equipment from './equipment';
import weapons from './weapons';
import rarities from './rarities';
import charms from './charms';
import jewels from './jewels';

import { encrypt } from '@/helpers/crypto';

function salvageObjProps() {
    const salvageProps = {
        sockets: [
            {
                greaterThan: 0,
                salvage: true,
                rarity: 'Normal',
            },
            {
                greaterThan: 0,
                salvage: true,
                rarity: 'Magic',
            },
            {
                greaterThan: 0,
                salvage: true,
                rarity: 'Rare',
            },
        ],
        quality: [
            {
                greaterThan: 0,
                salvage: true,
                rarity: 'Normal',
            },
            {
                greaterThan: 0,
                salvage: true,
                rarity: 'Magic',
            },
            {
                greaterThan: 0,
                salvage: true,
                rarity: 'Rare',
            },
        ],
    };

    return salvageProps;
}

function stashItemsObjProps(category) {
    return category.map((prop) => {
        return {
            name: prop,
            stashItem: true,
        };
    });
}

function waystoneObjProps() {
    const waystoneProps = [];

    Array.from({ length: 15 }, (_, i) => {
        for (let k = 0; k < rarities.length; k++) {
            waystoneProps.push({
                name: `Waystone (Tier ${i + 1})`,
                stashItem: true,
                rarity: rarities[k],
            });
        }
    });

    return waystoneProps;
}

function equipmentObjProps() {
    const equipmentProps = {};

    equipment.map((prop) => {
        equipmentProps[prop] = [];
    });

    return equipmentProps;
}

function weaponObjProps() {
    const weaponProps = {};

    Object.keys(weapons).map((weaponType) => {
        weaponProps[weaponType] = {};

        weapons[weaponType].map((weapon) => {
            weaponProps[weaponType][weapon] = [];
        });
    });

    return weaponProps;
}

function flaskObjProps() {
    const flaskProps = {
        'Life Flask': [],
        'Mana Flask': [],
    };

    return flaskProps;
}

function charmsObjProps() {
    const charmsProps = {};

    charms.map((prop) => {
        charmsProps[prop + ' Charm'] = [];
    });

    return charmsProps;
}

function jewelsObjProps() {
    const jewelsProps = {};

    jewels.map((prop) => {
        jewelsProps[prop] = [];
    });

    return jewelsProps;
}

function createBasePickitData() {
    const pickit = {};
    categories.map((category) => {
        pickit[category.prop] = [];
    });

    pickit.salvage = salvageObjProps();
    pickit.waystones = waystoneObjProps();
    pickit.equipment = equipmentObjProps();
    pickit.weapons = weaponObjProps();
    pickit.flasks = flaskObjProps();
    pickit.charms = charmsObjProps();
    pickit.jewels = jewelsObjProps();
    pickit.currency = stashItemsObjProps(currency);
    pickit.runes = stashItemsObjProps(runes);
    pickit.distilledEmotions = stashItemsObjProps(distilledEmotions);
    pickit.soulCores = stashItemsObjProps(soulCores);
    pickit.omens = stashItemsObjProps(omens);
    pickit.essences = stashItemsObjProps(essences);
    pickit.catalysts = stashItemsObjProps(catalysts);
    pickit.splinters = stashItemsObjProps(splinters);
    pickit.artifacts = stashItemsObjProps(artifacts);
    pickit.trialKeys = stashItemsObjProps(trialKeys);
    pickit.trials = stashItemsObjProps(trials);
    pickit.tablets = stashItemsObjProps(tablets);

    return pickit;
}

function generateIPD(pickitData) {
    const centerCategory = (category) => {
        const fullLength =
            '/////////////////////////////////////////////////////////////////////////////////////'
                .length;
        const center = Math.floor((fullLength - 4 - category.length) / 2);

        if (category.length % 2 === 0) {
            return `//${' '.repeat(center)}${category}${' '.repeat(
                center + 1
            )}//`;
        }
        return `//${' '.repeat(center)}${category}${' '.repeat(center)}//`;
    };

    const salvagePickit = () => {
        let ipdSalvage = '';

        for (const key in pickitData.salvage) {
            ipdSalvage += `//// ${
                key.charAt(0).toUpperCase() + key.slice(1)
            } ////\n`;

            for (const data of pickitData.salvage[key]) {
                ipdSalvage += `[Rarity] == "${data.rarity}" && [${
                    key.charAt(0).toUpperCase() + key.slice(1)
                }] > "${data.greaterThan}" # [Salvage] == "${
                    data.salvage ? 'true' : 'false'
                }"\n`;
            }
            ipdSalvage += `\n`;
        }

        return ipdSalvage;
    };

    const waystonePickit = () => {
        return pickitData.waystones
            .map((data, index) => {
                return `[Type] == "${data.name}" && [Rarity] == "${
                    data.rarity
                }" # [StashItem] == "${data.stashItem ? 'true' : 'false'}"${
                    (index + 1) % 4 === 0 ? '\n' : ''
                }`;
            })
            .join('\n');
    };

    const equipmentPickit = () => {
        const equipment = pickitData.equipment;
        let ipdEquipment = '';

        for (const key in equipment) {
            let category = key;
            if (key === 'Armour') {
                category = 'BodyArmour';
            }

            if (equipment[key].length === 0) continue;
            ipdEquipment += `//// ${key} ////\n`;

            for (const equipmentItem of equipment[key]) {
                ipdEquipment += `[Category] == "${category}" && [Rarity] == "${equipmentItem.rarity}" # `;

                if (equipmentItem.properties.length > 0) {
                    ipdEquipment += equipmentItem.properties
                        .map((prop) => {
                            return `[${prop.property}] ${prop.operators} "${prop.value}"`;
                        })
                        .join(' && ');
                    ipdEquipment += ' && ';
                }
                ipdEquipment += `[StashItem] == "true"\n`;
            }
            ipdEquipment += `\n`;
        }

        return ipdEquipment;
    };

    const weaponPickit = () => {
        let ipdWeapons = '';

        ipdWeapons += `// One-handed //////\n`;
        const oneHandedWeapons = pickitData.weapons['One-handed'];
        for (const key in oneHandedWeapons) {
            if (oneHandedWeapons[key].length === 0) continue;

            ipdWeapons += `//// ${key} ////\n`;

            for (const weaponItem of oneHandedWeapons[key]) {
                ipdWeapons += `[Category] == "${key}" && [Rarity] == "${weaponItem.rarity}" # `;

                if (weaponItem.properties.length > 0) {
                    ipdWeapons += weaponItem.properties
                        .map((prop) => {
                            return `[${prop.property}] ${prop.operators} "${prop.value}"`;
                        })
                        .join(' && ');
                    ipdWeapons += ' && ';
                }
                ipdWeapons += `[StashItem] == "true"\n`;
            }
            ipdWeapons += `\n`;
        }

        ipdWeapons += `\n\n// Two-handed //////\n`;
        const twoHandedWeapons = pickitData.weapons['Two-handed'];
        for (const key in twoHandedWeapons) {
            if (twoHandedWeapons[key].length === 0) continue;

            ipdWeapons += `//// ${key} ////\n`;

            for (const weaponItem of twoHandedWeapons[key]) {
                ipdWeapons += `[Category] == "${key}" && [Rarity] == "${weaponItem.rarity}" # `;

                if (weaponItem.properties.length > 0) {
                    ipdWeapons += weaponItem.properties
                        .map((prop) => {
                            return `[${prop.property}] ${prop.operators} "${prop.value}"`;
                        })
                        .join(' && ');
                    ipdWeapons += ' && ';
                }
                ipdWeapons += `[StashItem] == "true"\n`;
            }
            ipdWeapons += `\n`;
        }

        ipdWeapons += `\n\n// Two-handed //////\n`;
        const offHandedWeapons = pickitData.weapons['Off-handed'];
        for (const key in offHandedWeapons) {
            if (offHandedWeapons[key].length === 0) continue;

            ipdWeapons += `//// ${key} ////\n`;

            for (const weaponItem of offHandedWeapons[key]) {
                ipdWeapons += `[Category] == "${key}" && [Rarity] == "${weaponItem.rarity}" # `;

                if (weaponItem.properties.length > 0) {
                    ipdWeapons += weaponItem.properties
                        .map((prop) => {
                            return `[${prop.property}] ${prop.operators} "${prop.value}"`;
                        })
                        .join(' && ');
                    ipdWeapons += ' && ';
                }
                ipdWeapons += `[StashItem] == "true"\n`;
            }
            ipdWeapons += `\n`;
        }

        return ipdWeapons;
    };

    const flaskPickit = () => {
        const flasks = pickitData.flasks;
        let ipdFlask = '';

        for (const key in flasks) {
            let category = key;

            if (key === 'Life Flask') {
                category = 'LifeFlask';
            }

            if (key === 'Mana Flask') {
                category = 'ManaFlask';
            }

            if (flasks[key].length === 0) continue;
            ipdFlask += `//// ${key} ////\n`;

            for (const flaskItem of flasks[key]) {
                ipdFlask += `[Category] == "${category}" && [Rarity] == "${flaskItem.rarity}" # `;

                if (flaskItem.properties.length > 0) {
                    ipdFlask += flaskItem.properties
                        .map((prop) => {
                            return `[${prop.property}] ${prop.operators} "${prop.value}"`;
                        })
                        .join(' && ');
                    ipdFlask += ' && ';
                }
                ipdFlask += `[StashItem] == "true"\n`;
            }
            ipdFlask += `\n`;
        }

        return ipdFlask;
    };

    const charmsPickit = () => {
        const charms = pickitData.charms;
        let ipdCharms = '';

        for (const key in charms) {
            let category = key;
            // category = category.replace(/\s/g, '');

            if (charms[key].length === 0) continue;
            ipdCharms += `//// ${key} ////\n`;

            for (const equipmentItem of charms[key]) {
                ipdCharms += `[Type] == "${category}" && [Rarity] == "${equipmentItem.rarity}" # `;

                if (equipmentItem.properties.length > 0) {
                    ipdCharms += equipmentItem.properties
                        .map((prop) => {
                            return `[${prop.property}] ${prop.operators} "${prop.value}"`;
                        })
                        .join(' && ');
                    ipdCharms += ' && ';
                }
                ipdCharms += `[StashItem] == "true"\n`;
            }
            ipdCharms += `\n`;
        }

        return ipdCharms;
    };

    const jewelsPickit = () => {
        const jewels = pickitData.jewels;
        let ipdJewels = '';

        for (const key in jewels) {
            if (jewels[key].length === 0) continue;
            ipdJewels += `//// ${key} ////\n`;

            for (const equipmentItem of jewels[key]) {
                ipdJewels += `[Type] == "${key}" && [Rarity] == "${equipmentItem.rarity}" # `;

                if (equipmentItem.properties.length > 0) {
                    ipdJewels += equipmentItem.properties
                        .map((prop) => {
                            return `[${prop.property}] ${prop.operators} "${prop.value}"`;
                        })
                        .join(' && ');
                    ipdJewels += ' && ';
                }
                ipdJewels += `[StashItem] == "true"\n`;
            }
            ipdJewels += `\n`;
        }

        return ipdJewels;
    };

    const stashItemPickit = (category) => {
        return pickitData[category]
            .map((data) => {
                return `${data.stashItem ? '' : '// '}[Type] == "${
                    data.name
                }" # [StashItem] == "true"`;
            })
            .join('\n');
    };

    const categoryProps = (category) => {
        switch (category) {
            case 'salvage':
                return salvagePickit();
                break;

            case 'waystones':
                return waystonePickit();
                break;

            case 'equipment':
                return equipmentPickit();
                break;

            case 'weapons':
                return weaponPickit();
                break;

            case 'flask':
                return flaskPickit();
                break;
            case 'charms':
                return charmsPickit();
                break;
            case 'jewels':
                return jewelsPickit();
                break;

            default:
                return stashItemPickit(category);
                break;
        }
    };

    let ipd = `//
// Exiled Bot 2 Pickit - Configuration Guide for Path of Exile 2
//
// This file defines which items your bot should pick up, identify, keep, or salvage.
//
// You can comeback and edit your pickit file at any time by visiting the following link and entering your unique pickit code.
// https://pickit-create.vercel.app/
// ${encrypt(pickitData)}
// 
//  `;

    categories.map((category) => {
        ipd += `
/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
${centerCategory(category.name)}
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////

${categoryProps(category.prop)}\n`;
    });

    return ipd;
}

export { createBasePickitData, generateIPD };
