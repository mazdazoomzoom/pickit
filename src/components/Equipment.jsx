import rarities from '@/data/pickit/rarities';
import operators from '@/data/pickit/operators';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Equipment({ updatePickit, category, data }) {
    console.log('Equipment:', data);

    return (
        <div className="overflow-hidden border bg-secondary p-3 rounded-lg">
            {Object.keys(data).map((equipment) => {
                return (
                    <div key={equipment} className="mb-4">
                        <h2 className="text-lg font-bold">{equipment}</h2>
                        <div className="border border-primary mt-2 rounded-md p-2">
                            {data[equipment].map((item, index) => {
                                return (
                                    <div key={equipment + index} className="mb-4 border-b-2 border-primary">
                                        <div className="flex justify-between border-b border-primary py-2 mb-2">
                                            <div className="flex items-center gap-4">
                                                <p>Rarity:</p>
                                                <Select
                                                    onValueChange={(value) => {
                                                        data[equipment][index].rarity = value;
                                                        updatePickit(category, data);
                                                    }}
                                                    defaultValue={item.rarity}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select a rarity" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {rarities.map((rarity) => (
                                                            <SelectItem key={rarity} value={rarity}>
                                                                {rarity}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="flex items-center ml-4">
                                                <Button
                                                    onClick={() => {
                                                        data[equipment][index].properties.push({
                                                            property: '',
                                                            value: '',
                                                            operators: '==',
                                                        });
                                                        updatePickit(category, data);
                                                    }}
                                                >
                                                    Insert Property
                                                </Button>
                                            </div>

                                            <Button
                                                variant="destructive"
                                                onClick={() => {
                                                    data[equipment].splice(index, 1);
                                                    updatePickit(category, data);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </div>

                                        <div>
                                            {item.properties.map((property, i) => {
                                                return (
                                                    <div key={i} className="flex items-center gap-4 mb-2">
                                                        <input
                                                            className="w-[300px] p-2 border border-primary rounded-md"
                                                            type="text"
                                                            placeholder="Property"
                                                            value={property.property}
                                                            onChange={(e) => {
                                                                data[equipment][index].properties[i].property =
                                                                    e.target.value;
                                                                updatePickit(category, data);
                                                            }}
                                                        />

                                                        <Select
                                                            onValueChange={(value) => {
                                                                data[equipment][index].properties[i].operators = value;
                                                                updatePickit(category, data);
                                                            }}
                                                            defaultValue={property.operators}
                                                        >
                                                            <SelectTrigger className="w-[100px]">
                                                                <SelectValue placeholder="Select an operator" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {operators.map((operator) => (
                                                                    <SelectItem key={operator} value={operator}>
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
                                                                data[equipment][index].properties[i].value =
                                                                    e.target.value;
                                                                updatePickit(category, data);
                                                            }}
                                                        />

                                                        <Button
                                                            variant="destructive"
                                                            onClick={() => {
                                                                data[equipment][index].properties.splice(i, 1);
                                                                updatePickit(category, data);
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="flex items-center justify-start mt-2">
                                <Button
                                    onClick={() => {
                                        data[equipment].push({
                                            rarity: 'Normal',
                                            properties: [],
                                        });
                                        updatePickit(category, data);
                                    }}
                                >
                                    Create
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
