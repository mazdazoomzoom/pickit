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

function objProps(category) {
    return category.map((prop) => {
        return {
            name: prop,
            stashItem: true,
        };
    });
}

function waystoneObjProps() {
    const rarities = ['Normal', 'Magic', 'Rare', 'Unique'];
    const waystoneProps = [];

    Array.from({ length: 15 }, (_, i) => {
        for (let k = 0; k < 4; k++) {
            waystoneProps.push({
                name: `Waystone (Tier ${i + 1})`,
                stashItem: true,
                rarity: rarities[k],
            });
        }
    });

    return waystoneProps;
}

function createBasePickitData() {
    const pickit = {};
    categories.map((category) => {
        pickit[category.prop] = [];
    });

    pickit.currency = objProps(currency);
    pickit.runes = objProps(runes);
    pickit.distilledEmotions = objProps(distilledEmotions);
    pickit.soulCores = objProps(soulCores);
    pickit.omens = objProps(omens);
    pickit.essences = objProps(essences);
    pickit.catalysts = objProps(catalysts);
    pickit.splinters = objProps(splinters);
    pickit.artifacts = objProps(artifacts);
    pickit.trialKeys = objProps(trialKeys);
    pickit.trials = objProps(trials);
    pickit.waystones = waystoneObjProps();
    pickit.tablets = objProps(tablets);

    return pickit;
}

function generateIPD(pickitData) {
    const centerCategory = (category) => {
        const fullLength = '/////////////////////////////////////////////////////////////////////////////////////'
            .length;
        const center = Math.floor((fullLength - 4 - category.length) / 2);

        if (category.length % 2 === 0) {
            return `//${' '.repeat(center)}${category}${' '.repeat(center + 1)}//`;
        }
        return `//${' '.repeat(center)}${category}${' '.repeat(center)}//`;
    };

    let ipd = `//
// Exiled Bot 2 Pickit - Configuration Guide for Path of Exile 2
//
// This file defines which items your bot should pick up, identify, keep, or salvage.`;

    categories.map((category) => {
        ipd += `
/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
${centerCategory(category.name)}
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////`;
    });

    return ipd;
}

export default class Pickit {
    constructor() {
        this.data = createBasePickitData();
    }

    getPickit() {
        return this.data;
    }

    generatePicket() {
        return generateIPD(this.data);
    }
}
