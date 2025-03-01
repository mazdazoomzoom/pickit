import { v4 as uuidv4 } from 'uuid';

import gemTypes from '@/data/pickit/gemTypes.js';
import operators from '@/data/pickit/operators';

import { Button } from './ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function Gems({ updatePickit, category, data }) {
    return (
        <div className="overflow-hidden border bg-secondary p-3 rounded-lg">
            {data.map((gem, index) => (
                <Gem
                    key={gem.id}
                    gem={gem}
                    updateGem={(newValue) => {
                        data[index] = newValue;
                        updatePickit(category, data);
                    }}
                    deleteGem={() => {
                        data.splice(index, 1);
                        updatePickit(category, data);
                    }}
                />
            ))}

            <div className="flex items-center justify-start mt-2">
                <Button
                    onClick={() => {
                        data.push({
                            id: uuidv4(),
                            gemType: 'Uncut Support Gem',
                            value: '',
                            operators: '==',
                        });
                        updatePickit(category, data);
                    }}
                >
                    Add Gem
                </Button>
            </div>
        </div>
    );
}

function Gem({ gem, updateGem, deleteGem }) {
    return (
        <div className="flex items-center gap-2 mb-2 border-b border-foreground pb-2">
            <Select
                defaultValue={gem.gemType}
                onValueChange={(value) => updateGem({ ...gem, gemType: value })}
            >
                <SelectTrigger className="w-[250px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(gemTypes).map((key) => (
                        <SelectItem key={gem.id + key} value={key}>
                            {key}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                defaultValue={gem.operators}
                onValueChange={(value) =>
                    updateGem({ ...gem, operators: value })
                }
            >
                <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Select an operator" />
                </SelectTrigger>
                <SelectContent>
                    {operators.map((operator) => (
                        <SelectItem key={gem.id + operator} value={operator}>
                            {operator}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <input
                type="text"
                value={gem.value}
                onChange={(e) => updateGem({ ...gem, value: e.target.value })}
                placeholder="Tier"
                className="w-[100px] p-2 border border-primary rounded-md"
            />

            <Button variant="destructive" onClick={deleteGem}>
                Delete
            </Button>
        </div>
    );
}
