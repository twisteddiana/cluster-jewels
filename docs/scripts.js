import LZString from "./lzstring.js";
import ClusterJewels from "./cluster-jewels.js";

const re = /^1\sAdded\sPassive\sSkill\sis\s([\w\s-]+)$/;
export function getSkills (itemString) {
  return itemString
    .split(/\n|\n\r/)
    .map(line => line.trim())
    .map(line => {
      const match = line.match(re);
      return match && match[1];
    })
    .filter(line => line);
};

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
    sorted.unshift();
  }

  return sorted;
};

export function getItem(hash) {
  return hash && LZString.decompressFromBase64(hash);
};

export function getHash(item) {
  return LZString.compressToBase64(item);
}