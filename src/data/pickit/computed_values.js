const specialComputedValues = [
    {
        name: 'TotalResistances',
        summary: 'Sums all resistance values on an item',
    },
    {
        name: 'TotalAttributes',
        summary: 'Sums all attribute values (strength + dexterity + intelligence) on an item',
    },
];

const defensiveCalculations = [
    {
        name: 'ComputedArmour',
        summary: 'Final armour value after all modifiers',
    },
    {
        name: 'ComputedEvasion',
        summary: 'Final evasion value after all modifiers',
    },
    {
        name: 'ComputedEnergyShield',
        summary: 'Final energy shield value after all modifiers',
    },
];

const damageCalculations = [
    {
        name: 'DPS',
        summary: 'Total weapon DPS (physical + elemental)',
    },
    {
        name: 'PhysicalDPS',
        summary: 'Only physical portion of weapon DPS',
    },
    {
        name: 'ElementalDPS',
        summary: 'Only elemental portion of weapon DPS',
    },
];

export default {
    specialComputedValues,
    defensiveCalculations,
    damageCalculations,
};
