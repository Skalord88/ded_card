export const AbilityBackgroundColor = (skillAbility : string) => {
    switch (skillAbility.toUpperCase()) {
        
        case 'STRENGHT':
            return 'rpgui-container-framed-grey-mini strenght';
        case 'DEXTERITY':
            return 'rpgui-container-framed-grey-mini dexterity';
        case 'CONSTITUTION':
            return 'rpgui-container-framed-grey-mini constitution';
        case 'INTELLIGENCE':
            return 'rpgui-container-framed-grey-mini intelligence';
        case 'WISDOM':
            return 'rpgui-container-framed-grey-mini wisdom';
        case 'CHARISMA':
            return 'rpgui-container-framed-grey-mini charisma';
        default:
            return '';
    }
};