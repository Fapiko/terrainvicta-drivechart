const {findResearch} = require('./research');

test('can find research by name', () => {
    const researchName  = 'Project_ProtiumConverterTorch';
    const foundResearch = findResearch(researchName);

    expect(foundResearch.maxUnlockChance).toEqual(5);
});