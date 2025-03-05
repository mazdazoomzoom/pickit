'use client';

import { useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';

import StashItem from '@/components/StashItem';
import Waystones from '@/components/Waystones';
import Salvage from '@/components/Salvage';
import Equipment from '@/components/Equipment';
import Weapons from '@/components/Weapons';
import Flasks from '@/components/Flasks';
import Charms from '@/components/Charms';
import Jewels from '@/components/Jewels';
import Gems from '@/components/Gems';
import Uniques from '@/components/Uniques';

import PickitButtons from '@/components/PickitButtons';

import { createBasePickitData, generateIPD } from '@/data/pickit';
import categories from '@/data/pickit/categories';
import { decrypt } from '@/helpers/crypto';
import uniques from '@/data/pickit/uniques';

export default function Home() {
    const [pickit, setPickit] = useState(createBasePickitData());

    const updatePickit = (category, item) => {
        const newPickit = { ...pickit };

        switch (category) {
            case 'salvage':
            case 'equipment':
            case 'weapons':
            case 'flasks':
            case 'charms':
            case 'jewels':
            case 'gems':
                newPickit[category] = item;
                break;

            default:
                const categoryIndex = newPickit[category].findIndex(
                    (i) => i.name === item.name
                );

                if (categoryIndex === -1) {
                    newPickit[category].push(item);
                } else {
                    newPickit[category][categoryIndex] = item;
                }
                break;
        }

        setPickit(newPickit);
    };

    return (
        <div className="mx-auto p-4">
            <p className=" mb-6">
                Customize your item pickup script by configuring the items
                below. Use the accordions to organize different item categories.
            </p>

            <div className="mb-6">
                <Textarea
                    placeholder="Paste your pickit here"
                    onChange={(e) => {
                        try {
                            const newPickit = JSON.parse(
                                decrypt(e.target.value)
                            );
                            setPickit(newPickit);
                        } catch (error) {
                            console.log('Invalid pickit');
                        }
                    }}
                />
            </div>

            <div className="lg:hidden flex gap-4 mb-4">
                <PickitButtons pickit={pickit} />
            </div>

            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 lg:mr-4">
                    <Accordion type="single" collapsible>
                        {RenderAccordions(pickit, updatePickit)}
                    </Accordion>
                </div>

                <div className="w-full lg:w-1/2">
                    <div className="sm:hidden lg:flex gap-4 mb-4">
                        <PickitButtons pickit={pickit} />
                    </div>
                    <pre className="mt-4 p-4 bg-secondary text-primary rounded-lg">
                        {generateIPD(pickit)}
                    </pre>
                </div>
            </div>
        </div>
    );
}

function RenderAccordions(pickit, updatePickit) {
    const component = (category) => {
        switch (category.component) {
            case 'stash_item':
                return (
                    <StashItem
                        updatePickit={updatePickit}
                        category={category.prop}
                        data={pickit[category.prop]}
                    />
                );

            case 'waystones':
                return (
                    <Waystones
                        updatePickit={updatePickit}
                        category={category.prop}
                        data={pickit.waystones}
                    />
                );

            case 'salvage':
                return (
                    <Salvage
                        updatePickit={updatePickit}
                        category={category.prop}
                        data={pickit.salvage}
                    />
                );

            case 'equipment':
                return (
                    <Equipment
                        updatePickit={updatePickit}
                        category={category.prop}
                        data={pickit.equipment}
                    />
                );

            case 'weapons':
                return (
                    <Weapons
                        updatePickit={updatePickit}
                        category={category.prop}
                        data={pickit.weapons}
                    />
                );

            case 'flasks':
                return (
                    <Flasks
                        updatePickit={updatePickit}
                        category={category.prop}
                        data={pickit.flasks}
                    />
                );

            case 'charms':
                return (
                    <Charms
                        updatePickit={updatePickit}
                        category={category.prop}
                        data={pickit.charms}
                    />
                );

            case 'jewels':
                return (
                    <Jewels
                        updatePickit={updatePickit}
                        category={category.prop}
                        data={pickit.jewels}
                    />
                );

            case 'gems':
                return (
                    <Gems
                        updatePickit={updatePickit}
                        category={category.prop}
                        data={pickit.gems}
                    />
                );

            case 'uniques':
                return (
                    <Uniques
                        updatePickit={updatePickit}
                        category={category.prop}
                        data={pickit.uniques}
                    />
                );

            default:
                return null;
        }
    };

    return categories.map((category) => {
        return (
            <AccordionItem value={category.prop} key={category.prop}>
                <AccordionTrigger>
                    <h1>{category.name}</h1>
                </AccordionTrigger>
                <AccordionContent>{component(category)}</AccordionContent>
            </AccordionItem>
        );
    });
}
