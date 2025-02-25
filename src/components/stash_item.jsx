import { Checkbox } from '@/components/ui/checkbox';

export default async function StashItem({ data }) {
    return (
        <div>
            <p>Here are the currency items that will be picked up:</p>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Stash Item</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ name, stashItem }) => (
                        <tr key={name}>
                            <td>{name}</td>
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
