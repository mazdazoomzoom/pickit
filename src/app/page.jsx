'use client';

import { useState } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import StashItem from '@/components/StashItem';
import Waystones from '@/components/Waystones';
import Salvage from '@/components/Salvage';
import { createBasePickitData, generateIPD } from '@/data/pickit';
import categories from '@/data/pickit/categories';

export default function Home() {
    const [pickit, setPickit] = useState(createBasePickitData());

    // Update the pickit data with the new item
    const updatePickit = (category, item) => {
        const newPickit = { ...pickit };

        switch (category) {
            case 'salvage':
                newPickit.salvage = item;
                break;
            default:
                const categoryIndex = newPickit[category].findIndex((i) => i.name === item.name);

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
            <h1 className="text-3xl font-bold mb-4">Path of Exile 2 Pickit Configuration</h1>
            <p className=" mb-6">
                Customize your item pickup script by configuring the items below. Use the accordions to organize
                different item categories.
            </p>

            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 lg:mr-4">
                    <Accordion type="single" collapsible>
                        {RenderAccordions(pickit, updatePickit)}
                    </Accordion>
                </div>

                <div className="w-full lg:w-1/2">
                    <pre className="mt-4 p-4 bg-secondary text-primary rounded-lg">{generateIPD(pickit)}</pre>
                </div>
            </div>
        </div>
    );
}

function RenderAccordions(pickit, updatePickit) {
    const component = (category) => {
        switch (category.component) {
            case 'stash_item':
                return <StashItem updatePickit={updatePickit} category={category.prop} data={pickit[category.prop]} />;
            case 'waystones':
                return <Waystones updatePickit={updatePickit} category={category.prop} data={pickit.waystones} />;
            case 'salvage':
                return <Salvage updatePickit={updatePickit} category={category.prop} data={pickit.salvage} />;

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
