import CreateStashItemType from './CreateStashItemType';

export default function Weapons({ updatePickit, category, data }) {
    function updateStashItem(item, weaponItem, newValue) {
        data[weaponItem][item] = newValue;
        updatePickit(category, data);
    }

    return (
        <div className="overflow-hidden border bg-secondary p-3 rounded-lg">
            {Object.keys(data).map((weaponItemType) => {
                return (
                    <div key={weaponItemType} className="mb-12">
                        <h2 className="text-xl font-bold text-primary">
                            {weaponItemType}
                        </h2>
                        {Object.keys(data[weaponItemType]).map((weaponItem) => {
                            return (
                                <div key={weaponItem} className="mb-4">
                                    <CreateStashItemType
                                        itemDescription={weaponItem}
                                        stashItem={
                                            data[weaponItemType][weaponItem]
                                        }
                                        updateStashItem={(newValue) =>
                                            updateStashItem(
                                                weaponItem,
                                                weaponItemType,
                                                newValue
                                            )
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
