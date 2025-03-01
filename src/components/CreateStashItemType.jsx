'use client';

import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import rarities from '@/data/pickit/rarities';
import operators from '@/data/pickit/operators';

export default function CreateStashItemType({
    itemDescription,
    stashItem,
    updateStashItem,
}) {
    console.log(stashItem);
    return (
        <div className="border border-primary mt-2 rounded-md p-2">
            <h2 className="text-lg font-bold">{itemDescription}</h2>

            {stashItem.map((item, index) => {
                return (
                    <StashItem
                        key={item.id}
                        stashItem={item}
                        updateStashItem={(newValue) => {
                            stashItem[index] = newValue;
                            updateStashItem(stashItem);
                        }}
                        deleteStashItem={() => {
                            stashItem.splice(index, 1);
                            updateStashItem(stashItem);
                        }}
                    />
                );
            })}

            <div className="flex items-center justify-start mt-2">
                <Button
                    onClick={() => {
                        stashItem.push({
                            id: uuidv4(),
                            rarity: 'Normal',
                            properties: [
                                {
                                    property: '',
                                    value: '',
                                    operators: '==',
                                },
                            ],
                        });
                        updateStashItem(stashItem);
                    }}
                >
                    Add {itemDescription}
                </Button>
            </div>
        </div>
    );
}

function StashItem({ stashItem, updateStashItem, deleteStashItem }) {
    return (
        <div className="mb-4 border-b-2 border-primary">
            <div className="flex justify-between border-b border-primary py-2 mb-2">
                <div className="flex items-center gap-4">
                    <p>Rarity:</p>
                    <Select
                        onValueChange={(value) => {
                            stashItem.rarity = value;
                            updateStashItem(stashItem);
                        }}
                        defaultValue={stashItem.rarity}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a rarity" />
                        </SelectTrigger>
                        <SelectContent>
                            {rarities.map((rarity) => (
                                <SelectItem
                                    key={stashItem.id + rarity}
                                    value={rarity}
                                >
                                    {rarity}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center ml-4">
                    <Button
                        onClick={() => {
                            stashItem.properties.push({
                                id: uuidv4(),
                                property: '',
                                value: '',
                                operators: '==',
                            });
                            updateStashItem(stashItem);
                        }}
                    >
                        Insert Property
                    </Button>
                </div>

                <Button variant="destructive" onClick={deleteStashItem}>
                    Delete
                </Button>
            </div>

            <StashItemProperties
                stashItem={stashItem}
                updateStashItem={(value) => {
                    updateStashItem(value);
                }}
            />
        </div>
    );
}

function StashItemProperties({ stashItem, updateStashItem }) {
    return stashItem.properties.map((property, index) => {
        return (
            <div
                key={property.id}
                className="flex items-center gap-4 mb-2 ps-10"
            >
                <input
                    className="w-[300px] p-2 border border-primary rounded-md"
                    type="text"
                    placeholder="Property"
                    value={property.property}
                    onChange={(e) => {
                        stashItem.properties[index].property = e.target.value;
                        updateStashItem(stashItem);
                    }}
                />

                <Select
                    onValueChange={(value) => {
                        stashItem.properties[index].operators = value;
                        updateStashItem(data);
                    }}
                    defaultValue={property.operators}
                >
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select an operator" />
                    </SelectTrigger>
                    <SelectContent>
                        {operators.map((operator) => (
                            <SelectItem
                                key={property.id + operator}
                                value={operator}
                            >
                                {operator}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <input
                    className="w-[100px] p-2 border border-primary rounded-md"
                    type="text"
                    placeholder="Value"
                    value={property.value}
                    onChange={(e) => {
                        stashItem.properties[index].value = e.target.value;
                        updateStashItem(stashItem);
                    }}
                />

                <Button
                    variant="destructive"
                    onClick={() => {
                        stashItem.properties.splice(index, 1);
                        updateStashItem(stashItem);
                    }}
                >
                    Delete
                </Button>
            </div>
        );
    });
}
