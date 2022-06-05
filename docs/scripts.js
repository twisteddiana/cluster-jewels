import LZString from './lzstring.js';
import ClusterJewels from './cluster-jewels.js';
import ClusterJewelsMods from './cluster-jewels-mods.js';

const passiveSkillRegex = /1\sAdded\sPassive\sSkill\sis\s([\w\s-]+)$/;
const passiveSkillCountRegex = /Adds (8|9|10|11|12) Passive Skills/;

function getLines(itemString) {
  return itemString
    .split(/\n|\n\r/)
    .map(line => line.trim());
}

export function getSkills(itemString) {
  const skills = getLines(itemString)
    .map(line => {
      const match = line.match(passiveSkillRegex);
      return match && match[0];
    })
    .filter(line => line)
    .map(line => Object.values(ClusterJewelsMods).find(mod => mod.value.includes(line)))
    .map(skill => {
      const match = skill.value[0].match(passiveSkillRegex);
      skill.name = match && match[1];
      return skill;
    });

  return skills;
}

export function getNbrPassives(itemString) {
  const nbrPassives = getLines(itemString)
    .map(line => {
      const match = line.match(passiveSkillCountRegex);
      return match && match[1];
    })
    .filter(nbr => nbr);

  return nbrPassives.length ? nbrPassives[0] : 8;
}

export function getPositions(itemString) {
  if (!itemString) {
    return [];
  }
  const skills = getSkills(itemString);
  if (skills.length > 3) {
    // invalid
    return [];
  }

  const sorted = skills
    .map(skill => ({ skill, sortOrder: ClusterJewels.notableSortOrder[skill] }))
    .sort((a, b) => b.sortOrder - a.sortOrder)
    .map(item => item.skill);

  if (sorted.length < 3) {
    sorted.unshift(undefined);
  }

  return sorted;
}

export function getItem(hash) {
  return hash && LZString.decompressFromBase64(hash);
}

export function getHash(item) {
  return LZString.compressToBase64(item);
}