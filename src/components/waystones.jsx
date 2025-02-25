import { Checkbox } from '@/components/ui/checkbox';

export default async function Waystones({ data }) {
    return (
        <div>
            <p>Here are the currency items that will be picked up:</p>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Rarity</th>
                        <th>Stash Item</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ name, rarity, stashItem }) => (
                        <tr key={name + rarity}>
                            <td>{name}</td>
                            <td>{rarity}</td>
                            <td>
                                <Checkbox checked={stashItem} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
