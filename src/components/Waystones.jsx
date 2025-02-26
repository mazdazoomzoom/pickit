import { Checkbox } from '@/components/ui/checkbox';

export default function Waystones({ updatePickit, category, data }) {
    return (
        <div className="overflow-hidden border bg-secondary p-3 rounded-lg">
            <table className="min-w-full divide-y divide-foreground">
                <thead>
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-0">
                            Name
                        </th>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold ">
                            Rarity
                        </th>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold ">
                            Stash Item
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-foreground">
                    {data.map(({ name, rarity, stashItem }) => (
                        <tr key={name + rarity}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-0">{name}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm ">{rarity}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm ">
                                <Checkbox
                                    checked={stashItem}
                                    onCheckedChange={() => {
                                        updatePickit(category, { name, rarity, stashItem: !stashItem });
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
