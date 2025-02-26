import { Checkbox } from '@/components/ui/checkbox';

export default function Salvage({ updatePickit, category, data }) {
    return (
        <div className="overflow-hidden border bg-secondary p-3 rounded-lg">
            <div className="mb-4">
                <h2 className="text-lg font-semibold ">Salvage Socketed Items</h2>
                <table className="min-w-full divide-y divide-foreground">
                    <thead>
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-0">
                                Rarity
                            </th>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold ">
                                Greater than
                            </th>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold ">
                                Salvage Item
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-foreground">
                        {data.sockets.map(({ rarity, greaterThan, salvage }, index) => (
                            <tr key={'socket' + index}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-0">
                                    {rarity}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm ">
                                    <input
                                        type="number"
                                        value={greaterThan}
                                        onChange={(e) => {
                                            data.sockets[index].greaterThan = e.target.value;
                                            updatePickit(category, data);
                                        }}
                                        className="w-16 px-2 py-1 text-sm rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    />
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    <Checkbox
                                        checked={salvage}
                                        onCheckedChange={() => {
                                            data.sockets[index].salvage = !salvage;
                                            updatePickit(category, data);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h2 className="text-lg font-semibold ">Salvage Quality Items</h2>
                <table className="min-w-full divide-y divide-foreground">
                    <thead>
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-0">
                                Rarity
                            </th>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold ">
                                Greater than
                            </th>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold ">
                                Salvage Item
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-foreground">
                        {data.quality.map(({ rarity, greaterThan, salvage }, index) => (
                            <tr key={'quality' + index}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-0">
                                    {rarity}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    <input
                                        type="number"
                                        value={greaterThan}
                                        onChange={(e) => {
                                            data.quality[index].greaterThan = e.target.value;
                                            updatePickit(category, data);
                                        }}
                                        className="w-16 px-2 py-1 text-sm  rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    />
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    <Checkbox
                                        checked={salvage}
                                        onCheckedChange={() => {
                                            data.quality[index].salvage = !salvage;
                                            updatePickit(category, data);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
