export const abilityBackgroundColor = (skillAbility : string) => {
    switch (skillAbility.toUpperCase()) {
        case 'STRENGTH':
            return 'rpgui-container-framed-grey-mini strength';
            // return 'rpgui-container-framed-golden-mini strength';
        case 'DEXTERITY':
            // return 'rpgui-container-framed-golden-mini dexterity';
            return 'rpgui-container-framed-grey-mini dexterity';
        case 'CONSTITUTION':
            // return 'rpgui-container-framed-golden-mini constitution';
            return 'rpgui-container-framed-grey-mini constitution';
        case 'INTELLIGENCE':
            // return 'rpgui-container-framed-golden-mini intelligence';
            return 'rpgui-container-framed-grey-mini intelligence';
        case 'WISDOM':
            // return 'rpgui-container-framed-golden-mini wisdom';
            return 'rpgui-container-framed-grey-mini wisdom';
        case 'CHARISMA':
            // return 'rpgui-container-framed-golden-mini charisma';
            return 'rpgui-container-framed-grey-mini charisma';
        default:
            // return 'rpgui-container-framed-golden-mini';
            return 'rpgui-container-framed-grey-mini';
    }
};