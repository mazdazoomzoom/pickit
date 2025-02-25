import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

import StashItem from '@/components/stash_item';
import Waystones from '@/components/waystones';
import Pickit from '@/data/pickit';

export default async function Home() {
    const pickit = new Pickit();

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">Path of Exile 2 Pickit Configuration</h1>
            <p className="text-gray-600 mb-6">
                Customize your item pickup script by configuring the items below. Use the accordions to organize
                different item categories.
            </p>

            <div className="container mx-auto border border-gray-800 p-4 rounded-lg mb-4">
                <Accordion type="single" collapsible>
                    <AccordionItem value="currency">
                        <AccordionTrigger>
                            <h1>Currency</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                            <StashItem data={pickit.data.currency} />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="runes">
                        <AccordionTrigger>
                            <h1>Runes</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                            <StashItem data={pickit.data.runes} />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="distilledEmotions">
                        <AccordionTrigger>
                            <h1>Distilled Emotions</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                            <StashItem data={pickit.data.distilledEmotions} />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="soulCores">
                        <AccordionTrigger>
                            <h1>Soul Cores</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                            <StashItem data={pickit.data.soulCores} />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="omens">
                        <AccordionTrigger>
                            <h1>Omens</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                            <StashItem data={pickit.data.omens} />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="essences">
                        <AccordionTrigger>
                            <h1>Essences</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                            <StashItem data={pickit.data.essences} />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="catalysts">
                        <AccordionTrigger>
                            <h1>Catalysts</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                            <StashItem data={pickit.data.catalysts} />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="splinters">
                        <AccordionTrigger>
                            <h1>Splinters</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                            <StashItem data={pickit.data.splinters} />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="artifacts">
                        <AccordionTrigger>
                            <h1>Artifacts</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                            <StashItem data={pickit.data.artifacts} />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="trialKeys">
                        <AccordionTrigger>
                            <h1>Trial Keys</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                            <StashItem data={pickit.data.trialKeys} />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="trials">
                        <AccordionTrigger>
                            <h1>Trials</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                            <StashItem data={pickit.data.trials} />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="waystones">
                        <AccordionTrigger>
                            <h1>Waystones</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Waystones data={pickit.data.waystones} />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="tablets">
                        <AccordionTrigger>
                            <h1>Tablets</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                            <StashItem data={pickit.data.tablets} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <Button type="submit" className="w-full">
                Create Pickit File
            </Button>
        </div>
    );
}
