import { Checkbox } from '@/components/ui/checkbox';

export default async function StashItem({ data }) {
    return (
        <div className="overflow-hidden border bg-slate-200 p-3 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                            Name
                        </th>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                            Stash Item
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.map(({ name, stashItem }) => (
                        <tr key={name}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                {name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <Checkbox checked={stashItem} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
